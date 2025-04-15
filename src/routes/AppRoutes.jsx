import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import AboutPage from "../pages/AboutPage/AboutPage";

const router = createBrowserRouter([
  { path: "/landing", element: <LandingPage /> },
  { path: "/about", element: <AboutPage /> },
]);

export default router;
