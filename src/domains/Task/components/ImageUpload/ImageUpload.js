import React, { useState, useRef } from 'react'
import { Center, FileInput, Slider, Flex, Box } from '@mantine/core'
import {
  IconPhotoUp,
  IconPlus,
  IconMinus,
  IconRotate,
  IconRotateClockwise
} from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import Cropper from 'react-easy-crop'

const ImageUpload = () => {
  const [file, setFile] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const cropperRef = useRef(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const handleChange = (file) => {
    setFile(URL.createObjectURL(file))
    openEditModal(file)
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  const openEditModal = (file) => {
    modals.openConfirmModal({
      title: 'Edit your image',
      centered: true,
      labels: { confirm: 'Edit', cancel: 'Cancel' },

      onConfirm: () => {
        const cropper = cropperRef.current?.cropper
        const croppedDataUrl = cropper.getCroppedCanvas().toDataURL()
        setCroppedImage(croppedDataUrl)
      },
      children: (
        <>
          <Center>
            <Cropper
              image={URL.createObjectURL(file)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              position="sticky"
            />
          </Center>

          <Flex
            gap="sm"
            p={20}
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Flex justify="center" align="center" gap="sm">
              <IconPlus size={18} />
              <Slider
                w={300}
                marks={[{ value: 20 }, { value: 50 }, { value: 80 }]}
              />
              <IconMinus size={18} />
            </Flex>
            <Flex justify="center" align="center" gap="sm">
              <IconRotate size={18} />
              <Slider
                w={300}
                marks={[{ value: 20 }, { value: 50 }, { value: 80 }]}
              />
              <IconRotateClockwise size={18} />
            </Flex>
          </Flex>
        </>
      )
    })
  }

  return (
    <FileInput
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
          background: croppedImage ? `url(${croppedImage}) center/cover` : '',
          color: croppedImage ? 'transparent' : ''
        }
      }}
    />
  )
}

export default ImageUpload
