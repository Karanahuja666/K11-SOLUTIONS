import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50
      arr[i * 3 + 1] = (Math.random() - 0.5) * 50
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02
      ref.current.rotation.y -= delta * 0.03
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#8b5cf6" size={0.04} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  )
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.5) * 0.05)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} wireframe />
    </mesh>
  )
}

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.08
      ref.current.rotation.x = clock.elapsedTime * 0.05
    }
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.12} wireframe />
    </mesh>
  )
}

export default function CosmicScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <Stars />
        <GlowSphere />
        <WireframeSphere />
      </Canvas>
    </div>
  )
}
