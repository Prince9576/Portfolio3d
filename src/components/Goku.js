import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, memo } from "react";
import { addShadows } from "../utils/addShadows";
import { useFrame } from "@react-three/fiber";
import Tooltip from "./Tooltip";
const Goku = memo(() => {
  const goku = useGLTF("/models/goku.glb", true);
  const gokuRef = useRef();

  useFrame((state, delta) => {
    if (gokuRef.current) {
      gokuRef.current.rotation.y += delta * 0.5;
    }
  })

  
  useEffect(() => {
    addShadows(goku);
  });

  return (
    <group position={[-2.6, 5.3, -0.5]} rotation={[0,0,0]}>
      <Tooltip
        text="Anime isn't just entertainment - it's my gateway to endless creativity and inspiration!"
        position={[0, 0, 0]}
        offset={[0, 1.8, 0]}
      >
        <primitive
          ref={gokuRef}
          object={goku.scene}
          scale={0.06}
          castShadow
          receiveShadow
          rotation-y={-0.56}
        />
      </Tooltip>
    </group>
  );
});

export default Goku;
