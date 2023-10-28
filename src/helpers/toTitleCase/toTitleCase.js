function toTitleCase(str) {
  const titleCase = str
    .toLowerCase()
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

  return titleCase
}

export default toTitleCase
