import React, { useRef, memo } from 'react';
import { useGLTF } from '@react-three/drei';

const Island = memo((props) => {
  const { nodes, materials } = useGLTF('/models/island.glb', true);
  const islandRef = useRef();
  return (
    <group ref={islandRef} receiveShadow {...props} dispose={null}>
      <group name='Scene'>
        <group name='Island03_Cylinder'>
          <mesh
            name='Island03_Cylinder-Mesh001'
            receiveShadow
            geometry={nodes['Island03_Cylinder-Mesh001'].geometry}
            material={materials['Dirt.001']}
          />
          <mesh
            name='Island03_Cylinder-Mesh001_1'
            receiveShadow
            geometry={nodes['Island03_Cylinder-Mesh001_1'].geometry}
            material={materials['Grass.001']}
          />
        </group>
      </group>
    </group>
  );
});

export { Island };
