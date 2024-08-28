import { Outlet } from "react-router-dom";
import DivBgColor from "../../features/shared/DivBgColor";
import { Suspense } from "react";
import ShopPreLoadComponent from "../../features/Shop/Shop/ShopPreLoadComponent";

export default function LayoutShopSuspense() {
  return (
    <Suspense fallback={<ShopPreLoadComponent />}>
      <DivBgColor />
      <main className="h-full">
        <Outlet />
      </main>
    </Suspense>
  );
}
