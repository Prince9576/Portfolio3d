import React, { memo } from 'react';
import { useGLTF } from '@react-three/drei';
import { isMobile } from '../utils/mobileDetection';

const Clouds = (props) => {
  const { nodes, materials } = useGLTF('/models/clouds.glb', true);

  // Detect if this is left or right cloud based on position
  const isLeftCloud = props.position && props.position[0] < 0;

  // Detect mobile screen
  const mobile = isMobile();

  // Calculate mobile position offsets with your tested values
  const mobileX = props.position
    ? props.position[0] + (mobile ? (isLeftCloud ? 3.9 : -3.9) : 0)
    : 0;
  const mobileY = props.position ? props.position[1] + (mobile ? (isLeftCloud ? 1.9 : 0.9) : 0) : 0;
  const mobileZ = props.position ? props.position[2] : 0;

  // Scale down clouds on mobile
  const cloudScale = props.scale ? (mobile ? props.scale * 0.8 : props.scale) : 1;

  return (
    <group {...props} position={[mobileX, mobileY, mobileZ]} scale={cloudScale} dispose={null}>
      <mesh geometry={nodes.Node.geometry} material={materials.mat21} />
    </group>
  );
};

export default memo(Clouds);
