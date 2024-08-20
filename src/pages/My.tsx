import ProfileImgButton from '@/components/ProfileImgButton';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import { Checkbox, CheckboxLabel, CheckboxLabelDesc } from '@/components/ui/checkbox';
import { Input, InputLabel } from '@/components/ui/input';
import { useState } from 'react';

const My = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [marketingAgreement, setMarketingAgreement] = useState(false);
  const [profileImg, setProfileImg] = useState<File | null>(null);

  return (
    <>
      <header className="flex items-center gap-2 bg-brand-primary-dark px-6 pt-10 pb-20 justify-between">
        <h1 className="text-brand-primary-contrastText text-2xl font-semibold">My Page</h1>
        <Button shape="round" className="p-2" variant="secondary">
          <ButtonIcon name="pencil" size={18} />
        </Button>
      </header>
      <main className="relative px-6 pt-[60px]">
        <ProfileImgButton
          selectedImg={profileImg}
          onChangeImg={setProfileImg}
          disabled
          className="absolute top-0 -translate-y-1/2 left-6 z-20"
        />

        <div className="mb-8">
          <div className="mb-6">
            <InputLabel htmlFor="signup-form-email">이메일</InputLabel>
            <Input
              placeholder="이메일을 입력해주세요"
              id="signup-form-email"
              disabled={false}
              icon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <InputLabel htmlFor="signup-form-nickname">닉네임</InputLabel>
            <Input
              placeholder="닉네임을 입력해주세요"
              id="signup-form-nickname"
              icon="at-sign"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={21}
            />
          </div>
        </div>
        <div className="flex gap-3 items-center w-full justify-between">
          <CheckboxLabel className="flex flex-col gap-1 cursor-pointer select-none" htmlFor="signup-form-marketing">
            광고성 정보 수신동의 (선택)
            <CheckboxLabelDesc>저희 서비스와 여행에 대한 소식을 보내드릴게요!</CheckboxLabelDesc>
          </CheckboxLabel>
          <Checkbox
            id="signup-form-marketing"
            checked={marketingAgreement}
            onChange={(e) => setMarketingAgreement(e.target.checked)}
          />
        </div>
      </main>
    </>
  );
};

export default My;
