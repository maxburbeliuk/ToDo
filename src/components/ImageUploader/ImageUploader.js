import React, { useState, useRef, useCallback } from 'react'
import {
  Center,
  FileInput,
  Slider,
  Flex,
  Button,
  Modal,
  Group,
  Divider
} from '@mantine/core'
import {
  IconPhotoUp,
  IconPlus,
  IconMinus,
  IconRotate,
  IconRotateClockwise
} from '@tabler/icons-react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './ImageUploadLogic/EasyCrop'

const ImageUploader = () => {
  const [file, setFile] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const cropperRef = useRef(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [open, setOpen] = useState(false)

  const handleChange = (file) => {
    setFile(file)
    setOpen(true)
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    cropperRef.current = croppedAreaPixels
  }

  const handleCancel = () => {
    setFile(null)
  }

  const handleSubmit = async () => {
    try {
      const { file: croppedFile, url } = await getCroppedImg(
        window.URL.createObjectURL(file),
        cropperRef.current,
        rotation
      )

      setFile(croppedFile)
      setCroppedImage(url)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const onCropChange = useCallback((props) => {}, [crop])

  return (
    <>
      <FileInput
        accept={'image/png,image/jpeg'}
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
      <Modal
        opened={open}
        onClose={() => setFile(null)}
        title="Edit your image"
        centered
      >
        <div
          style={{
            height: '40vh',
            marginTop: 16,
            marginBottom: 16,
            position: 'relative'
          }}
        >
          <Cropper
            image={file && window.URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <Flex gap="sm" justify="center" direction="column">
          <Flex justify="center" align="center" gap="sm">
            <IconPlus size={18} />
            <Slider
              w={300}
              marks={[{ value: 1 }, { value: 2 }, { value: 3 }]}
              step={0.1}
              min={1}
              max={3}
              value={zoom}
              onChange={(value) => {
                setZoom(value)
              }}
            />
            <IconMinus size={18} />
          </Flex>
          <Flex justify="center" align="center" gap="sm">
            <IconRotate size={18} />
            <Slider
              w={300}
              marks={[
                { value: 0 },
                { value: 90 },
                { value: 180 },
                { value: 270 }
              ]}
              step={1}
              min={0}
              max={270}
              value={rotation}
              onChange={(value) => {
                setRotation(value)
              }}
            />
            <IconRotateClockwise size={18} />
          </Flex>
        </Flex>
        <Divider my="md" />
        <Group justify="flex-end" mt="md">
          <Button
            color={'var(--mantine-color-gray-light)'}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Group>
      </Modal>
    </>
  )
}

export default ImageUploader
