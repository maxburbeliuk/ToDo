import React, { useState, useRef } from 'react'
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

const ImageUpload = () => {
  const [file, setFile] = useState()
  const [croppedImage, setCroppedImage] = useState()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleSubmit = async () => {
    try {
      const { fileImage, url } = await getCroppedImg(
        URL.createObjectURL(fileImage),
        crop,
        rotation
      )
      console.log(fileImage, url)
      setCroppedImage(url)
      setFile(fileImage)
    } catch (error) {
      console.error('Error processing cropped image:', error)
    }
  }

  return (
    <>
      <FileInput
        accept={'image/png,image/jpeg'}
        onChange={(file) => setFile(file)}
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
        opened={!!file}
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
            aspect={1}
            onCropChange={setCrop}
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
                console.log(value)
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
                console.log(value)
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
            onClick={() => setFile(null)}
          >
            Cancel
          </Button>
          <Button onClick={() => console.log(handleSubmit())}>Submit</Button>
        </Group>
      </Modal>
    </>
  )
}

export default ImageUpload
