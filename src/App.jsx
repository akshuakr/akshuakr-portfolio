import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import DotCursor from "./components/DotCursor";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <>
      <DotCursor />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
