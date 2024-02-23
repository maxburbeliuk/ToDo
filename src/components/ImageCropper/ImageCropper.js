import { forwardRef, useCallback, useRef, useState } from 'react'
import EasyCrop from './EasyCrop'
import { PREFIX, ROTATION_INITIAL } from './__constants__'
import { Button, Divider, Group, Modal } from '@mantine/core'

const ImgCrop = forwardRef((props, cropperRef) => {
  const {
    quality = 0.4,
    fillColor = 'white',

    zoomSlider = true,
    rotationSlider = true,
    aspectSlider = true,
    showReset = true,
    resetText,

    aspect = 1,
    minZoom = 1,
    maxZoom = 3,

    cropShape = 'rect',
    showGrid = true,
    cropperProps,

    modalTitle,
    onModalOk,
    onModalCancel,

    beforeCrop,
    children,

    opened,
    close
  } = props

  const cb = useRef({})
  cb.current.onModalOk = onModalOk
  cb.current.onModalCancel = onModalCancel
  cb.current.beforeCrop = beforeCrop

  /**
   * crop
   */
  const easyCropRef = useRef(null)
  const getCropCanvas = useCallback(
    (target) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const context = target?.getRootNode?.() || document

      const imgSource = context.querySelector(`.${PREFIX}-media`)

      const {
        width: cropWidth,
        height: cropHeight,
        x: cropX,
        y: cropY
      } = easyCropRef.current?.cropPixelsRef.current

      if (
        rotationSlider &&
        easyCropRef.current?.rotation !== ROTATION_INITIAL
      ) {
        const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imgSource
        const angle = easyCropRef.current?.rotation * (Math.PI / 180)

        // get container for rotated image
        const sine = Math.abs(Math.sin(angle))
        const cosine = Math.abs(Math.cos(angle))
        const squareWidth = imgWidth * cosine + imgHeight * sine
        const squareHeight = imgHeight * cosine + imgWidth * sine

        canvas.width = squareWidth
        canvas.height = squareHeight
        ctx.fillStyle = fillColor
        ctx.fillRect(0, 0, squareWidth, squareHeight)

        // rotate container
        const squareHalfWidth = squareWidth / 2
        const squareHalfHeight = squareHeight / 2
        ctx.translate(squareHalfWidth, squareHalfHeight)
        ctx.rotate(angle)
        ctx.translate(-squareHalfWidth, -squareHalfHeight)

        // draw rotated image
        const imgX = (squareWidth - imgWidth) / 2
        const imgY = (squareHeight - imgHeight) / 2
        ctx.drawImage(
          imgSource,
          0,
          0,
          imgWidth,
          imgHeight,
          imgX,
          imgY,
          imgWidth,
          imgHeight
        )

        // crop rotated image
        const imgData = ctx.getImageData(0, 0, squareWidth, squareHeight)
        canvas.width = cropWidth
        canvas.height = cropHeight
        ctx.putImageData(imgData, -cropX, -cropY)
      } else {
        canvas.width = cropWidth
        canvas.height = cropHeight
        ctx.fillStyle = fillColor
        ctx.fillRect(0, 0, cropWidth, cropHeight)

        ctx.drawImage(
          imgSource,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        )
      }

      return canvas
    },
    [fillColor, rotationSlider]
  )

  /**
   * upload
   */
  const [modalImage, setModalImage] = useState('')
  const onCancel = useRef()
  const onOk = useRef()

  const runBeforeUpload = useCallback(
    async ({ beforeUpload, file, resolve, reject }) => {
      const rawFile = file

      if (typeof beforeUpload !== 'function') {
        resolve(rawFile)
        return
      }

      try {
        const result = await beforeUpload(file, [file])

        if (result === false) {
          resolve(false)
        } else {
          resolve((result !== true && result) || rawFile)
        }
      } catch (err) {
        reject(err)
      }
    },
    []
  )

  const getNewBeforeUpload = useCallback(
    (beforeUpload) => {
      return (file, fileList) => {
        return new Promise(async (resolve, reject) => {
          let processedFile = file

          if (typeof cb.current.beforeCrop === 'function') {
            try {
              const result = await cb.current.beforeCrop(file, fileList)
              if (result === false) {
                return runBeforeUpload({ beforeUpload, file, resolve, reject }) // not open modal
              }
              if (result !== true) {
                processedFile = result || file // will open modal
              }
            } catch (err) {
              return runBeforeUpload({ beforeUpload, file, resolve, reject }) // not open modal
            }
          }

          // read file
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
              setModalImage(reader.result) // open modal
            }
          })

          console.log(processedFile)

          reader.readAsDataURL(processedFile)

          // on modal cancel
          onCancel.current = () => {
            setModalImage('')
            easyCropRef.current?.onReset()

            let hasResolveCalled = false

            cb.current.onModalCancel?.((LIST_IGNORE) => {
              resolve(LIST_IGNORE)
              hasResolveCalled = true
            })

            if (!hasResolveCalled) {
              resolve(`__LIST_IGNORE_${Date.now()}__`)
            }
          }

          // on modal confirm
          onOk.current = async () => {
            setModalImage('')
            easyCropRef.current.onReset()

            const canvas = getCropCanvas(file)
            const { type, name } = processedFile

            canvas.toBlob(
              async (blob) => {
                const newFile = new File([blob], name, { type })
                Object.assign(newFile, { uid: new Date().toISOString() })

                runBeforeUpload({
                  beforeUpload,
                  file: newFile,
                  resolve: (file) => {
                    resolve(file)
                    cb.current.onModalOk?.(file)
                  },
                  reject: (err) => {
                    reject(err)
                    cb.current.onModalOk?.(err)
                  }
                })
              },
              type,
              quality
            )

            close()
          }
        })
      }
    },
    [getCropCanvas, quality, runBeforeUpload]
  )

  const getNewUpload = useCallback(
    (children) => {
      const upload = Array.isArray(children) ? children[0] : children
      const { beforeUpload, accept, ...restUploadProps } = upload.props

      return {
        ...upload,
        props: {
          ...restUploadProps,
          accept: accept || 'image/*',
          beforeUpload: getNewBeforeUpload(beforeUpload)
        }
      }
    },
    [getNewBeforeUpload]
  )

  const resetBtnText = resetText || 'Reset'

  const title = modalTitle || 'Edit image'

  const isResetActive = useRef(false)

  const setIsResetActive = (value) => (isResetActive.current = value)

  return (
    <>
      {getNewUpload(children)}
      <Modal
        opened={opened}
        onClose={() => {
          close()
        }}
        title={title}
        centered
      >
        <EasyCrop
          ref={easyCropRef}
          cropperRef={cropperRef}
          zoomSlider={zoomSlider}
          rotationSlider={rotationSlider}
          aspectSlider={aspectSlider}
          showReset={showReset}
          resetBtnText={resetBtnText}
          modalImage={modalImage}
          aspect={aspect}
          minZoom={minZoom}
          maxZoom={maxZoom}
          cropShape={cropShape}
          showGrid={showGrid}
          cropperProps={cropperProps}
          setIsResetActive={setIsResetActive}
        />

        <Divider my="md" />
        <Group justify="flex-end" mt="md">
          <Button
            color={'var(--mantine-color-gray-light)'}
            onClick={() => onCancel.current()}
          >
            Cancel
          </Button>
          {showReset && (zoomSlider || rotationSlider || aspectSlider) && (
            <Button
              color={'var(--mantine-color-violet-9)'}
              className="[bottom:20px] [position:absolute]"
              style={
                isResetActive ? {} : { opacity: 0.3, pointerEvents: 'none' }
              }
              onClick={easyCropRef.current?.onReset()}
            >
              {resetBtnText}
            </Button>
          )}
          <Button
            onClick={() => onOk.current()}
            color={'var(--mantine-color-violet-9)'}
          >
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  )
})

