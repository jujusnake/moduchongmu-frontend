import Vacation from '../icons/Vacation';
import { Input } from '../ui/input';

type Props = {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  location?: string;
};

const CreateTripThird = ({ nickname, onNicknameChange, location }: Props) => {
  return (
    <main className="px-6">
      <h1 className="text-lg font-semibold text-text-primary mb-3">여행에 별명을 만들어주시겠어요?</h1>
      <Input
        customIcon={<Vacation />}
        value={nickname}
        onChange={(e) => onNicknameChange(e.target.value)}
        placeholder={`우리의 ${location} 여행`}
      />
    </main>
  );
};

export default CreateTripThird;
