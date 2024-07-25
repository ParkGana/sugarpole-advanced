import { RenderingEngine, Types, Enums, getRenderingEngine } from '@cornerstonejs/core'
import { initDemo, createImageIdsAndCacheMetaData, ctVoiRange } from '../helpers'

/* DICOM 이미지 로드 */
export const LoadImage = async (value: number) => {
    const { ViewportType, Events } = Enums

    const renderingEngineId = `RenderingEngine${value}`
    const viewportId = `Viewport${value}`

    const content = document.getElementById(`content${value}`)

    if (content) {
        const element = document.createElement('div')

        element.style.width = '704px'
        element.style.height = '884px'

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

        const imageIds =
            value === 1
                ? await createImageIdsAndCacheMetaData({
                      StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
                      SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
                      wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb'
                  })
                : await createImageIdsAndCacheMetaData({
                      StudyInstanceUID: '1.3.6.1.4.1.25403.345050719074.3824.20170125113417.1',
                      SeriesInstanceUID: '1.3.6.1.4.1.25403.345050719074.3824.20170125113545.4',
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
