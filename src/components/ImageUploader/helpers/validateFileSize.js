const validateFileSize = (file, max) => {
  const fileSize = file.size / 1024 / 1024 // in MiB
  return fileSize < max
}

export default validateFileSize
