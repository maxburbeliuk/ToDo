import React, { forwardRef, useCallback, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Center, FileInput, Slider, Flex, Button } from '@mantine/core'

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
} from './taskImageLogic'

const TaskImageUpload = forwardRef((props, ref) => {
  const {
    cropperRef,
    zoomSlider,
    rotationSlider,
    aspectSlider,
    showReset,
    resetBtnText,

    modalImage,
    aspect: ASPECT_INITIAL,
    minZoom,
    maxZoom,
    cropShape,
    showGrid,

    cropperProps
  } = props

  const [zoom, setZoom] = useState(ZOOM_INITIAL)
  const [rotation, setRotation] = useState(ROTATION_INITIAL)
  const [aspect, setAspect] = useState(ASPECT_INITIAL)

  const isResetActive =
    zoom !== ZOOM_INITIAL ||
    rotation !== ROTATION_INITIAL ||
    aspect !== ASPECT_INITIAL

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

  const wrapperClass =
    'display:flex align-items:center width:60% margin-inline:auto'

  const buttonClass =
    'display:flex align-items:center justify-content:center height:32px width:32px background:transparent border:0 font-family:inherit font-size:18px cursor:pointer disabled:opacity:20% disabled:cursor:default'

  const sliderClass = 'flex:1'

  return (
    <>
      <Cropper
        {...cropperProps}
        ref={cropperRef}
        image={modalImage}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={aspect}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoomWithScroll={zoomSlider}
        cropShape={cropShape}
        showGrid={showGrid}
        onCropChange={onCropChange}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        classes={{
          containerClassName: `${PREFIX}-container position:relative width:100% height:40vh &~section:first-of-type:margin-top:16px &~section:last-of-type:margin-bottom:16px`,
          mediaClassName: `${PREFIX}-media`
        }}
      />

      {zoomSlider && (
        <section
          className={`${PREFIX}-control ${PREFIX}-control-zoom ${wrapperClass}`}
        >
          <button
            className={buttonClass}
            onClick={() => setZoom(zoom - ZOOM_STEP)}
            disabled={zoom - ZOOM_STEP < minZoom}
          >
            －
          </button>
          <Slider
            className={sliderClass}
            min={minZoom}
            max={maxZoom}
            step={ZOOM_STEP}
            value={zoom}
            onChange={setZoom}
          />
          <button
            className={buttonClass}
            onClick={() => setZoom(zoom + ZOOM_STEP)}
            disabled={zoom + ZOOM_STEP > maxZoom}
          >
            ＋
          </button>
        </section>
      )}

      {rotationSlider && (
        <section
          className={`${PREFIX}-control ${PREFIX}-control-rotation ${wrapperClass}`}
        >
          <button
            className={`${buttonClass} font-size:16px`}
            onClick={() => setRotation(rotation - ROTATION_STEP)}
            disabled={rotation === ROTATION_MIN}
          >
            ↺
          </button>
          <Slider
            className={sliderClass}
            min={ROTATION_MIN}
            max={ROTATION_MAX}
            step={ROTATION_STEP}
            value={rotation}
            onChange={setRotation}
          />
          <button
            className={`${buttonClass} font-size:16px`}
            onClick={() => setRotation(rotation + ROTATION_STEP)}
            disabled={rotation === ROTATION_MAX}
          >
            ↻
          </button>
        </section>
      )}

      {aspectSlider && (
        <section
          className={`${PREFIX}-control ${PREFIX}-control-aspect ${wrapperClass}`}
        >
          <button
            className={buttonClass}
            onClick={() => setAspect(aspect - ASPECT_STEP)}
            disabled={aspect - ASPECT_STEP < ASPECT_MIN}
          >
            ↕️
          </button>
          <Slider
            className={sliderClass}
            min={ASPECT_MIN}
            max={ASPECT_MAX}
            step={ASPECT_STEP}
            value={aspect}
            onChange={setAspect}
          />
          <button
            className={buttonClass}
            onClick={() => setAspect(aspect + ASPECT_STEP)}
            disabled={aspect + ASPECT_STEP > ASPECT_MAX}
          >
            ↔️
          </button>
        </section>
      )}

      {showReset && (zoomSlider || rotationSlider || aspectSlider) && (
        <Button
          className="bottom:20px position:absolute"
          style={isResetActive ? {} : { opacity: 0.3, pointerEvents: 'none' }}
          onClick={onReset}
        >
          {resetBtnText}
        </Button>
      )}
    </>
  )
})

export default TaskImageUpload
