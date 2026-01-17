import { Clone, useGLTF } from "@react-three/drei";
import { useEffect, memo } from "react";
import { addShadows } from "../utils/addShadows";
import { RigidBody } from "@react-three/rapier";

const Trees = () => {
  const { scene } = useGLTF("/models/tree.glb", true);

  const posY = 5.3;
  const treeMetas = [
    {
      postionXandZ: [-0.2, -2.25],
      scale: 0.1,
    },
    {
      postionXandZ: [4.3, 2.2],
      scale: 0.1,
    },
    {
      postionXandZ: [4.2, 1.9],
      scale: 0.08,
    },
    {
      postionXandZ: [3.3, 5.3],
      scale: 0.1,
    },
    {
      postionXandZ: [-3.2, 5.47],
      scale: 0.09,
    },
    {
      postionXandZ: [3.44, 5.6],
      scale: 0.075,
    },
    {
      postionXandZ: [-0.4, -2.25],
      scale: 0.08,
    }
  ];

  useEffect(() => {
    addShadows({ scene });
  }, [scene]);

  return (
    <>
      {treeMetas.map((meta) => {
        return (
          <RigidBody
            type="fixed"
            position={[meta.postionXandZ[0], posY, meta.postionXandZ[1]]}
          >
            <Clone castShadow receiveShadow object={scene} scale={meta.scale} />
          </RigidBody>
        );
      })}
    </>
  );
};

export default memo(Trees);
