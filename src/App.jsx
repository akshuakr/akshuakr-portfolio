import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import DotCursor from "./components/DotCursor";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GlobalApiTrigger from "./components/GlobalApiTrigger";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
