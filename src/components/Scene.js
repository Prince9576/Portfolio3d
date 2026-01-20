import { Bounds, Center, Float, PresentationControls } from '@react-three/drei';
import Clouds from './Clouds';
import { Island } from './Island';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { isMobile } from '../utils/mobileDetection';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import Football from './Football';
import * as THREE from 'three';
import Trees from './Trees';
import Nature from './Nature';
import Laptop from './Laptop';
import Goku from './Goku';
import Camp from './Camp';
import Bonfire from './Bonfire';
import { colors } from '../theme';

const Scene = ({
  isExperienceZoomed,
  setIsExperienceZoomed,
  isZoomedRef,
  setIsOpen,
  mobileControls,
  jumpRef,
  isLoading,
  onSceneRendered,
}) => {
  const [floating, setFloating] = useState(true);
  const dirLightRef = useRef();
  const _rendered = useRef(false);

  useFrame(() => {
    if (!_rendered.current) {
      _rendered.current = true;
      if (typeof onSceneRendered === 'function') onSceneRendered();
    }
  });
  return (
    <>
      <GradientSkySphere />

      <PresentationControls config={{ mass: 2, tension: 400 }} snap>
        <Float
          rotationIntensity={floating ? 0.24 : 0.15}
          floatIntensity={floating ? 1 : 0.5}
          speed={floating ? 1 : 0.25}
        >
          <group position-y={-1} rotation-x={-(Math.PI * 0.05)}>
            <Clouds position={[-5.5, 4.5, 0]} scale={4} />
            <Clouds position={[5.5, 4.5, 0]} scale={3.5} rotation-y={Math.PI} />

            <directionalLight
              ref={dirLightRef}
              castShadow
              position={[3, 3, 3]}
              intensity={1.5}
              shadow-mapSize-width={isMobile() ? 1024 : 2048}
              shadow-mapSize-height={isMobile() ? 1024 : 2048}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-near={1}
              shadow-camera-far={30}
              shadow-bias={-0.0008}
              color='#ffffff'
            />

            <ambientLight intensity={0.01} color='#ddddff' />

            <Physics>
              <group position-y={-3}>
                <RigidBody type='fixed' restitution={0} friction={1}>
                  {[
                    { position: [-5.0, 7.3, -2.1], rotation: [0, -0.46, 0] },
                    { position: [5.0, 7.4, 2.1], rotation: [0, -0.37, 0] },
                    { position: [-4.75, 7.5, 2.1], rotation: [0, 0.49, 0] },
                    { position: [5, 7.3, -2.1], rotation: [0, 0.35, 0] },
                    { position: [-2.2, 7.2, -4.9], rotation: [0, 1.93, 0] },
                    { position: [1.8, 7.2, -4.8], rotation: [0, -1.8, 0] },
                    { position: [-1.7, 7.2, 5.0], rotation: [0, 1.26, 0] },
                    { position: [2.2, 7.2, 4.9], rotation: [0, -1.2, 0] },
                  ].map((value, index) => (
                    <CuboidCollider
                      key={index}
                      args={[0.625, 2, 2]}
                      position={value.position}
                      rotation={value.rotation}
                    />
                  ))}
                </RigidBody>
                <RigidBody type='fixed' friction={1} restitution={0}>
                  <Center>
                    <Island scale={7.5} scale-x={9} />
                  </Center>
                </RigidBody>

                <group position-z={-2}>
                  <RigidBody type='fixed' friction={1} restitution={0}>
                    <Bounds maxDuration={1} observe margin={isMobile() ? 0.5 : 0.3}>
                      <Laptop
                        isExperienceZoomed={isExperienceZoomed}
                        setIsExperienceZoomed={setIsExperienceZoomed}
                        setFloating={setFloating}
                      />
                    </Bounds>
                  </RigidBody>

                  <RigidBody type='fixed'>
                    <Goku />
                  </RigidBody>

                  <RigidBody type='fixed'>
                    <Nature setIsOpen={setIsOpen} />
                  </RigidBody>

                  <RigidBody type='fixed'>
                    <Bounds maxDuration={1} observe margin={0.035}>
                      <Camp
                        isZoomedRef={isZoomedRef}
                        isExperienceZoomed={isExperienceZoomed}
                        setIsExperienceZoomed={setIsExperienceZoomed}
                        setFloating={setFloating}
                      />
                    </Bounds>
                  </RigidBody>

                  <RigidBody type='fixed'>
                    <Bonfire />
                  </RigidBody>

                  <Football mobileControls={mobileControls} onJumpRef={jumpRef} />
                  <Trees />
                </group>
              </group>
            </Physics>
          </group>
        </Float>
      </PresentationControls>
    </>
  );
};

export default Scene;
const GradientSkySphere = () => {
  return (
    <mesh scale={[1000, 1000, 1000]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        uniforms={{
          topColor: { value: new THREE.Color(colors.sky.top) }, // Light Periwinkle (top)
          midColor: { value: new THREE.Color(colors.sky.mid) }, // Soft Lavender (middle)
          bottomColor: { value: new THREE.Color(colors.sky.bottom) }, // White (bottom)
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 midColor;
          uniform vec3 bottomColor;
          varying vec2 vUv;
          void main() {
            vec3 color;
            // Use vUv.y directly - y=0 is bottom, y=1 is top
            float y = vUv.y;
            
            if (y > 0.5) {
              // Top half: blend from mid (Soft Lavender) to top (Light Periwinkle)
              float factor = (y - 0.5) * 2.0; // Normalize to 0-1
              color = mix(midColor, topColor, smoothstep(0.0, 1.0, factor));
            } else {
              // Bottom half: blend from bottom (White) to mid (Soft Lavender)
              float factor = y * 2.0; // Normalize to 0-1
              color = mix(bottomColor, midColor, smoothstep(0.0, 1.0, factor));
            }
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};
