import { Outlet } from "react-router-dom";
import { ResponsiveAppBar } from "../../../App";
export function Root() {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}
