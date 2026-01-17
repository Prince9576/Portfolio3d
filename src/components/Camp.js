import { useBounds, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, memo } from "react";
import { addShadows } from "../utils/addShadows";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import Tooltip from "./Tooltip";
import { isMobile } from "../utils/mobileDetection";


const Camp = ({setFloating,
  isExperienceZoomed,
  setIsExperienceZoomed}) => {
  const camp = useGLTF("/models/camp.glb", true);
  const scooter = useGLTF("/models/scooter.glb", true);
  const { camera } = useThree();
  const [subscribeKeys] = useKeyboardControls();
  const originalCameraState = useRef(null);
  const bounds = useBounds();
  const localSceneRef = useRef();
  const campRef = useRef();
  const isExperienceZoomedRef = useRef(isExperienceZoomed);

  useEffect(() => {
    addShadows(camp);
    addShadows(scooter);

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
  }, [camp, scooter, camera.position, camera.rotation, camera.zoom, subscribeKeys, returnBackToOriginal]);


  function handlePointerEnter(event) {
    if (!isExperienceZoomed) {
      event.stopPropagation();
      if (localSceneRef.current) {
        gsap.to(localSceneRef.current.rotation, {
          y: 0.3,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      bounds.refresh(campRef.current).fit();
      setTimeout(() => {
        setIsExperienceZoomed(true);
      }, 1050);
      setFloating(false);
    }
  }

  function handleDoubleClick(event) {
    if (isExperienceZoomed && isMobile()) {
      event.stopPropagation();
      returnBackToOriginal();
    }
  }

  function returnBackToOriginal() {
    if (localSceneRef.current) {
      gsap.to(localSceneRef.current.rotation, {
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
      const original = originalCameraState.current;
      gsap.to(camera.position, {
        x: original.position.x,
        y: original.position.y,
        z: original.position.z,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(camera.rotation, {
        x: original.rotation.x,
        y: original.rotation.y,
        z: original.rotation.z,
        duration: 1,
        ease: "power2.out",
      });
    }
    setTimeout(() => {
      setIsExperienceZoomed(false);
    }, 1050);
    setFloating(true);
  }

  useEffect(() => {
    isExperienceZoomedRef.current = isExperienceZoomed;
  }, [isExperienceZoomed]);

  return (
    <group position={[2.25, 5.4, 0.5]} scale={1.25} ref={localSceneRef}>
      <Tooltip
        text="Click here to dive into my skills - I promise it's more exciting than it sounds!"
        position={[0, 0, 0]}
        offset={[0, 1.5, 0]}
        delay={150}
      >
        <primitive
          ref={campRef}
          onClick={handlePointerEnter}
          onDoubleClick={handleDoubleClick}
          object={camp.scene}
          scale={1.15}
          castShadow
          receiveShadow
          rotation-y={-0.56}
        />
      </Tooltip>
      
      <Tooltip
        text="Two wheels, endless adventures! My trusty ride through countless roads & memories"
        position={[-1.2, -0.1, -0.3]}
        offset={[0, 1.3, 0]}
      >
        <primitive
          object={scooter.scene}
          scale={0.2}
          castShadow
          rotation-y={0.35}
        />
      </Tooltip>
    </group>
  );
};

export default memo(Camp);
