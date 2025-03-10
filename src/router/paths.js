import { CategoryPage } from "../pages/CategoryPage";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { PageNotFound } from "../pages/PageNotFound";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { SignUpPage } from "../pages/SignUpPage";

export const paths = [
  {
    path: "/",
    element: LandingPage,
    id: 1,
  },
  {
    path: "/category/:categorySlug",
    element: CategoryPage,
    id: 2,
  },
  {
    path: "/product/:productSlug",
    element: ProductDetailsPage,
    id: 3,
  },
  {
    path: "/login",
    element: LoginPage,
    id: 4,
  },
  {
    path: "/signup",
    element: SignUpPage,
    id: 5,
  },
  {
    path: "/*",
    element: PageNotFound,
    id: 99,
  },
];

export const protectedPaths = [];
