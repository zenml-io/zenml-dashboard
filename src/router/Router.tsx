import { lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { GradientLayout } from "../layouts/GradientLayout";
import { RootLayout } from "../layouts/RootLayout";
const Home = lazy(() => import("@/app/page"));
const Login = lazy(() => import("@/app/login/page"));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<RootLayout />}>
			<Route path="/" element={<Home />} />
			{/* Gradient Layout */}
			<Route element={<GradientLayout />}>
				<Route path="/login" element={<Login />} />
			</Route>
		</Route>
	)
);
