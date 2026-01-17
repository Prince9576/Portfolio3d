import {
  Html,
  useBounds,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { useEffect, useRef, memo } from "react";
import { addShadows } from "../utils/addShadows";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import Tooltip from "./Tooltip";
import { isMobile } from "../utils/mobileDetection";
import About from "./About";

const Laptop = memo(
  ({ isExperienceZoomed, setIsExperienceZoomed, setFloating }) => {
    const stump = useGLTF("/models/stump.glb", true);
    const laptop = useGLTF("/models/laptop.glb", true);
    const coffee = useGLTF("/models/coffee.glb", true);
    const controller = useGLTF("/models/controller.glb", true);

    const { camera } = useThree();
    const [subscribeKeys] = useKeyboardControls();
    const originalCameraState = useRef(null);
    const bounds = useBounds();
    const localSceneRef = useRef();
    const laptopRef = useRef();
    const isExperienceZoomedRef = useRef(isExperienceZoomed);

    const mobile = isMobile();

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

    function handleLaptopClick(event) {
      if (!isExperienceZoomed) {
        event.stopPropagation();
        if (localSceneRef.current) {
          gsap.to(localSceneRef.current.rotation, {
            y: -0.2,
            z: -0.1,
            x: 0.2,
            duration: 0.8,
            ease: "power2.out",
          });
        }
        bounds.refresh(laptopRef.current).fit();
        setTimeout(() => {
          setIsExperienceZoomed(true);
        }, 1050);
        setFloating(false);
      }
    }

    function handleDoubleClick(event) {
      if (isExperienceZoomed && mobile) {
        event.stopPropagation();
        returnBackToOriginal();
      }
    }

    function returnBackToOriginal() {
      if (originalCameraState.current) {
        gsap.to(camera.position, {
          x: originalCameraState.current.position.x,
          y: originalCameraState.current.position.y,
          z: originalCameraState.current.position.z,
          duration: 1.5,
          ease: "power2.inOut",
        });

        gsap.to(camera.rotation, {
          x: originalCameraState.current.rotation.x,
          y: originalCameraState.current.rotation.y,
          z: originalCameraState.current.rotation.z,
          duration: 1.5,
          ease: "power2.inOut",
        });

        if (localSceneRef.current) {
          gsap.to(localSceneRef.current.rotation, {
            y: 0,
            duration: 1.5,
            ease: "power2.inOut",
          });
        }

        setTimeout(() => {
          setIsExperienceZoomed(false);
          setFloating(true);
        }, 1500);
      }
    }

    return (
      <group
        ref={localSceneRef}
        position={[-3.4 + (mobile ? 1.1 : 0), 5.3, 4.3 + (mobile ? 0.9 : 0)]}
        onDoubleClick={handleDoubleClick}
      >
        <primitive
          object={stump.scene}
          scale={4.5}
          rotation-y={-0.26}
          castShadow
          receiveShadow
        />

        <group ref={laptopRef} onClick={handleLaptopClick}>
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
              pointerEvents: isExperienceZoomed ? "auto" : "none",
            }}
          >
            <div className="laptop-about-page">
              <About />
            </div>
          </Html>
        </group>

        <Tooltip
          text="Coffee, masala chai, or beer - my liquid fuel for epic coding marathons!"
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
          <primitive
            object={controller.scene}
            scale={0.4}
            rotation={[-0.1, -0.72, 0.44]}
          />
        </Tooltip>
      </group>
    );
  }
);

export default Laptop;
