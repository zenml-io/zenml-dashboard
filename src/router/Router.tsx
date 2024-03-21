import { lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="login" element={<Login />} />
		</>
	)
);
