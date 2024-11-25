'use client';

import { useAuth } from '@/context/AuthContext';

export default function Home() {
	const { connected, accounts, chainId, connectWallet, disconnectWallet } =
		useAuth();

	return (
		<div className="container">
			{connected ? (
				<div>
					<p>Connected Address: {accounts[0]}</p>
					<p>Chain ID: {chainId}</p>
					<button onClick={disconnectWallet}>
						Disconnect Wallet
					</button>
				</div>
			) : (
				<button onClick={connectWallet}>Connect OKX Wallet</button>
			)}
		</div>
	);
}
