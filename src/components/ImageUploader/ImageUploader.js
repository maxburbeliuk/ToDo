import { getBase64, validateFileSize, validateImageSize } from './helpers'
import { useEffect, useState } from 'react'

import ImgCrop from '../ImageCropper/ImageCropper'
import styles from './ImageUploader.styles'
import { notifications } from '@mantine/notifications'
import { Image, Center, FileInput } from '@mantine/core'
import { IconPhotoUp } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import AVAILABLE_FORMATS from './__constants__'

const uploadImage = async () => {}

const Upload = (props) => {
  const { handleChange, file, value, beforeUpload } = props

  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    file &&
      beforeUpload?.(file).then((...args) => {
        setImageUrl(window.URL.createObjectURL(file))
      })

    return () => {
      window.URL.revokeObjectURL(imageUrl)
    }
  }, [file])

  return file ? (
    <Image alt="Image" style={styles.image} src={imageUrl} />
  ) : (
    <FileInput
      pl={8}
      accept={AVAILABLE_FORMATS.join()}
      onChange={handleChange}
      title=""
      placeholder={
        <Center>
          <IconPhotoUp />
        </Center>
      }
      label="Your image"
      styles={{
        input: {
          width: 150,
          height: 150,
          background: value ? `url(${value}) center/cover` : '',
          color: value ? 'transparent' : ''
        }
      }}
    />
  )
}

const ImageUploader = (props) => {
  const {
    value,
    onChange,
    withImageCrop = true,
    withDirectUpload = false,
    withImageSizeValidation = false,
    withFileSizeValidation = false,
    maxWidthUploadedImage = 1024,
    maxHeightUploadedImage = 1024,
    maxFileSize = 2,
    customBeforeUpload
  } = props

  // [COMPONENT_STATE_HOOKS]
  const [file, setFile] = useState(null)

  // // [HANDLER_FUNCTIONS]
  const handleUpload = async (file) => {
    setFile(file)
    if (withDirectUpload) {
      const url = await uploadImage(file)
      onChange(url)
    } else {
      const onTransformSuccess = (result) => {
        onChange?.(result)
      }
      const onTransformError = () => {
        onTransformSuccess(null)
        notifications.show({
          color: 'red',
          title: 'Oops! Failed to post',
          message: 'Error during image upload, please try again'
        })
      }

      getBase64(file, onTransformSuccess, onTransformError)
    }
  }

  const beforeUpload = async (file) => {
    try {
      const isAvailableFormat = AVAILABLE_FORMATS.includes(file?.type)

      if (!isAvailableFormat) {
        const availableFormats = AVAILABLE_FORMATS.map((f) =>
          f.split('/').at(1).toUpperCase()
        ).join('/')
        notifications.show({
          color: 'red',
          title: 'Oops! Failed to post',
          message: `You can upload only ${availableFormats} files`
        })
        return false
      }

      if (withImageSizeValidation) {
        const isImgValid = await validateImageSize(
          file,
          maxWidthUploadedImage,
          maxHeightUploadedImage
        )
        if (!isImgValid) {
          notifications.show({
            color: 'red',
            title: 'Oops! Failed to post',
            message: `Images must be at least ${maxWidthUploadedImage} by ${maxHeightUploadedImage}`
          })
          return false
        }
      }

      if (withFileSizeValidation) {
        const isFileSizeValid = validateFileSize(file, maxFileSize)
        if (!isFileSizeValid) {
          notifications.show({
            color: 'red',
            title: 'Oops! Failed to post',
            message: `Images must be ${maxFileSize} Mib`
          })

          return false
        }
      }

      return (await customBeforeUpload?.(file)) || true
    } catch (error) {
      setFile(null)
      notifications.show({
        color: 'red',
        title: 'Oops! Failed to post',
        message: 'Something went wrong during image upload'
      })
      return false
    }
  }

  // [LIFECYCLE]
  useEffect(() => {
    let isMounted = true
    isMounted && value && setFile(value)

    return () => (isMounted = false)
  }, [value])

  const [opened, { open, close }] = useDisclosure(false)

  const handleChange = (file) => {
    open()
    setFile(file)
  }

  return withImageCrop ? (
    <ImgCrop
      opened={opened}
      close={close}
      modalOk={'Apply'}
      modalCancel={'Cancel'}
      modalTitle={'Crop image'}
      grid
      rotate
      minZoom={0.9}
      quality={1}
      onModalOk={handleUpload}
      // beforeCrop={beforeUpload}
    >
      <Upload
        beforeUpload={beforeUpload}
        handleChange={handleChange}
        file={file}
        value={value}
      />
    </ImgCrop>
  ) : (
    <Upload
      beforeUpload={beforeUpload}
      handleChange={handleChange}
      file={file}
      value={value}
    />
  )
}

export default ImageUploader
