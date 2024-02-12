async function isBase64UrlImage(base64String) {
  let image = new Image()
  image.src = base64String
  return await new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve(false)
        return
      }
      resolve(true)
    }
    image.onerror = () => {
      resolve(false)
    }
  })
}

const getBase64 = (img, onSuccess, onError) => {
  const reader = new FileReader()

  reader.readAsDataURL(img)
  reader.onload = async () => {
    const isImage = await isBase64UrlImage(reader.result)
    if (isImage) onSuccess(reader.result)
    else onError(null)
  }
}

export default getBase64
