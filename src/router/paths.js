import { LandingPage } from "../pages/LandingPage";
import { PageNotFound } from "../pages/PageNotFound";

export const paths = [
    {
        path: "/",
        element: LandingPage,
        id: 1,
    },
    {
        path: "/*",
        element: PageNotFound,
        id: 99
    }
]

export const protectedPaths = []