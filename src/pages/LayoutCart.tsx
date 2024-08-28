import { Outlet } from "react-router-dom";
import DivBgColor from "../features/shared/DivBgColor";

export default function LayoutCart() {
  return (
    <>
      <DivBgColor />
      <main className={`h-full bg-neutral-magnolia`}>
        <Outlet />
      </main>
    </>
  );
}
