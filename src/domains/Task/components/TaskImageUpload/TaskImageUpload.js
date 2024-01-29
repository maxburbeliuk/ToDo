import React, { useState, useRef } from 'react'
import { Center, FileInput, Slider, Flex } from '@mantine/core'
import {
  IconPhotoUp,
  IconPlus,
  IconMinus,
  IconRotate,
  IconRotateClockwise
} from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const TaskImageUpload = () => {
  const [file, setFile] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const cropperRef = useRef(null)

  const handleChange = (file) => {
    setFile(URL.createObjectURL(file))
    openEditModal(file)
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
              ref={cropperRef}
              viewMode={3}
              initialAspectRatio={1 / 1}
              src={URL.createObjectURL(file)}
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

export default TaskImageUpload
