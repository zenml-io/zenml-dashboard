import { lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
const Home = lazy(() => import("@/app/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
);
