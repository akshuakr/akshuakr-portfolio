import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ResumeViewer from "../pages/ResumePage/ResumePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "landing", element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "resume", element: <ResumeViewer /> },
      // { path: "*", element: <LandingPage /> },
      // { path: "", element: <LandingPage /> },
      // You can also add an index route if needed
    ],
  },
]);

export default router;
