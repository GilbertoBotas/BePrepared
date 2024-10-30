import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useAuth } from "./contexts/auth";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={!loggedIn ? <Login /> : <Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={loggedIn ? <Home /> : <Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Home />,
  },
]);
