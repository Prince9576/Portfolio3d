import "./App.css";
import Wrapper from "./components/Wrapper";
import { KeyboardControls } from "@react-three/drei";
import { ThemeProvider } from "./theme";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <KeyboardControls
          map={[
            {
              name: "forward",
              keys: ["ArrowUp", "KeyW"],
            },
            {
              name: "backward",
              keys: ["ArrowDown", "KeyS"],
            },
            {
              name: "leftward",
              keys: ["ArrowLeft", "KeyA"],
            },
            {
              name: "rightward",
              keys: ["ArrowRight", "KeyD"],
            },
            {
              name: "jump",
              keys: ["Space"],
            },
            {
              name: "esc",
              keys: ["Escape"]
            }
          ]}
        >
          <Wrapper />
        </KeyboardControls>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
