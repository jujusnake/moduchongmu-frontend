import { TransactionAvatarButton, TransactionLabel } from '../ui/transaction';

type UserSelectorProps = { users?: string[]; onUserChange?: (user: string) => void };

const UserSelector = ({ users, onUserChange }: UserSelectorProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <TransactionLabel className="w-full">누가 함께 사용했나요?</TransactionLabel>
      <div className="flex flex-wrap gap-1">
        <TransactionAvatarButton label="남주" selected />
        <TransactionAvatarButton label="효근" />
      </div>
    </div>
  );
};

export default UserSelector;
