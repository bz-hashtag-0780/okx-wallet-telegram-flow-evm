'use client';

import { useEffect, useState } from 'react';
import { OKXUniversalConnectUI, THEME } from '@okxconnect/ui';

export default function useOKXUI() {
	const [client, setClient] = useState<OKXUniversalConnectUI | null>(null);

	useEffect(() => {
		const initClient = async () => {
			try {
				const uiClient = await OKXUniversalConnectUI.init({
					dappMetaData: {
						name: 'Flow DApp',
						icon: 'https://cryptologos.cc/logos/flow-flow-logo.png',
					},
					actionsConfiguration: {
						returnStrategy: 'none', // Or 'tg://resolve' for Telegram deep link
						modals: 'all', // Show all modals
					},
					uiPreferences: {
						theme: THEME.LIGHT,
					},
				});
				setClient(uiClient);
			} catch (error) {
				console.error('Failed to initialize OKX UI:', error);
			}
		};

		initClient();
	}, []);

	const connectWallet = async () => {
		if (!client) throw new Error('Client not initialized');
		try {
			const session = await client.openModal({
				namespaces: {
					eip155: {
						chains: ['eip155:747'],
						defaultChain: '747',
					},
				},
			});

			const address =
				session?.namespaces?.eip155?.accounts[0]?.split(':')[2];
			return address;
		} catch (error) {
			console.error('Failed to connect wallet:', error);
			throw error;
		}
	};

	const disconnectWallet = async () => {
		if (!client) throw new Error('Client not initialized');
		try {
			await client.disconnect();
			console.log('Wallet disconnected.');
		} catch (error) {
			console.error('Failed to disconnect wallet:', error);
		}
	};

	return { connectWallet, disconnectWallet };
}
