const camera = { getZoomedCameraProperties }

export default function getZoomedCameraProperties(camera) {
    const { parallelScale, position, focalPoint } = camera

    return {
        focalPoint,
        position,
        parallelScale: parallelScale * 0.8
    }
}

export { camera }
