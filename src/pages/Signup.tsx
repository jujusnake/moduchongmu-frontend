import ProfileImgButton from '@/components/ProfileImgButton';
import { Button } from '@/components/ui/buttons';
import { Checkbox, CheckboxLabel, CheckboxLabelDesc } from '@/components/ui/checkbox';
import { Input, InputLabel } from '@/components/ui/input';
import { PartyPopper } from 'lucide-react';
import { useState } from 'react';

const Signup = () => {
  // State
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [marketingAgreement, setMarketingAgreement] = useState<boolean>(false);
  const goodToGo = nickname.length > 0 && email.length > 0;

  return (
    <>
      <section className="bg-brand-primary-dark text-brand-primary-contrastText space-y-2 px-6 pt-10 pb-20">
        <h1 className="flex items-center gap-1.5 text-2xl font-semibold">
          <PartyPopper size={24} />
          환영합니다!
        </h1>
        <p className="text-lg font-medium">프로필을 완성하시고 여행을 떠나볼까요?</p>
      </section>

      <main className="relative min-h-[calc(100dvh_-_173px)] flex flex-col">
        {/* Upload Profile Picture */}
        <ProfileImgButton
          selectedImg={profileImg}
          onChangeImg={setProfileImg}
          className="absolute top-0 -translate-y-1/2 left-6 z-20"
        />

        {/* Form */}
        <form className="pt-[74px] px-6 pb-6 flex-grow flex flex-col justify-between gap-10">
          <div>
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
          <div>
            <div className="flex gap-3 items-center w-full justify-between mb-6">
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
            <Button size="large" className="w-full" disabled={goodToGo === false}>
              회원가입 완료
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Signup;
