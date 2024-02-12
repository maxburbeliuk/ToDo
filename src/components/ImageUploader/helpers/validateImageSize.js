const validateImageSize = (file, maxWidth, maxHeight) =>
  new Promise((resolve) => {
    const image = new Image()
    image.src = window.URL.createObjectURL(file)
    image.onload = () => {
      resolve(image?.width >= maxWidth && image?.height >= maxHeight)
    }
  })

export default validateImageSize
