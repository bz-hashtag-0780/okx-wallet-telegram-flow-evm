/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { OKXUniversalProvider } from '@okxconnect/universal-provider';

export const DEFAULT_CHAIN_PARAMS = {
	chainId: '747', // Flow EVM Mainnet Chain ID
	chainName: 'Flow',
	rpcUrls: ['https://mainnet.evm.nodes.onflow.org'],
	nativeCurrency: { name: 'Flow', symbol: 'FLOW', decimals: 18 },
	blockExplorerUrls: ['https://evm.flowscan.io/'],
};

export default function useOKXWallet() {
	const [provider, setProvider] = useState<any>(null);
	const [connected, setConnected] = useState(false);
	const [accounts, setAccounts] = useState<string[]>([]);
	const [chainId, setChainId] = useState<string | null>(null);

	useEffect(() => {
		const initProvider = async () => {
			const okxProvider = await OKXUniversalProvider.init({
				dappMetaData: {
					name: 'Flow DApp',
					icon: 'https://cryptologos.cc/logos/flow-flow-logo.png',
				},
			});
			setProvider(okxProvider);

			// Event listeners
			okxProvider.on('session_update', (session: any) => {
				setAccounts(session.namespaces.eip155.accounts || []);
				setChainId(session.namespaces.eip155.chains[0] || null);
			});

			okxProvider.on('session_delete', () => {
				setConnected(false);
				setAccounts([]);
				setChainId(null);
			});
		};

		initProvider();
	}, []);

	const connectWallet = async () => {
		try {
			const session = await provider.connect({
				namespaces: {
					eip155: {
						chains: [`eip155:${DEFAULT_CHAIN_PARAMS.chainId}`],
						defaultChain: DEFAULT_CHAIN_PARAMS.chainId,
					},
				},
				sessionConfig: {
					redirect: 'tg://resolve', // Telegram Mini App redirect
				},
			});
			setAccounts(session.accounts || []);
			setChainId(session.chains[0] || null);
			setConnected(true);
		} catch (error) {
			console.error('Wallet connection failed:', error);
		}
	};

	const disconnectWallet = async () => {
		await provider.disconnect();
		setConnected(false);
		setAccounts([]);
		setChainId(null);
	};

	return [connected, accounts, chainId, connectWallet, disconnectWallet];
}
