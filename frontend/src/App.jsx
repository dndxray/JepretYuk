import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FrameSelection from "./pages/FrameSelection";
import Camera from "./pages/Camera";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/choose-frame"
          element={<FrameSelection />}
        />

        <Route
          path="/camera"
          element={<Camera />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;