import { useUser } from '@/APIs/user/get';
import ProfileImgButton from '@/components/ProfileImgButton';
import { Button } from '@/components/ui/buttons';
import { Checkbox, CheckboxLabel, CheckboxLabelDesc } from '@/components/ui/checkbox';
import { Input, InputLabel } from '@/components/ui/input';
import { removeTokens } from '@/lib/auth';
import { getUserThumbnail } from '@/lib/urls';
import { useNavigate } from 'react-router-dom';

const MyShowMode = () => {
  const { data: user } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokens();
    navigate('/signin');
  };

  return (
    <>
      <ProfileImgButton
        selectedImg={getUserThumbnail(user?.data.user.userEmail)}
        disabled
        className="absolute top-0 z-20 -translate-y-1/2 left-6"
      />

      <div className="mb-8">
        <div className="mb-6">
          <InputLabel htmlFor="signup-form-email">이메일</InputLabel>
          <Input
            placeholder="이메일을 입력해주세요"
            id="signup-form-email"
            icon="mail"
            value={user?.data.user.userEmail ?? ''}
            disabled
            className="border-transparent disabled:text-text-tertiary"
          />
        </div>
        <div>
          <InputLabel htmlFor="signup-form-nickname">닉네임</InputLabel>
          <Input
            placeholder="닉네임을 입력해주세요"
            id="signup-form-nickname"
            icon="at-sign"
            value={user?.data.user.userName ?? ''}
            maxLength={21}
            disabled
            className="border-transparent disabled:text-text-tertiary"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-3 mb-12">
        <CheckboxLabel className="flex flex-col gap-1 cursor-pointer select-none" htmlFor="signup-form-marketing">
          광고성 정보 수신동의 (선택)
          <CheckboxLabelDesc>저희 서비스와 여행에 대한 소식을 보내드릴게요!</CheckboxLabelDesc>
        </CheckboxLabel>
        <Checkbox id="signup-form-marketing" checked={user?.data.user.marketingAgreed === 1} disabled />
      </div>

      <Button className="w-full" onClick={handleLogout}>
        로그아웃
      </Button>
    </>
  );
};

export default MyShowMode;
