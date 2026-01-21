import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SoftShadows } from '@react-three/drei';
import { EffectComposer, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import Contact from './Contact';
import { colors } from '../theme';
import Loader from './Loader';
import { isMobile } from '../utils/mobileDetection';
import Controls from './Controls';
import { useLoading } from '../contexts/LoadingContext';
import { usePreloadAssets } from '../hooks/usePreloadAssets';

const Wrapper = () => {
  const [isExperienceZoomed, setIsExperienceZoomed] = useState(false);
  const isZoomedRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const { progress, loaded } = usePreloadAssets();
  const [sceneRendered, setSceneRendered] = useState(false);

  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileControls, setMobileControls] = useState({ x: 0, y: 0 });
  const jumpRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(isMobile());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (loaded && sceneRendered) {
      // small delay to ensure final painting, loader component will fade out
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [loaded, sceneRendered, setIsLoading]);

  return (
    <>
      <Canvas
        className='r3f'
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{
          near: 0.1,
          far: 10000,
          fov: isMobileView ? 90 : 75,
          position: isMobileView ? [0, 4, 9] : [0, 4, 7],
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onCreated={() => {
          // setTimeout(() => setSceneReady(true), 500);
        }}
      >
        <Suspense fallback={null}>
          <hemisphereLight />
          <fog attach='fog' args={[colors.sky.fog, 10, 25]} />
          <LazyScene
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isZoomedRef={isZoomedRef}
            isExperienceZoomed={isExperienceZoomed}
            setIsExperienceZoomed={setIsExperienceZoomed}
            mobileControls={mobileControls}
            jumpRef={jumpRef}
            isLoading={isLoading}
            onSceneRendered={() => setSceneRendered(true)}
          />
          <SoftShadows size={10} samples={12} focus={0.5} />

          <EffectComposer autoClear={false} multisampling={0}>
            <ToneMapping blendFunction={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <Loader progress={progress} isLoading={isLoading} isMobileView={isMobileView} />

      {/* Mobile Controller - Outside Canvas */}
      <Controls
        onMove={setMobileControls}
        onJump={() => {
          if (jumpRef.current) {
            jumpRef.current();
          }
        }}
      />

      {/* <Intro /> */}

      {isExperienceZoomed && (
        <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50'>
          <div className='bg-primary-900 bg-opacity-80 text-text-primary px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm'>
            <p className='text-sm font-medium'>
              {isMobileView ? 'Double tap to zoom out' : 'Press Escape to zoom out'}
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

const LazyScene = lazy(() => import('./Scene'));
