import { Outlet } from "react-router-dom";
import GlobalApiTrigger from "../components/GlobalApiTrigger";
import DotCursor from "../components/DotCursor";

const RootLayout = () => {
  return (
    <>
      {/* <DotCursor /> */}
      <GlobalApiTrigger />
      <Outlet />
    </>
  );
};

export default RootLayout;
