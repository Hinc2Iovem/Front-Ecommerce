import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SingleItemPreLoadPage from "../../features/Shop/SingleItemPage/SingleItemPreLoadPage";
import DivBgColor from "../../features/shared/DivBgColor";

export default function LayoutSingleItemPageSuspense() {
  return (
    <Suspense fallback={<SingleItemPreLoadPage />}>
      <DivBgColor />
      <main className="h-full">
        <Outlet />
      </main>
    </Suspense>
  );
}
