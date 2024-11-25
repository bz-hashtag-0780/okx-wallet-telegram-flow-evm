/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import { useAuth } from '@/context/AuthContext';

// export default function Home() {
// 	const { connected, accounts, chainId, connectWallet, disconnectWallet } =
// 		useAuth();

// 	return (
// 		<div className="container">
// 			{connected ? (
// 				<div>
// 					<p>Connected Address: {accounts[0]}</p>
// 					<p>Chain ID: {chainId}</p>
// 					<button onClick={disconnectWallet}>
// 						Disconnect Wallet
// 					</button>
// 				</div>
// 			) : (
// 				<button onClick={connectWallet}>Connect OKX Wallet</button>
// 			)}
// 		</div>
// 	);
// }

'use client';

import { useState } from 'react';
import useOKXUI from '@/hooks/use-okx-ui';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
	const { connectWallet, disconnectWallet } = useOKXUI();
	const [walletAddress, setWalletAddress] = useState<any>(null);
	// const { connected, accounts } = useAuth();

	const handleConnect = async () => {
		try {
			const address = await connectWallet();
			setWalletAddress(address);
		} catch (error) {
			alert('Failed to connect wallet.');
		}
	};

	const handleDisconnect = async () => {
		try {
			await disconnectWallet();
			setWalletAddress(null);
		} catch (error) {
			alert('Failed to disconnect wallet.');
		}
	};

	return (
		<div style={{ textAlign: 'center', padding: '2rem' }}>
			<h1>Flow EVM Wallet Connection</h1>
			{walletAddress ? (
				<>
					<p>Connected Wallet: {walletAddress}</p>
					<button
						onClick={handleDisconnect}
						className="button button-disconnect"
					>
						Disconnect
					</button>
				</>
			) : (
				<button
					onClick={handleConnect}
					className="button button-connect"
				>
					Connect OKX Wallet
				</button>
			)}
		</div>
	);
}
