import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { PageNotFound } from "../pages/PageNotFound";
import { SignUpPage } from "../pages/SignUpPage";

export const paths = [
  {
    path: "/",
    element: LandingPage,
    id: 1,
  },
  {
    path: "/login",
    element: LoginPage,
    id: 2,
  },
  {
    path: "/signup",
    element: SignUpPage,
    id: 3,
  },
  {
    path: "/*",
    element: PageNotFound,
    id: 99,
  },
];

export const protectedPaths = [];
