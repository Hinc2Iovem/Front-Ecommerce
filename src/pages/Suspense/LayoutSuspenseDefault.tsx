import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import DivBgColor from "../../features/shared/DivBgColor";

export default function LayoutSuspenseDefault() {
  return (
    <Suspense
      fallback={
        <div className="bg-white h-[20rem] w-[20rem] flex flex-col gap-[1rem]">
          <h2>Loading...</h2>
        </div>
      }
    >
      <DivBgColor />
      <main className="h-full">
        <Outlet />
      </main>
    </Suspense>
  );
}
