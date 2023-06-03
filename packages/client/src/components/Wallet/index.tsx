import { ConnectButton } from '@rainbow-me/rainbowkit';

const Wallet = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ConnectButton />
    </div>
  );
};

export default Wallet;
