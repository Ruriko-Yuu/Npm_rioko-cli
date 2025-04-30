import {
  ref
} from 'vue'
export const useImageExtra = (image: string) => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = "Anonymous";
  const xImage = ref<string>('')
  const yImage = ref<string>('')
  const imageWidth = ref<number>(0)
  const imageHeight = ref<number>(0)
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    console.log(`Canvas 中的图片尺寸: ${canvas.width} × ${canvas.height}`);
    imageWidth.value = canvas.width
    imageHeight.value = canvas.height
    // Create xCanvas with proper dimensions
    const xCanvas = document.createElement('canvas');
    document.body.appendChild(xCanvas);
    xCanvas.width = img.width;
    xCanvas.height = 4;
    const xCtx = xCanvas.getContext('2d');

    if (!xCtx) return;

    for (let x = 0; x < canvas.width; x++) {
      const pixelDataTop = ctx?.getImageData(x, 0, 1, 1).data;
      const pixelDataBottom = ctx?.getImageData(x, canvas.height - 1, 1, 1).data;
      if (pixelDataTop) {
        const [r, g, b, a] = pixelDataTop;
        xCtx.fillStyle = `rgba(${r},${g},${b},${a})`;
        xCtx.fillRect(x, 0, 1, 2);
      }
      if (pixelDataBottom) {
        const [r, g, b, a] = pixelDataBottom;
        xCtx.fillStyle = `rgba(${r},${g},${b},${a})`;
        xCtx.fillRect(x, 2, 1, 2);
      }
    }
    xImage.value = xCanvas.toDataURL('image/png')
    const yCanvas = document.createElement('canvas');
    document.body.appendChild(yCanvas);
    yCanvas.width = 20;
    yCanvas.height = img.height;
    const yCtx = yCanvas.getContext('2d');

    if (!yCtx) return;

    for (let y = 0; y < canvas.height; y++) {
      const pixelDataLeft = ctx?.getImageData(0, y, 1, 1).data;
      const pixelDataRight = ctx?.getImageData(canvas.width - 1, y, 1, 1).data;
      if (pixelDataLeft) {
        const [r, g, b, a] = pixelDataLeft;
        yCtx.fillStyle = `rgba(${r},${g},${b},${a})`;
        yCtx.fillRect(0, y, 10, 1);
      }
      if (pixelDataRight) {
        const [r, g, b, a] = pixelDataRight;
        yCtx.fillStyle = `rgba(${r},${g},${b},${a})`;
        yCtx.fillRect(10, y, 10, 1);
      }
    }

    yImage.value = yCanvas.toDataURL('image/png')
    canvas.remove();
    xCanvas.remove();
    yCanvas.remove();
  };

  img.src = image;
  return {
    xImage,
    yImage,
    imageWidth,
    imageHeight
  };
}
