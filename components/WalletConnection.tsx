'use client';

import { useAuth } from '@/context/AuthContext';

export default function WalletConnection() {
	const { connected, walletAddress, chainId, logIn, logOut } = useAuth();

	return (
		<div style={{ textAlign: 'center', padding: '2rem' }}>
			<h1>Flow EVM Wallet Connection</h1>
			{connected ? (
				<>
					<p>Connected Wallet: {walletAddress}</p>
					<p>Chain ID: {chainId}</p>
					<button
						onClick={logOut}
						className="button button-disconnect"
					>
						Disconnect
					</button>
				</>
			) : (
				<button onClick={logIn} className="button button-connect">
					Connect OKX Wallet
				</button>
			)}
		</div>
	);
}
