"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene, Fog, PerspectiveCamera, Vector3 } from "three";

const aspect = 1.2;
const cameraZ = 3;

type GlobeConfig = {
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
};

interface WorldProps {
  globeConfig: GlobeConfig;
}

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#1d072e" />
    </mesh>
  );
}

export default function World({ globeConfig }: WorldProps) {
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 4, 20);

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 0.1, 100)}
    >
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-5, 5, 5)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(5, 5, 5)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(0, 5, 5)}
        intensity={0.8}
      />

      <Sphere />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
        minDistance={cameraZ}
        maxDistance={cameraZ}
      />
    </Canvas>
  );
}
