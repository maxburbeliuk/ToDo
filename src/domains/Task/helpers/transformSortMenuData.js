// const transformSortMenuData = (options = {}, key) => ({
//   ...Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
//   [key]: true
// })

function transformSortMenuData(options, key) {
  const initialValue = {}

  const iteratedValue = options || {}

  for (const property in iteratedValue) {
    initialValue[property] = false
  }

  return { ...initialValue, [key]: true }
}

export default transformSortMenuData
