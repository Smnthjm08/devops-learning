import { Button } from '@workspace/ui/components/button';
import React from 'react';
import { ReactNode } from 'react';

export type AuthButtonProps = {
  buttonlabel?: string;
  address: string;
  onClick?: () => void;
  customButton?: (buttonlabel: string, onClick?: () => void) => ReactNode;
};

export function WalletLoginButton({
  buttonlabel = 'Connect',
  customButton,
  onClick,
  address,
}: AuthButtonProps) {
  const renderButton = () => {
    return customButton ? (
      customButton(buttonlabel, onClick)
    ) : (
      <Button
        onClick={onClick}
      >
        {buttonlabel}
      </Button>
    );
  };
  const renderAvatar = () => {
    return (
      <div className='avatarContainer'>
        <p className='address' title={address}>
          {address.slice(0, 5)}...
          {address.slice(address.length - 5, address.length)}
        </p>
      </div>
    );
  };
  return (
    <div>{!address || address === '' ? renderButton() : renderAvatar()}</div>
  );
}