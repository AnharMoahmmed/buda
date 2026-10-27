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
    const diff1 = Math.abs(r - g);
    const diff2 = Math.abs(r - b);
    const diff3 = Math.abs(g - b);
    const isNeutral = diff1 < 26 && diff2 < 26 && diff3 < 26;
    return isNeutral && r > 215 && g > 215 && b > 215;
  }

  // Push border pixels
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
          const diff1 = Math.abs(r - g);
          const diff2 = Math.abs(r - b);
          const diff3 = Math.abs(g - b);
          const isNeutral = diff1 < 28 && diff2 < 28 && diff3 < 28;
          if (isNeutral && r > 200 && g > 200 && b > 200) {
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

      if (brightness >= 246) {
        outputData[i * 4 + 3] = 0;
      } else if (brightness >= 208) {
        const factor = (246 - brightness) / 38;
        outputData[i * 4 + 3] = Math.round(factor * 160);
      } else {
        outputData[i * 4 + 3] = 190;
      }
    }
  }

  await sharp(outputData, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 8 })
    .toFile(outputPath);

  console.log(`Created cutout: ${flavor}-cup.png`);
}

async function createThumbnails() {
  for (const flavor of FLAVORS) {
    const inPath = path.join(__dirname, 'public', 'images', `${flavor}-cup.jpg`);
    const outPath = path.join(__dirname, 'public', 'images', `thumb-${flavor}.jpg`);

    // Crop just the top luscious ice cream scoop (centered upper portion)
    await sharp(inPath)
      .extract({ left: 240, top: 130, width: 540, height: 420 })
      .resize(160, 160, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(outPath);

    console.log(`Created thumbnail: thumb-${flavor}.jpg`);
  }
}

async function main() {
  for (const flavor of FLAVORS) {
    await createCleanCutout(flavor);
  }
  await createThumbnails();
}

main().catch(console.error);
