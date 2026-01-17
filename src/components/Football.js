import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { addShadows } from "../utils/addShadows";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Howl } from "howler";

const Football = ({ mobileControls, onJumpRef }) => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const [ready, setReady] = useState(false);
  const footballSound = useMemo(
    () =>
      new Howl({
        src: ["/sounds/football.mp3"],
        volume: 0.75,
      }),
    []
  );
  const football = useGLTF("/models/football.glb", true);
  const footballRef = useRef();
  const radiusRef = useRef();

  useFrame((state, delta) => {
    if (!footballRef.current || !ready) return;

    const { forward, backward, leftward, rightward } = getKeys();
    const body = footballRef.current;

    // Check for keyboard input
    let hasKeyboardInput = forward || backward || leftward || rightward;
    
    // Check for mobile input
    let hasMobileInput = mobileControls && (mobileControls.x !== 0 || mobileControls.y !== 0);
    
    if (!hasKeyboardInput && !hasMobileInput) return;

    const impulseStrength = delta * 0.8;
    const impulse = { x: 0, y: 0, z: 0 };

    // Keyboard controls (desktop)
    if (hasKeyboardInput) {
      if (forward) {
        impulse.z -= impulseStrength * 0.5;
      }
      if (backward) {
        impulse.z += impulseStrength * 2;
      }
      if (leftward) {
        impulse.x -= impulseStrength * 1.5;
      }
      if (rightward) {
        impulse.x += impulseStrength * 1.5;
      }
    }

    // Mobile controls - match keyboard exactly
    if (hasMobileInput) {
      if (mobileControls.y > 0) { // up/forward
        impulse.z -= impulseStrength * 0.5;
      }
      if (mobileControls.y < 0) { // down/backward
        impulse.z += impulseStrength * 2;
      }
      if (mobileControls.x < 0) { // left
        impulse.x -= impulseStrength * 1.5;
      }
      if (mobileControls.x > 0) { // right
        impulse.x += impulseStrength * 1.5;
      }
    }

    if (impulse.x !== 0 || impulse.z !== 0) {
      body.applyImpulse(impulse);
    }
  });

  const jump = useCallback(() => {
    const origin = footballRef.current.translation();
    origin.y = origin.y - (radiusRef.current + 0.1);
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);
    if (hit && hit.timeOfImpact !== undefined) {
      const distanceToGround = hit.timeOfImpact;
      let impulseStrength;

      if (distanceToGround <= 0.5) {
        impulseStrength = 0.85;
      } else {
        impulseStrength = 0.2 * (1 - Math.min(distanceToGround / 2, 1));
      }

      footballRef.current.applyImpulse({ x: 0, y: impulseStrength, z: 0 });
    }
  }, [rapier, world]);

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setReady(true);
    }, 1000);
    addShadows(football);

    // Expose jump function to parent component
    if (onJumpRef) {
      onJumpRef.current = jump;
    }

    const spaceKey = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const box = new THREE.Box3().setFromObject(football.scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    radiusRef.current = Math.max(size.x, size.y, size.z) / 2;

    return () => {
      clearTimeout(readyTimer);
      spaceKey();
    };
  }, [football, onJumpRef, subscribeKeys, jump]);


 

  const lastSoundTime = useRef(0);
  
  function handleFootballCollision() {
    if (!ready) return;
    
    const now = Date.now();
    if (now - lastSoundTime.current < 200) return;
    
    lastSoundTime.current = now;
    const vel = footballRef.current.linvel();
    const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2 + vel.z ** 2);
    
    if (speed > 1) {
      const volume = Math.min(Math.max(speed / 8, 0.1), 0.6);
      footballSound.volume(volume);
      footballSound.stop();
      footballSound.play();
    }
  }

  return (
    <RigidBody
      friction={1}
      canSleep={false}
      colliders="ball"
      ref={footballRef}
      position={[0.75, 6.5, 2.5]}
      linearDamping={0.5}
      angularDamping={0.5}
      restitution={0.2}
      onCollisionEnter={handleFootballCollision}
    >
      <primitive scale={0.75} object={football.scene} />
    </RigidBody>
  );
};

export default memo(Football);
