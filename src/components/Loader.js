import { Text3D, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, memo } from "react";
import * as THREE from "three";
import { colors } from "../theme";

const geometry = new THREE.SphereGeometry(0.25, 16);

const Loader = memo(({ progress = 0 }) => {
  const [baseMatcap] = useMatcapTexture("5B4CBC_B59AF2_9B84EB_8F78E4");
  const materials = useMemo(
    () => ({
      text: new THREE.MeshMatcapMaterial({
        color: colors.primary[100],
        matcap: baseMatcap,
      }),
      dot: new THREE.MeshMatcapMaterial({
        color: colors.primary[100],
        matcap: baseMatcap,
      }),
    }),
    [baseMatcap]
  );
  const dotRefs = useRef([]);
  const lastTrigger = useRef(0);

  let currentDotIndex = 0;
  useFrame((state) => {
    const now = state.clock.elapsedTime;
    if (dotRefs.current) {
      if (now - lastTrigger.current >= 0.5) {
        dotRefs.current.forEach((dot) => {
          dot.material.transparent = true;
          dot.material.opacity = 0.5;
          dot.material.color.set(colors.primary[100]);
        });
        if (dotRefs.current[currentDotIndex % 3]) {
          dotRefs.current[currentDotIndex % 3].material.color.set(
            colors.neutral[400]
          );
        }
        if (currentDotIndex >= 2) {
          currentDotIndex = 0;
        } else {
          currentDotIndex++;
        }
        lastTrigger.current = now;
      }
    }
  });

  return (
    <>
      <Text3D
        rotation-x={-0.25}
        font="/fonts/raleway-semibold.json"
        curveSegments={10}
        brevelSegments={1}
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.01}
        letterSpacing={0.3}
        scale={0.35}
      >
        LOADING
        <primitive object={materials.text} />
      </Text3D>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <mesh
            key={i}
            ref={(el) => (dotRefs.current[i] = el)}
            geometry={geometry}
            scale={0.2}
            position={[3 + i * 0.25, 0.03, 0]}
          >
            <primitive object={materials.dot.clone()} />
          </mesh>
        );
      })}
    </>
  );
});

export default Loader;
