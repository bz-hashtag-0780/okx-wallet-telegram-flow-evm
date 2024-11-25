/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext } from 'react';
import useOKXWallet from '@/hooks/use-okx-wallet.hook';

interface AuthContextType {
	connected: any;
	accounts: any;
	chainId: any;
	connectWallet: any;
	disconnectWallet: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [connected, accounts, chainId, connectWallet, disconnectWallet] =
		useOKXWallet();

	return (
		<AuthContext.Provider
			value={{
				connected,
				accounts,
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
	if (!context)
		throw new Error('useAuth must be used within AuthContextProvider');
	return context;
};
