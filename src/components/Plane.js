import { Center, Sky, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Plane = ({ children }) => {
  const ref = useRef();
  const { scene } = useGLTF('/models/paperplane.glb');

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5);
    }
  });

  return (
    <Center>
      <Sky
        distance={450000}
        sunPosition={[50, 100, 50]}
        inclination={0.5}
        azimuth={0.55}
        mieCoefficient={0.02}
        mieDirectionalG={0.6}
        turbidity={0}
        rayleigh={0.25}
      />
      <ambientLight intensity={1} />
      <directionalLight intensity={2.5} />
      <primitive ref={ref} object={scene} scale={8} rotation-y={-(Math.PI * 0.25)} position-y={1} />
      <Center position-y={-0.5}>{children}</Center>
    </Center>
  );
};

export default Plane;
