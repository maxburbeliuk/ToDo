const transformSortMenuData = (options = {}, key) => ({
  ...Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
  [key]: true
})

export default transformSortMenuData
