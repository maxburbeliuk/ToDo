import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Cropper from 'react-easy-crop'
import {
  ASPECT_MAX,
  ASPECT_MIN,
  ASPECT_STEP,
  PREFIX,
  ROTATION_INITIAL,
  ROTATION_MAX,
  ROTATION_MIN,
  ROTATION_STEP,
  ZOOM_INITIAL,
  ZOOM_STEP
} from './__constants__'
import { Flex, Slider } from '@mantine/core'
import {
  IconMinus,
  IconPlus,
  IconRotate,
  IconRotateClockwise
} from '@tabler/icons-react'

const EasyCrop = forwardRef((props, ref) => {
  const {
    cropperRef,
    zoomSlider,
    rotationSlider,
    aspectSlider,

    modalImage,
    aspect: ASPECT_INITIAL,
    minZoom,
    maxZoom,
    cropShape,
    showGrid,

    cropperProps,

    setIsResetActive
  } = props

  const [zoom, setZoom] = useState(ZOOM_INITIAL)
  const [rotation, setRotation] = useState(ROTATION_INITIAL)
  const [aspect, setAspect] = useState(ASPECT_INITIAL)

  const onReset = () => {
    setZoom(ZOOM_INITIAL)
    setRotation(ROTATION_INITIAL)
    setAspect(ASPECT_INITIAL)
  }

  const [crop, onCropChange] = useState({ x: 0, y: 0 })
  const cropPixelsRef = useRef({ width: 0, height: 0, x: 0, y: 0 })

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    cropPixelsRef.current = croppedAreaPixels
  }, [])

  useImperativeHandle(ref, () => ({
    rotation,
    cropPixelsRef,
    onReset
  }))

  useEffect(() => {
    zoom !== ZOOM_INITIAL ||
    rotation !== ROTATION_INITIAL ||
    aspect !== ASPECT_INITIAL
      ? setIsResetActive(true)
      : setIsResetActive(false)
  }, [zoom, rotation, aspect])

  return (
    <>
      <div
        style={{
          height: '40vh',
          marginTop: 16,
          marginBottom: 16,
          position: 'relative'
        }}
      >
        <Cropper
          {...cropperProps}
          ref={cropperRef}
          image={modalImage}
          crop={crop}
          //
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomWithScroll={zoomSlider}
          //
          cropShape={cropShape}
          showGrid={showGrid}
          onCropChange={onCropChange}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          classes={{
            mediaClassName: `${PREFIX}-media`
          }}
        />
      </div>

      <Flex gap="sm" justify="center" direction="column">
        {zoomSlider && (
          <Flex gap="sm" justify="center">
            <IconPlus size={18} />
            <Slider
              w={300}
              marks={[
                { value: 0 },
                { value: 90 },
                { value: 180 },
                { value: 270 }
              ]}
              // step={1}
              step={ZOOM_STEP}
              min={minZoom}
              max={maxZoom}
              // min={0}
              // max={270}
              value={zoom}
              onChange={(value) => {
                setZoom(value)
              }}
            />
            <IconMinus size={18} />
          </Flex>
        )}

        {rotationSlider && (
          <Flex justify="center" align="center" gap="sm">
            <IconRotate size={18} />

            <Slider
              w={300}
              marks={[{ value: 1 }, { value: 2 }, { value: 3 }]}
              // step={1}
              step={ROTATION_STEP}
              min={ROTATION_MIN}
              max={ROTATION_MAX}
              // min={0}
              // max={270}
              value={rotation}
              onChange={(value) => {
                setRotation(value)
              }}
            />

            <IconRotateClockwise size={18} />
          </Flex>
        )}

        {aspectSlider && (
          <Flex gap="sm" justify="center">
            <IconPlus size={18} />
            <Slider
              w={300}
              marks={[{ value: 1 }, { value: 2 }, { value: 3 }]}
              min={ASPECT_MIN}
              max={ASPECT_MAX}
              step={ASPECT_STEP}
              value={aspect}
              onChange={(value) => {
                setAspect(value)
              }}
            />
            <IconMinus size={18} />
          </Flex>
        )}
      </Flex>
    </>
  )
})

export default memo(EasyCrop)
