import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/login/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/signup/SignUpPage"));
const NotificationPage = lazy(() => import("./pages/notification/NotificationPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");

				const data = await res.json();

				if (data.error) return null;

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				console.log(error);
				return null;
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<div className='flex max-w-6xl mx-auto'>
			{authUser && <Sidebar />}

			<Suspense fallback={
				<div className='h-screen flex-[4_4_0] flex justify-center items-center'>
					<LoadingSpinner size='lg' />
				</div>
			}>
				<Routes>
					<Route
						path='/'
						element={authUser ? <HomePage /> : <Navigate to='/login' />}
					/>

					<Route
						path='/signup'
						element={!authUser ? <SignUpPage /> : <Navigate to='/' />}
					/>

					<Route
						path='/login'
						element={!authUser ? <LoginPage /> : <Navigate to='/' />}
					/>

					<Route
						path='/notifications'
						element={
							authUser ? (
								<NotificationPage />
							) : (
								<Navigate to='/login' />
							)
						}
					/>

					<Route
						path='/profile/:username'
						element={
							authUser ? (
								<ProfilePage />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
				</Routes>
			</Suspense>

			{authUser && <RightPanel />}

			<Toaster
				position='top-right'
				toastOptions={{
					duration: 3000,
				}}
			/>
		</div>
	);
}

export default App;