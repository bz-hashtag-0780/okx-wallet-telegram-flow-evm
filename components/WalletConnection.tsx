'use client';

import { useAuth } from '@/context/AuthContext';

export default function WalletConnection() {
	const {
		connected,
		walletAddress,
		chainId,
		connectWallet,
		disconnectWallet,
	} = useAuth();

	return (
		<div style={{ textAlign: 'center', padding: '2rem' }}>
			<h1>Flow EVM Wallet Connection</h1>
			{connected ? (
				<>
					<p>Connected Wallet: {walletAddress}</p>
					<p>Chain ID: {chainId}</p>
					<button
						onClick={disconnectWallet}
						className="button button-disconnect"
					>
						Disconnect
					</button>
				</>
			) : (
				<button
					onClick={connectWallet}
					className="button button-connect"
				>
					Connect OKX Wallet
				</button>
			)}
		</div>
	);
}
