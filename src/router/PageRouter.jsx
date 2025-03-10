import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { paths, protectedPaths } from "./paths";
import { ProtectedLayout } from "../layouts/ProtectedLayout";

export const PageRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {paths.map((item) => {
            return (
              <Route
                key={item.id}
                path={item.path}
                element={<item.element />}
              />
            );
          })}
        </Route>

        <Route element={<ProtectedLayout />}>
          {protectedPaths.map((item) => (
            <Route key={item.id} path={item.path} element={<item.element />} />
          ))}
        </Route>
      </Routes>
    </>
  );
};