// @ts-nocheck
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  useGLTF,
  useVideoTexture,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  BrightnessContrast,
  TiltShift2,
  WaterEffect,
  ToneMapping,
} from "@react-three/postprocessing";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect, useRef } from "react";

/* =========================
   MODAL
========================= */

export default function Modal() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth - 0.5);
      setMouseY(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        className="!w-full !h-full"
        gl={{ antialias: false }}
        flat
        shadows
        camera={{ position: [0, 0, 8], fov: 35 }}
      >
        <ambientLight intensity={1.8} />

        <Scene
          position={[0, -60, -200]}
          scale={100}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        <Postpro />
      </Canvas>
    </div>
  );
}

/* =========================
   POST PROCESSING
========================= */

function Postpro() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom mipmapBlur luminanceThreshold={0.1} intensity={2} />
    </EffectComposer>
  );
}

/* =========================
   OPTIONAL LIGHT COOKIE
========================= */

function Cookie(props: any) {
  const texture = useVideoTexture("/video/caustics.mp4");
  return <spotLight decay={0} map={texture} castShadow {...props} />;
}

/* =========================
   SCENE (FIXED ROTATION)
========================= */

function Scene({ mouseX, mouseY, ...props }: any) {
  const gltf = useLoader(GLTFLoader, "/3d/statue.glb");
  const ref = useRef<any>();

  // persistent idle rotation
  const autoRotX = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;

    /* ===== idle rotation ===== */
    autoRotX.current += delta * 0.12;

    /* ===== mouse rotation ===== */
    const mouseRotX = mouseY * Math.PI * 0.25;
    const mouseRotY = mouseX * Math.PI * 0.35;

    /* ===== combine smoothly ===== */

    // mouse only
    ref.current.rotation.x +=
      (mouseRotX - ref.current.rotation.x) * 0.08;

    // mouse + idle spin (moved here)
    ref.current.rotation.y +=
      (mouseRotY + autoRotX.current - ref.current.rotation.y) * 0.08;
  });


  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      {...props}
    />
  );
}
