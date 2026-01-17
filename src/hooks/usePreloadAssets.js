import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

const models = [
  "/models/island.glb",
  "/models/clouds.glb",
  "/models/football.glb",
  "/models/camp.glb",
  "/models/scooter.glb",
  "/models/tree.glb",
  "/models/stump.glb",
  "/models/laptop.glb",
  "/models/coffee.glb",
  "/models/controller.glb",
  "/models/goku.glb",
  "/models/bonfire.glb",
  "/models/mushrooms.glb",
  "/models/cell.glb",
  "/models/paperplane.glb",
];

export const usePreloadAssets = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = models.length;

    const loadAsset = async (path) => {
      try {
        await new Promise((resolve) => {
          useGLTF.preload(path);
          setTimeout(() => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalAssets) * 100));
            resolve();
          }, 100);
        });
      } catch (error) {
        console.error(`Failed to load ${path}:`, error);
        loadedCount++;
        setProgress(Math.round((loadedCount / totalAssets) * 100));
      }
    };

    const preloadAll = async () => {
      await Promise.all(models.map(loadAsset));
      setTimeout(() => {
        setLoaded(true);
      }, 500);
    };

    preloadAll();
  }, []);

  return { progress, loaded };
};