export default ImgCrop
// import React, { useState, useRef, useCallback, memo } from 'react'
// import {
//   Center,
//   FileInput,
//   Slider,
//   Flex,
//   Button,
//   Modal,
//   Group,
//   Divider
// } from '@mantine/core'
// import {
//   IconPhotoUp,
//   IconPlus,
//   IconMinus,
//   IconRotate,
//   IconRotateClockwise
// } from '@tabler/icons-react'
// import Cropper from 'react-easy-crop'
//
// const getCroppedImg = async (imageSrc, pixelCrop, rotation) => {
//   const image = new Image()
//   image.src = imageSrc
//
//   return new Promise((resolve, reject) => {
//     image.onload = () => {
//       const canvas = document.createElement('canvas')
//       const ctx = canvas.getContext('2d')
//
//       if (!ctx) {
//         reject(new Error('Unable to get canvas context'))
//         return
//       }
//
//       const rotRad = (rotation * Math.PI) / 180
//
//       const bBoxWidth =
//         Math.abs(Math.cos(rotRad) * image.width) +
//         Math.abs(Math.sin(rotRad) * image.height)
//       const bBoxHeight =
//         Math.abs(Math.sin(rotRad) * image.width) +
//         Math.abs(Math.cos(rotRad) * image.height)
//
//       canvas.width = bBoxWidth
//       canvas.height = bBoxHeight
//
//       ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
//       ctx.rotate(rotRad)
//       ctx.translate(-image.width / 2, -image.height / 2)
//
//       ctx.drawImage(image, 0, 0)
//
//       const data = ctx.getImageData(
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height
//       )
//
//       canvas.width = pixelCrop.width
//       canvas.height = pixelCrop.height
//
//       ctx.putImageData(data, 0, 0)
//
//       canvas.toBlob((file) => {
//         file.name = 'cropped.jpeg'
//         resolve({ file, url: URL.createObjectURL(file) })
//       }, 'image/jpeg')
//     }
//
//     image.onerror = (error) => {
//       reject(new Error(`Error loading image: ${error.message}`))
//     }
//   })
// }
//
// const ImageCropper = () => {
//   const [file, setFile] = useState()
//   const [croppedImage, setCroppedImage] = useState()
//   const cropperRef = useRef(null)
//   const [crop, onCropChange] = useState({ x: 0, y: 0 })
//   const [zoom, setZoom] = useState(1)
//   const [rotation, setRotation] = useState(0)
//   const [open, setOpen] = useState(false)
//   const [aspect, setAspect] = useState(undefined)
//
//   const handleChange = (file) => {
//     setFile(file)
//     setOpen(true)
//   }
//
//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     cropperRef.current = croppedAreaPixels
//     console.log('onCropComplete', croppedArea, croppedAreaPixels)
//   }
//
//   const handleCancel = () => {
//     setFile(null)
//   }
//
//   const handleSubmit = async () => {
//     try {
//       const { file: croppedFile, url } = await getCroppedImg(
//         window.URL.createObjectURL(file),
//         cropperRef.current,
//         rotation
//       )
//
//       setFile(croppedFile)
//       setCroppedImage(url)
//       setOpen(false)
//     } catch (error) {
//       console.error(error)
//     }
//   }
//
//   return (
//     <>
//       <FileInput
//         accept={'image/png,image/jpeg'}
//         onChange={handleChange}
//         title=""
//         placeholder={
//           <Center>
//             <IconPhotoUp color={'var(--mantine-color-blue-8)'} />
//           </Center>
//         }
//         label="Your image"
//         styles={{
//           input: {
//             width: 150,
//             height: 150,
//             background: croppedImage ? `url(${croppedImage}) center/cover` : '',
//             color: croppedImage ? 'transparent' : ''
//           }
//         }}
//       />
//       <Modal
//         opened={open}
//         onClose={() => {
//           setOpen(false)
//           setFile(null)
//         }}
//         title="Edit your image"
//         centered
//       >
//         <div
//           style={{
//             height: '40vh',
//             marginTop: 16,
//             marginBottom: 16,
//             position: 'relative'
//           }}
//         >
//           <Cropper
//             showGrid
//             image={file && window.URL.createObjectURL(file)}
//             crop={crop}
//             zoom={zoom}
//             rotation={rotation}
//             onCropChange={onCropChange}
//             onCropComplete={onCropComplete}
//           />
//         </div>
//         <Flex gap="sm" justify="center" direction="column">
//           <Flex justify="center" align="center" gap="sm">
//             <IconPlus size={18} />
//             <Slider
//               w={300}
//               marks={[{ value: 1 }, { value: 2 }, { value: 3 }]}
//               step={0.1}
//               min={1}
//               max={3}
//               value={zoom}
//               onChange={(value) => {
//                 setZoom(value)
//               }}
//             />
//             <IconMinus size={18} />
//           </Flex>
//           <Flex justify="center" align="center" gap="sm">
//             <IconRotate size={18} />
//             <Slider
//               w={300}
//               marks={[
//                 { value: 0 },
//                 { value: 90 },
//                 { value: 180 },
//                 { value: 270 }
//               ]}
//               step={1}
//               min={0}
//               max={270}
//               value={rotation}
//               onChange={(value) => {
//                 setRotation(value)
//               }}
//             />
//             <IconRotateClockwise size={18} />
//           </Flex>
//         </Flex>
//         <Divider my="md" />
//         <Group justify="flex-end" mt="md">
//           <Button
//             color={'var(--mantine-color-gray-light)'}
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Submit</Button>
//         </Group>
//       </Modal>
//     </>
//   )
// }
//
// export default ImageCropper
