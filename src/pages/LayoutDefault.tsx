import { Outlet } from "react-router-dom";
import DivBgColor from "../features/shared/DivBgColor";

export default function LayoutDefault() {
  return (
    <>
      <DivBgColor />
      <main className="h-full">
        <Outlet />
      </main>
    </>
  );
}
