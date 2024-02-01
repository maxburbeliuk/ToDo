import { version } from 'antd'
import AntModal from 'antd/es/modal'
import AntUpload from 'antd/es/upload'
import { compareVersions } from 'compare-versions'
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import EasyCrop from './EasyCrop'
import './ImgCrop.css'
import { PREFIX, ROTATION_INITIAL } from './__constants__'

const openProp = compareVersions(version, '4.23.0') === -1 ? 'visible' : 'open'

const deprecate = (obj, old, now) => {
  if (old in obj) {
    console.error(`\`${old}\` is deprecated, please use \`${now}\` instead`)
    return obj[old]
  }
  return obj[now]
}

const ImgCrop = forwardRef((props, cropperRef) => {
  const {
    quality = 0.4,
    fillColor = 'white',
    zoomSlider: ZOOM_SLIDER = true,
    rotationSlider: ROTATION_SLIDER = false,
    aspectSlider = false,
    showReset = false,
    resetText,
    aspect = 1,
    minZoom = 1,
    maxZoom = 3,
    cropShape: CROP_SHAPE = 'rect',
    showGrid: SHOW_GRID = false,
    cropperProps,
    modalClassName,
    modalTitle,
    modalWidth,
    modalOk,
    modalCancel,
    onModalOk,
    onModalCancel,
    modalProps,
    beforeCrop,
    children
  } = props

  const zoomSlider = deprecate(props, 'zoom', 'zoomSlider') || true
  const rotationSlider = deprecate(props, 'rotate', 'rotationSlider') || false
  const cropShape = deprecate(props, 'shape', 'cropShape') || 'rect'
  const showGrid = deprecate(props, 'grid', 'showGrid') || false

  if ('onUploadFail' in props) {
    console.error(
      `\`onUploadFail\` is removed, because the only way it is called, is when the file is rejected by beforeUpload`
    )
  }

  deprecate(props, 'modalMaskTransitionName', 'modalProps.maskTransitionName')
  deprecate(props, 'modalTransitionName', 'modalProps.transitionName')

  const cb = useRef({
    onModalOk,
    onModalCancel,
    beforeCrop
  })

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
      } = easyCropRef.current.cropPixelsRef.current

      if (rotationSlider && easyCropRef.current.rotation !== ROTATION_INITIAL) {
        const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imgSource
        const angle = (easyCropRef.current.rotation * Math.PI) / 180

        const sine = Math.abs(Math.sin(angle))
        const cosine = Math.abs(Math.cos(angle))
        const squareWidth = imgWidth * cosine + imgHeight * sine
        const squareHeight = imgHeight * cosine + imgWidth * sine

        canvas.width = squareWidth
        canvas.height = squareHeight
        ctx.fillStyle = fillColor
        ctx.fillRect(0, 0, squareWidth, squareHeight)

        const squareHalfWidth = squareWidth / 2
        const squareHalfHeight = squareHeight / 2
        ctx.translate(squareHalfWidth, squareHalfHeight)
        ctx.rotate(angle)
        ctx.translate(-squareHalfWidth, -squareHalfHeight)

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
      return async (file, fileList) => {
        return new Promise(async (resolve, reject) => {
          let processedFile = file

          if (typeof cb.current.beforeCrop === 'function') {
            try {
              const result = await cb.current.beforeCrop(file, fileList)
              if (result === false) {
                return runBeforeUpload({ beforeUpload, file, resolve, reject })
              }
              if (result !== true) {
                processedFile = result || file
              }
            } catch (err) {
              return runBeforeUpload({ beforeUpload, file, resolve, reject })
            }
          }

          const reader = new FileReader()
          reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
              setModalImage(reader.result)
            }
          })
          reader.readAsDataURL(processedFile)

          onCancel.current = () => {
            setModalImage('')
            easyCropRef.current.onReset()

            let hasResolveCalled = false

            cb.current.onModalCancel?.((LIST_IGNORE) => {
              resolve(LIST_IGNORE)
              hasResolveCalled = true
            })

            if (!hasResolveCalled) {
              resolve(AntUpload.LIST_IGNORE)
            }
          }

          onOk.current = async (event) => {
            setModalImage('')
            easyCropRef.current.onReset()

            const canvas = getCropCanvas(event.target)
            const { type, name, uid } = processedFile

            canvas.toBlob(
              async (blob) => {
                const newFile = new File([blob], name, { type })
                Object.assign(newFile, { uid })

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

  const modalBaseProps = useMemo(() => {
    const obj = {}
    if (modalWidth !== undefined) obj.width = modalWidth
    if (modalOk !== undefined) obj.okText = modalOk
    if (modalCancel !== undefined) obj.cancelText = modalCancel
    return obj
  }, [modalCancel, modalOk, modalWidth])

  const wrapClassName = `${PREFIX}-modal${
    modalClassName ? ` ${modalClassName}` : ''
  }`

  const lang = typeof window === 'undefined' ? '' : window.navigator.language
  const isCN = lang === 'zh-CN'
  const title = modalTitle || (isCN ? '编辑图片' : 'Edit image')
  const resetBtnText = resetText || (isCN ? '重置' : 'Reset')

  return (
    <>
      {getNewUpload(children)}
      {modalImage && (
        <AntModal
          {...modalProps}
          {...modalBaseProps}
          {...{ [openProp]: true }}
          title={title}
          onCancel={onCancel.current}
          onOk={onOk.current}
          wrapClassName={wrapClassName}
          maskClosable={false}
          destroyOnClose
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
          />
        </AntModal>
      )}
    </>
  )
})

export default ImgCrop
