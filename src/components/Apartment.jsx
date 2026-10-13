import { useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

// The apartment interior (CC-BY, "Modern apartment interior" by Katydid / Sketchfab).
// The model is already upright (Y-up); we normalise its size and centre its bounding
// box on the origin so the showcase box frames the interior in the middle of the view.
export default function Apartment({ size = 6 }) {
  const { scene } = useGLTF('/apartment.glb')

  const scale = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    const sz = new THREE.Vector3()
    box.getSize(sz)
    const maxDim = Math.max(sz.x, sz.y, sz.z) || 1
    return size / maxDim
  }, [scene, size])

  return (
    <Center>
      <group scale={scale}>
        <primitive object={scene} />
      </group>
    </Center>
  )
}
