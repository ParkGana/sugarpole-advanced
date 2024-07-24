import { RenderingEngine, Types, Enums, getRenderingEngine } from '@cornerstonejs/core'
import { initDemo, createImageIdsAndCacheMetaData, ctVoiRange, camera as cameraHelpers } from '../helpers'

const renderingEngineId = 'myRenderingEngine'
const viewportId = 'CT_STACK'

/* 이미지 로딩 */
export const LoadImage = async () => {
    const { ViewportType, Events } = Enums

    const content = document.getElementById('content')

    if (content) {
        const element = document.createElement('div')

        element.style.width = '712px'
        element.style.height = '892px'

        content.appendChild(element)

        element.addEventListener(Events.CAMERA_MODIFIED, () => {
            const renderingEngine = getRenderingEngine(renderingEngineId)

            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                if (!viewport) {
                    return
                }
            }
        })

        await initDemo()

        const imageIds = await createImageIdsAndCacheMetaData({
            StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
            SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
            wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb'
        })

        const renderingEngine = new RenderingEngine(renderingEngineId)

        const viewportInput = {
            viewportId,
            type: ViewportType.STACK,
            element,
            defaultOptions: {
                background: <Types.Point3>[0, 0, 0]
            }
        }

        renderingEngine.enableElement(viewportInput)

        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
        const stack = [imageIds[0], imageIds[1], imageIds[2]]

        await viewport.setStack(stack)
        viewport.setProperties({ voiRange: ctVoiRange })
        viewport.render()
    }
}

/* Zoom 버튼 클릭 */
export const Zoom = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
        const camera = viewport.getCamera()

        const { parallelScale, position, focalPoint } = cameraHelpers.getZoomedCameraProperties(camera)

        const newCamera = {
            parallelScale,
            position: <Types.Point3>position,
            focalPoint: <Types.Point3>focalPoint
        }

        viewport.setCamera(newCamera)
        viewport.render()
    }
}

/* Flip H 버튼 클릭 */
export const FlipH = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

        const { flipHorizontal } = viewport.getCamera()

        viewport.setCamera({ flipHorizontal: !flipHorizontal })
        viewport.render()
    }
}

/* Flip V 버튼 클릭 */
export const FlipV = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

        const { flipVertical } = viewport.getCamera()

        viewport.setCamera({ flipVertical: !flipVertical })
        viewport.render()
    }
}

/* Rotate Delta 30 버튼 클릭 */
export const RotateDelta30 = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

        const { rotation } = viewport.getProperties()

        viewport.setProperties({ rotation: rotation! + 30 })
        viewport.render()
    }
}

/* Invert 버튼 클릭 */
export const Invert = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

        const { invert } = viewport.getProperties()

        viewport.setProperties({ invert: !invert })
        viewport.render()
    }
}

/* Apply Colormap 버튼 클릭 */
export const ApplyColormap = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

        viewport.setProperties({ colormap: { name: 'hsv' } })
        viewport.render()
    }
}

/* Reset 버튼 클릭 */
export const Reset = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

        viewport.resetCamera()
        viewport.resetProperties()
        viewport.render()
    }
}

/* Previous Image 버튼 클릭 */
export const PreviousImage = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
        const currentImageIdIndex = viewport.getCurrentImageIdIndex()
        let newImageIdIndex = currentImageIdIndex - 1

        newImageIdIndex = Math.max(newImageIdIndex, 0)

        viewport.setImageIdIndex(newImageIdIndex)
    }
}

/* Next Image 버튼 클릭 */
export const NextImage = () => {
    const renderingEngine = getRenderingEngine(renderingEngineId)

    if (renderingEngine) {
        const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
        const currentImageIdIndex = viewport.getCurrentImageIdIndex()
        const numImages = viewport.getImageIds().length
        let newImageIdIndex = currentImageIdIndex + 1

        newImageIdIndex = Math.min(newImageIdIndex, numImages - 1)

        viewport.setImageIdIndex(newImageIdIndex)
    }
}
