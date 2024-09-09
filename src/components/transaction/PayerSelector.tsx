import { TransactionAvatarButton, TransactionLabel } from '../ui/transaction';

type PayerSelectorProps = {
  userList?: string[];
  payer?: string;
  onPayerChange?: (payer: string) => void;
};

const PayerSelector = ({}: PayerSelectorProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <TransactionLabel className="w-full">결제한 사람</TransactionLabel>
      <div className="flex flex-wrap gap-1">
        <TransactionAvatarButton label="남주" selected />
        <TransactionAvatarButton label="효근" />
      </div>
    </div>
  );
};

export default PayerSelector;
