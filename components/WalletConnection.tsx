'use client';

import { useAuth } from '@/context/AuthContext';

export default function WalletConnection() {
	const { connected, walletAddress, chainId, logIn, logOut } = useAuth();

	return (
		<div className="page-container">
			<div className="card">
				<h1 className="card-title">Flow EVM Wallet Connection</h1>
				<p className="card-subtitle">
					Connect your wallet to interact with Flow EVM
				</p>

				{connected ? (
					<div className="space-y-4">
						<p className="connected-text">
							Wallet Address:{' '}
							<span className="connected-username">
								{walletAddress.slice(0, 6)}...
								{walletAddress.slice(-6)}
							</span>
						</p>
						{chainId && (
							<p className="connected-text">
								Chain ID:{' '}
								<span className="connected-username">
									{chainId}
								</span>
							</p>
						)}
						<button
							onClick={logOut}
							className="button button-disconnect"
						>
							Disconnect Wallet
						</button>
					</div>
				) : (
					<button onClick={logIn} className="button button-connect">
						Connect OKX Wallet
					</button>
				)}
			</div>
		</div>
	);
}
