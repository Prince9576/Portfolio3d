import { useGLTF } from '@react-three/drei';

const Nature = ({ setIsOpen }) => {
  const mushroom = useGLTF('/models/mushrooms.glb', true);
  const cell = useGLTF('/models/cell.glb', true);

  function handleClick(event) {
    event.stopPropagation();
    setIsOpen(true);
  }

  return (
    <group position={[2.5, 5, 5.75]}>
      <primitive object={mushroom.scene} scale={0.275} rotation-y={-2.4} castShadow />

      <primitive
        object={cell.scene}
        scale={3}
        position={[-0.5, -0.4, 0.325]}
        rotation-y={-0.56}
        rotation-x={-0.12}
        castShadow
        onClick={handleClick}
      />
    </group>
  );
};

export default Nature;
