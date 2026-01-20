import { Html, useGLTF } from '@react-three/drei';
import { useEffect, useRef, memo } from 'react';
import { addShadows } from '../utils/addShadows';
import Tooltip from './Tooltip';
import { isMobile } from '../utils/mobileDetection';
import About from './About';

const Laptop = memo(({ isExperienceZoomed, setIsExperienceZoomed, setFloating }) => {
  const stump = useGLTF('/models/stump.glb', true);
  const laptop = useGLTF('/models/laptop.glb', true);
  const coffee = useGLTF('/models/coffee.glb', true);
  const controller = useGLTF('/models/controller.glb', true);

  const localSceneRef = useRef();
  const laptopRef = useRef();

  const mobile = isMobile();

  useEffect(() => {
    addShadows(coffee);
    addShadows(stump);
    addShadows(controller);
    addShadows(laptop);
  }, [coffee, stump, controller, laptop]);

  return (
    <group
      ref={localSceneRef}
      position={[-3.4 + (mobile ? 1.1 : 0), 5.3, 4.3 + (mobile ? 0.9 : 0)]}
    >
      <primitive object={stump.scene} scale={4.5} rotation-y={-0.26} castShadow receiveShadow />

      <group ref={laptopRef}>
        <primitive
          position={[0.15, 0.775, -0.15]}
          object={laptop.scene}
          scale={0.16}
          rotation-y={-0.97}
          rotation-x={0.1}
          castShadow
          receiveShadow
        />

        {/* About Page HTML - Always visible */}
        <Html
          position={[-0.18, 1.03, -0.18]}
          rotation-x={-0.34}
          rotation-y={0.57}
          rotation-z={0.25}
          distanceFactor={1}
          scale={0.23}
          transform={true}
          occlude
          zIndexRange={[100, 0]}
          style={{
            width: `${950}px`,
            height: `${650}px`,
            pointerEvents: isExperienceZoomed ? 'auto' : 'none',
            zIndex: 10,
          }}
        >
          <div className='laptop-about-page'>
            <About />
          </div>
        </Html>
      </group>

      <Tooltip
        text='Coffee, masala chai, or beer - my liquid fuel for epic coding marathons!'
        position={[0.3, 0.05, -0.9]}
        offset={[0, 1.2, 0]}
      >
        <primitive
          object={coffee.scene}
          scale={0.22}
          rotation-y={0.64}
          rotation-x={0}
          castShadow
          receiveShadow
        />
      </Tooltip>

      <Tooltip
        text="Gaming isn't just a hobby - it's my zen mode and creativity booster!"
        position={[0.4, 0.15, 0.5]}
        offset={[0, 1.5, 0]}
      >
        <primitive object={controller.scene} scale={0.4} rotation={[-0.1, -0.72, 0.44]} />
      </Tooltip>
    </group>
  );
});

export default Laptop;
