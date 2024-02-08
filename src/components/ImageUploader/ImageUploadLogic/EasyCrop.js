const getCroppedImg = async (imageSrc, pixelCrop, rotation) => {
  const image = new Image()
  image.src = imageSrc

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Unable to get canvas context'))
        return
      }

      const rotRad = (rotation * Math.PI) / 180

      const bBoxWidth =
        Math.abs(Math.cos(rotRad) * image.width) +
        Math.abs(Math.sin(rotRad) * image.height)
      const bBoxHeight =
        Math.abs(Math.sin(rotRad) * image.width) +
        Math.abs(Math.cos(rotRad) * image.height)

      canvas.width = bBoxWidth
      canvas.height = bBoxHeight

      ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
      ctx.rotate(rotRad)
      ctx.translate(-image.width / 2, -image.height / 2)

      ctx.drawImage(image, 0, 0)

      const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
      )

      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      ctx.putImageData(data, 0, 0)

      canvas.toBlob((file) => {
        file.name = 'cropped.jpeg'
        resolve({ file, url: URL.createObjectURL(file) })
      }, 'image/jpeg')
    }

    image.onerror = (error) => {
      reject(new Error(`Error loading image: ${error.message}`))
    }
  })
}

export default getCroppedImg
