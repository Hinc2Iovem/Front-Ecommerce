import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import USER_ROLES from "./const/USER_ROLES";
import { AuthProvider } from "./context/AuthContext";
import PersistLogin from "./features/Auth/RequireAuth/PersistLogin";
import RequireAuth from "./features/Auth/RequireAuth/RequireAuth";
import Layout from "./pages/Layout";
import LayoutShopSuspense from "./pages/Suspense/LayoutShopSuspense";
import LayoutSingleItemPageSuspense from "./pages/Suspense/LayoutSingleItemPageSuspense";
import LayoutSuspenseDefault from "./pages/Suspense/LayoutSuspenseDefault";
import Unauthorized from "./pages/Unauthorized";

const Login = lazy(() => import("./features/Auth/Login/Login"));
const Register = lazy(() => import("./features/Auth/Register/Register"));
const Shop = lazy(() => import("./features/Shop/Shop/Shop"));
const SingleItemPage = lazy(
  () => import("./features/Shop/SingleItemPage/SingleItemPage")
);
const Cart = lazy(() => import("./features/Cart/Cart"));
const Favourite = lazy(() => import("./features/Favourite/Favourite"));
const Profile = lazy(() => import("./features/Profile/Profile"));
const AddProducts = lazy(() => import("./features/AddProducts/AddProducts"));
const Permission = lazy(() => import("./features/GivePermissions/Permission"));
const RecommendedProducts = lazy(
  () => import("./features/RecommendedProducts/RecommendedProducts")
);
const DefaultProducts = lazy(
  () => import("./features/DefaultProducts/DefaultProducts")
);
const Missing = lazy(() => import("./pages/Missing"));

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Unauthorized />} path="unauthorized" />
            <Route element={<LayoutSuspenseDefault />} path="auth">
              <Route element={<Login />} index />
              <Route element={<Register />} path="register" />
            </Route>

            <Route element={<PersistLogin />}>
              <Route element={<LayoutShopSuspense />} path="shop">
                <Route element={<Shop />} index />
              </Route>
              <Route element={<LayoutSingleItemPageSuspense />}>
                <Route element={<SingleItemPage />} path="shop/:productId" />
              </Route>

              <Route element={<LayoutSuspenseDefault />} path="cart">
                <Route element={<Cart />} index />
              </Route>

              <Route element={<LayoutSuspenseDefault />} path="favourite">
                <Route element={<Favourite />} index />
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      USER_ROLES.CUSTOMER,
                      USER_ROLES.SELLER,
                      USER_ROLES.ADMIN,
                    ]}
                  />
                }
              >
                <Route element={<LayoutSuspenseDefault />} path="profile">
                  <Route element={<Profile />} path=":userId" />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}
                  />
                }
              >
                <Route element={<LayoutSuspenseDefault />} path="add/products">
                  <Route element={<AddProducts />} index />
                </Route>
              </Route>

              <Route
                element={<RequireAuth allowedRoles={[USER_ROLES.ADMIN]} />}
              >
                <Route element={<LayoutSuspenseDefault />} path="permissions">
                  <Route element={<Permission />} index />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}
                  />
                }
              >
                <Route
                  element={<LayoutSuspenseDefault />}
                  path="recommendedProducts"
                >
                  <Route element={<RecommendedProducts />} index />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}
                  />
                }
              >
                <Route
                  element={<LayoutSuspenseDefault />}
                  path="defaultProducts"
                >
                  <Route element={<DefaultProducts />} index />
                </Route>
              </Route>
              <Route element={<Missing />} path="*" />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
