import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="flex flex-col h-screen relative">
      <Outlet />
    </main>
  );
}
