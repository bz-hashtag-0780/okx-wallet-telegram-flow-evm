/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OKXUniversalConnectUI, THEME } from '@okxconnect/ui';

interface AuthContextType {
	connected: any;
	walletAddress: any;
	chainId: any;
	connectWallet: any;
	disconnectWallet: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [client, setClient] = useState<any>(null);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [chainId, setChainId] = useState<string | null>(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const initClient = async () => {
			try {
				const uiClient = await OKXUniversalConnectUI.init({
					dappMetaData: {
						name: 'Flow DApp',
						icon: 'https://cryptologos.cc/logos/flow-flow-logo.png',
					},
					actionsConfiguration: {
						returnStrategy: 'none', // Or 'tg://resolve'
						modals: 'all',
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
		if (!client) return;
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
				session.namespaces.eip155.accounts[0]?.split(':')[2];
			const chain = session.namespaces.eip155.chains[0];
			setWalletAddress(address);
			setChainId(chain);
			setConnected(true);
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	};

	const disconnectWallet = async () => {
		if (!client) return;
		try {
			await client.disconnect();
			setWalletAddress(null);
			setChainId(null);
			setConnected(false);
		} catch (error) {
			console.error('Failed to disconnect wallet:', error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				connected,
				walletAddress,
				chainId,
				connectWallet,
				disconnectWallet,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
