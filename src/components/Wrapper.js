import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { SoftShadows } from "@react-three/drei";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Plane from "./Plane";
import Modal from "./Modal";
import Contact from "./Contact";
import { colors } from "../theme";
import { isMobile } from "../utils/mobileDetection";
import Controls from "./Controls";
import Intro from "./Intro";
import { useLoading } from "../contexts/LoadingContext";
import { usePreloadAssets } from "../hooks/usePreloadAssets";

const Wrapper = () => {
  const [isExperienceZoomed, setIsExperienceZoomed] = useState(false);
  const isZoomedRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const { progress, loaded } = usePreloadAssets();
  const [sceneReady, setSceneReady] = useState(false);

  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileControls, setMobileControls] = useState({ x: 0, y: 0 });
  const jumpRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(isMobile());
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (loaded && sceneReady) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loaded, sceneReady, setIsLoading]);

  return (
    <>
      <Canvas
        className="r3f"
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{
          near: 0.1,
          far: 1000,
          fov: isMobileView ? 90 : 75,
          position: isMobileView ? [0, 4, 9] : [0, 4, 7],
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onCreated={() => {
          setTimeout(() => setSceneReady(true), 500);
        }}
      >
        <Suspense
          fallback={
            <Plane>
              <Loader progress={progress} />
            </Plane>
          }
        >
          <hemisphereLight />
          <fog attach="fog" args={[colors.sky.fog, 10, 25]} />
          <LazyScene
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isZoomedRef={isZoomedRef}
            isExperienceZoomed={isExperienceZoomed}
            setIsExperienceZoomed={setIsExperienceZoomed}
            mobileControls={mobileControls}
            jumpRef={jumpRef}
            isLoading={isLoading}
          />
          <SoftShadows size={10} samples={12} focus={0.5} />

          <EffectComposer autoClear={false} multisampling={0}>
            <ToneMapping blendFunction={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(135deg, #0F0F23 0%, #1a0933 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "relative",
              width: isMobileView ? "160px" : "200px",
              height: isMobileView ? "160px" : "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="ball">
              <div className="inner"></div>
            </div>
            <div className="shadow"></div>
          </div>
          <div
            style={{
              color: "#F97316",
              fontSize: isMobileView ? "1rem" : "1.25rem",
              fontWeight: "600",
              marginTop: isMobileView ? "1.5rem" : "2rem",
            }}
          ></div>
        </div>
      )}

      {/* Mobile Controller - Outside Canvas */}
      <Controls
        onMove={setMobileControls}
        onJump={() => {
          if (jumpRef.current) {
            jumpRef.current();
          }
        }}
      />

      <Intro />

      {isExperienceZoomed && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-primary-900 bg-opacity-80 text-text-primary px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm">
            <p className="text-sm font-medium">
              {isMobileView
                ? "Double tap to zoom out"
                : "Press Escape to zoom out"}
            </p>
          </div>
        </div>
      )}
      {shouldRender && (
        <Modal
          setShouldRender={setShouldRender}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          transparent={true}
        >
          <Contact />
        </Modal>
      )}
      {/* <Guide /> */}
    </>
  );
};

export default Wrapper;

const LazyScene = lazy(() => import("./Scene"));
