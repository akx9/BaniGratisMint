import React from 'react';
import {
  AuthRedirectWrapper,
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from 'components';
import { routeNames } from 'routes';

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  return (
    <div className='mainContent'>
      <div className='.buttonsWrapper'>
            <h4 className='title'>Login</h4>
            <p className='subtitle'>pick a login method</p>
            <div className='buttons'>
            <ExtensionLoginButton
              loginButtonText='MultiversX DeFi Wallet' 
              {...commonProps}
            />

            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta' 
              {...commonProps}
            />

            <WebWalletLoginButton
              loginButtonText='MultiversX Web Wallet'
              data-testid='webWalletLoginBtn'
              {...commonProps}
            />
            <LedgerLoginButton
              loginButtonText='Ledger'
              {...commonProps}
            />
            <WalletConnectLoginButton
              loginButtonText='xPortal App'
              {...commonProps}
            />
          </div>
        </div>
        </div>
  );
};

export const Unlock = () => (
  <AuthRedirectWrapper>
    <UnlockPage />
  </AuthRedirectWrapper>
);
