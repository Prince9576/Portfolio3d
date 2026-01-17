import { useGLTF } from "@react-three/drei";
import { useEffect, memo } from "react";
import Tooltip from "./Tooltip";
import { addShadows } from "../utils/addShadows";

const Bonfire = memo(() => {
  const bonfire = useGLTF("/models/bonfire.glb", true);

  useEffect(() => {
    addShadows(bonfire);
  });

  return (
    <group position={[-0.25, 5.4, 4]}>
      <Tooltip
        text="Under starlit skies by crackling flames - where epic stories & wild adventures are born!"
        position={[0, 0, 0]}
        offset={[0, 1.5, 0]}
      >
        <primitive
          object={bonfire.scene}
          scale={0.15}
          castShadow
          receiveShadow
          rotation-y={-0.56}
        />
      </Tooltip>
    </group>
  );
});

export default Bonfire;
