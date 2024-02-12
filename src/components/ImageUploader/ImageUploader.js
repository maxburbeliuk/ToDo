import { getBase64, validateFileSize, validateImageSize } from './helpers'
import { memo, useEffect, useRef, useState } from 'react'

import ImgCrop from '../ImageCropper/ImageCropper'
import PropTypes from 'prop-types'
import styles from './ImageUploader.styles'
import { notifications } from '@mantine/notifications'
import { Center, FileInput, Modal } from '@mantine/core'
import { IconPhotoUp } from '@tabler/icons-react'
import { Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

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
      accept={AVAILABLE_FORMATS.join()}
      onChange={handleChange}
      title=""
      placeholder={
        <Center>
          <IconPhotoUp color={'var(--mantine-color-blue-8)'} />
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

/**
 * It's a React component that renders an image uploader
 * @param value {string} - The image url
 * @param onChange {function} - The function to call when the image is changed
 * @param withDirectUpload {boolean} - If true, returns an url to the image
 * @param imageCropProps {Object} - check available props on https://github.com/nanxiaobei/antd-img-crop
 * @param uploadProps {Object} - check available props on https://4x.ant.design/components/upload/
 * @param withImageCrop {boolean} - Should image be cropped before upload
 * @param withImageSizeValidation {boolean} - if true image size will be validated (1024px by 1024px for example)
 * @param withFileSizeValidation {boolean} - if true image size will be validated by size (2 Mib for example)
 * @param maxWidthUploadedImage {number} - max width of upload image (work's only with withImageSizeValidation = true)
 * @param maxHeightUploadedImage {number} - max height of upload image (work's only with withImageSizeValidation = true)
 * @param maxFileSize {number} - max size of upload image (work's only with withFileSizeValidation = true)
 */
const AVAILABLE_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/tiff',
  'image/svg',
  'image/webp'
]

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

ImageUploader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  withDirectUpload: PropTypes.bool,
  imgCropProps: PropTypes.object,
  uploadProps: PropTypes.object,
  withImageSizeValidation: PropTypes.bool,
  withFileSizeValidation: PropTypes.bool,
  withImageCrop: PropTypes.bool,
  maxWidthUploadedImage: PropTypes.number,
  maxHeightUploadedImage: PropTypes.number,
  maxFileSize: PropTypes.number,
  customBeforeUpload: PropTypes.func
}

export default memo(ImageUploader)
