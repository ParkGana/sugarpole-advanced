import { Types, getRenderingEngine } from '@cornerstonejs/core'
import { camera as cameraHelpers } from '../helpers'

export const DicomState = {
    area: 0,
    renderingEngineId: '',
    viewportId: ''
}

export const DicomReducer = (state: any, action: any) => {
    const { renderingEngineId, viewportId } = state
    const { input } = action.payload

    const renderingEngine = getRenderingEngine(renderingEngineId)

    switch (action.type) {
        /* 영역 변경 */
        case 'Change Area':
            return { area: input, renderingEngineId: `RenderingEngine${input}`, viewportId: `Viewport${input}` }

        /* Zoom */
        case 'Zoom':
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

            return state

        /* Flip H */
        case 'Flip H':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                const { flipHorizontal } = viewport.getCamera()

                viewport.setCamera({ flipHorizontal: !flipHorizontal })
                viewport.render()
            }

            return state

        /* Flip V */
        case 'Flip V':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                const { flipVertical } = viewport.getCamera()

                viewport.setCamera({ flipVertical: !flipVertical })
                viewport.render()
            }

            return state

        /* Rotate Delta 30 */
        case 'Rotate Delta 30':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                const { rotation } = viewport.getProperties()

                viewport.setProperties({ rotation: rotation! + 30 })
                viewport.render()
            }

            return state

        /* Invert */
        case 'Invert':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                const { invert } = viewport.getProperties()

                viewport.setProperties({ invert: !invert })
                viewport.render()
            }

            return state

        /* Apply Colormap */
        case 'Apply Colormap':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                viewport.setProperties({ colormap: { name: 'hsv' } })
                viewport.render()
            }

            return state

        /* Reset */
        case 'Reset':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

                viewport.resetCamera()
                viewport.resetProperties()
                viewport.render()
            }

            return state

        /* Previous Image */
        case 'Previous Image':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
                const currentImageIdIndex = viewport.getCurrentImageIdIndex()
                let newImageIdIndex = currentImageIdIndex - 1

                newImageIdIndex = Math.max(newImageIdIndex, 0)

                viewport.setImageIdIndex(newImageIdIndex)
            }

            return state

        /* Next Image */
        case 'Next Image':
            if (renderingEngine) {
                const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
                const currentImageIdIndex = viewport.getCurrentImageIdIndex()
                const numImages = viewport.getImageIds().length
                let newImageIdIndex = currentImageIdIndex + 1

                newImageIdIndex = Math.min(newImageIdIndex, numImages - 1)

                viewport.setImageIdIndex(newImageIdIndex)
            }

            return state

        default:
            return state
    }
}
