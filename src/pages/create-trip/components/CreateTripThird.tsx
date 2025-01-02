import Vacation from '../../../components/icons/Vacation';
import { Input } from '../../../components/ui/input';

type Props = {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  location?: string[];
};

const CreateTripThird = ({ nickname, onNicknameChange, location }: Props) => {
  return (
    <main className="px-6">
      <h1 className="mb-3 text-lg font-semibold text-text-primary">여행에 별명을 만들어주시겠어요?</h1>
      <Input
        customIcon={<Vacation />}
        value={nickname}
        onChange={(e) => onNicknameChange(e.target.value)}
        placeholder={`우리의 ${location?.join(', ')} 여행`}
      />
    </main>
  );
};

export default CreateTripThird;
