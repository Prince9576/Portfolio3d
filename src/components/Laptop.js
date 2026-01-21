import { Html, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useEffect, useRef, memo, useCallback } from 'react';
import { addShadows } from '../utils/addShadows';
import Tooltip from './Tooltip';
import { isMobile } from '../utils/mobileDetection';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';

const Laptop = memo(({ isExperienceZoomed, setIsExperienceZoomed, setFloating }) => {
  const stump = useGLTF('/models/stump.glb', true);
  const laptop = useGLTF('/models/laptop.glb', true);
  const coffee = useGLTF('/models/coffee.glb', true);
  const controller = useGLTF('/models/controller.glb', true);

  const localSceneRef = useRef();
  const laptopRef = useRef();
  const screenRef = useRef();
  const screenPlaneRef = useRef();
  const { camera } = useThree();
  const [subscribeKeys] = useKeyboardControls();
  const originalCameraState = useRef(null);
  const isExperienceZoomedRef = useRef(isExperienceZoomed);

  const mobile = isMobile();

  const returnBackToOriginal = useCallback(() => {
    if (localSceneRef.current) {
      const original = originalCameraState.current;
      gsap.to(camera.position, {
        x: original.position.x,
        y: original.position.y,
        z: original.position.z,
        duration: 1,
        ease: 'power2.out',
      });
      gsap.to(camera.rotation, {
        x: original.rotation.x,
        y: original.rotation.y,
        z: original.rotation.z,
        duration: 1,
        ease: 'power2.out',
      });
    }
    setTimeout(() => {
      setIsExperienceZoomed(false);
    }, 1050);
    setFloating(true);
  }, [camera, setFloating, setIsExperienceZoomed]);

  const handleLaptopClick = useCallback((event) => {
    if (!isExperienceZoomed) {
      event.stopPropagation();

      if (!screenRef.current || !screenPlaneRef.current) return;

      const screenWorldPos = new THREE.Vector3();
      const screenWorldQuat = new THREE.Quaternion();
      const screenUp = new THREE.Vector3();
      const screenNormal = new THREE.Vector3();

      screenRef.current.getWorldPosition(screenWorldPos);
      screenPlaneRef.current.getWorldQuaternion(screenWorldQuat);
      screenUp.set(0, 1, 0).applyQuaternion(screenWorldQuat).normalize();
      screenNormal.set(0, 0, 1).applyQuaternion(screenWorldQuat).normalize();

      const screenBox = new THREE.Box3().setFromObject(screenPlaneRef.current);
      const screenSize = new THREE.Vector3();
      screenBox.getSize(screenSize);

      const fov = THREE.MathUtils.degToRad(camera.fov);
      
      let fillRatio;
      if (isMobile()) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const referenceAspectRatio = 375 / 667;
        const referenceFillRatio = 0.8;
        
        fillRatio = referenceFillRatio * (aspectRatio / referenceAspectRatio);
        
        fillRatio = Math.max(0.5, Math.min(1.0, fillRatio));
      } else {
        fillRatio = 1.25;
      }
      
      const distance = (screenSize.y * 0.5) / Math.tan(fov * 0.5) / fillRatio;

      const targetPos = screenWorldPos.clone().add(screenNormal.multiplyScalar(distance));

      camera.up.set(0, 1, 0);
      const lookAtMatrix = new THREE.Matrix4().lookAt(targetPos, screenWorldPos, screenUp);
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.1,
        ease: 'power2.inOut',
      });
      gsap.to(camera.quaternion, {
        x: targetQuat.x,
        y: targetQuat.y,
        z: targetQuat.z,
        w: targetQuat.w,
        duration: 1.1,
        ease: 'power2.inOut',
      });

      setTimeout(() => {
        setIsExperienceZoomed(true);
      }, 1050);
      setFloating(false);
    }
  }, [isExperienceZoomed, camera, setIsExperienceZoomed, setFloating, mobile]);

  const screenRotation = mobile
    ? [-0.34, 0.57, 0.25 + Math.PI / 2]
    : [-0.34, 0.57, 0.25];
  const screenPlaneSize = mobile ? [0.62, 0.95] : [0.95, 0.62];
  const screenStyle = mobile
    ? { width: '150px', height: '220px' }
    : { width: '220px', height: '150px' };

  const handleDoubleClick = useCallback((event) => {
    if (isExperienceZoomed && mobile) {
      event.stopPropagation();
      returnBackToOriginal();
    }
  }, [isExperienceZoomed, mobile, returnBackToOriginal]);

  useEffect(() => {
    addShadows(coffee);
    addShadows(stump);
    addShadows(controller);
    addShadows(laptop);

    originalCameraState.current = {
      position: camera.position.clone(),
      rotation: camera.rotation.clone(),
      zoom: camera.zoom,
    };

    const unsub = subscribeKeys(
      (state) => state.esc,
      (pressed) => {
        if (pressed === true && isExperienceZoomedRef.current) {
          returnBackToOriginal();
        }
      }
    );

    return () => unsub();
  }, [coffee, stump, controller, laptop, camera.position, camera.rotation, camera.zoom, subscribeKeys, returnBackToOriginal]);

  useEffect(() => {
    isExperienceZoomedRef.current = isExperienceZoomed;
  }, [isExperienceZoomed]);

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
          onClick={handleLaptopClick}
          onDoubleClick={handleDoubleClick}
        />

        <mesh ref={screenRef} position={[-0.18, 1.03, -0.18]} visible={false}>
          <boxGeometry args={[0.01, 0.01, 0.01]} />
        </mesh>

        <mesh
          ref={screenPlaneRef}
          position={[-0.18, 1.03, -0.18]}
          rotation={screenRotation}
          visible={false}
        >
          <planeGeometry args={screenPlaneSize} />
        </mesh>

        <Html
          position={[-0.18, 1.03, -0.18]}
          rotation={screenRotation}
          distanceFactor={1} 
          transform
          occlude={false}
          zIndexRange={[10, 0]}
          style={{
            ...screenStyle,
            zIndex: 10,
            opacity: 1,
            userSelect: isExperienceZoomed ? 'auto' : 'none',
            overflow: 'hidden',
            backgroundColor: '#000',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* Transparent overlay to capture clicks when not zoomed */}
          {!isExperienceZoomed && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1000,
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleLaptopClick(e);
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                handleLaptopClick(e);
              }}
            />
          )}
          <iframe 
            src="https://www.youtube.com/watch?v=Q7AOvWpIVHU" 
            title="2D Portfolio" 
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none', 
              backgroundColor: '#000',
              display: 'block',
              pointerEvents: isExperienceZoomed ? 'auto' : 'none',
            }} 
            allow="autoplay; encrypted-media"
          />
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
