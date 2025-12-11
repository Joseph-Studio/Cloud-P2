"use client";
import { useUserAuth } from '../../_utils/auth-context';

export function DashboardHeader({ title }) {
	const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

	return (
		<header className="bg-blue-600 text-white px-6 py-4 text-2xl font-bold">
			{title}
			<div className="float-right text-lg flex gap-3">
				<p className="pt-1">{user.displayName}</p>
				<button
					onClick={firebaseSignOut}
					className="bg-red-600 hover:bg-red-800 text-white font-semibold py-1 px-3 rounded float-right"
					type="button"
				>
					Sign Out
				</button>
			</div>
		</header>
	);
}
