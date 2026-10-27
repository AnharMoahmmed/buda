const sharp = require('sharp');
const path = require('path');

const FLAVORS = [
  'chocolate',
  'pistachio',
  'strawberry',
  'caramel',
  'mango',
  'vanilla'
];

async function createCleanCutout(flavor) {
  const inputPath = path.join(__dirname, 'public', 'images', `${flavor}-cup.jpg`);
  const outputPath = path.join(__dirname, 'public', 'images', `${flavor}-cup.png`);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const outputData = Buffer.from(data);

  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBg(idx) {
    const r = data[idx * 4];
    const g = data[idx * 4 + 1];
    const b = data[idx * 4 + 2];
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
    // Studio backdrop is neutral and bright
    return maxDiff < 20 && r > 210 && g > 210 && b > 210;
  }

  // Push all border pixels
  for (let x = 0; x < width; x++) {
    const topIdx = 0 * width + x;
    if (isBg(topIdx)) { queue.push(topIdx); visited[topIdx] = 1; }
    const botIdx = (height - 1) * width + x;
    if (isBg(botIdx)) { queue.push(botIdx); visited[botIdx] = 1; }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = y * width + 0;
    if (!visited[leftIdx] && isBg(leftIdx)) { queue.push(leftIdx); visited[leftIdx] = 1; }
    const rightIdx = y * width + (width - 1);
    if (!visited[rightIdx] && isBg(rightIdx)) { queue.push(rightIdx); visited[rightIdx] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx]) {
          const r = data[nIdx * 4];
          const g = data[nIdx * 4 + 1];
          const b = data[nIdx * 4 + 2];
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
          // Propagate into bright neutral studio background
          if (maxDiff < 25 && r > 195 && g > 195 && b > 195) {
            visited[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }
  }

  for (let i = 0; i < width * height; i++) {
    if (visited[i]) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const brightness = (r + g + b) / 3;

      if (brightness >= 225) {
        // Pure background -> completely transparent (0 alpha)
        outputData[i * 4 + 3] = 0;
      } else if (brightness >= 195) {
        // Very tight edge anti-aliasing (only within 30 brightness levels)
        const factor = (225 - brightness) / 30; // 0 to 1
        outputData[i * 4 + 3] = Math.round(factor * 255);
      } else {
        outputData[i * 4 + 3] = 255;
      }
    } else {
      // Cup and ice cream content -> fully opaque
      outputData[i * 4 + 3] = 255;
    }
  }

  await sharp(outputData, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Pristine cutout created: ${flavor}-cup.png`);
}

async function main() {
  for (const f of FLAVORS) {
    await createCleanCutout(f);
  }
}

main().catch(console.error);
