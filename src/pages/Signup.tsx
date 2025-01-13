import { queryClient } from '@/APIs/react-query';
import { useUser } from '@/APIs/user/get';
import { usePutUser } from '@/APIs/user/put';
import ProfileImgButton from '@/components/ProfileImgButton';
import { Button } from '@/components/ui/buttons';
import { Checkbox, CheckboxLabel, CheckboxLabelDesc } from '@/components/ui/checkbox';
import { Input, InputLabel } from '@/components/ui/input';
import { uploadImageToS3 } from '@/lib/image';
import { PartyPopper } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Signup = () => {
  // Hooks
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  // API Calls
  const { data: userData } = useUser();
  const { mutate: putUser } = usePutUser();

  // State
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [marketingAgreement, setMarketingAgreement] = useState<boolean>(false);
  const goodToGo = userData && nickname.length > 0 && userData.data.user.userEmail.length > 0;

  // Handlers
  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    putUser(
      {
        userName: nickname,
        marketingAgreed: marketingAgreement,
        statusMessage: '',
        profileImage: profileImg !== null,
      },
      {
        onSuccess: async (data) => {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          if (data.data.profileImageUrl) {
            await uploadImageToS3(data.data.profileImageUrl, profileImg);
          }
          const invitationUid = searchParam.get('invitation');
          navigate(invitationUid ? `/invitation/${invitationUid}` : '/');
        },
      },
    );
  };

  return (
    <>
      <section className="px-6 pt-10 pb-20 space-y-2 bg-brand-primary-dark text-brand-primary-contrastText">
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
          className="absolute top-0 z-20 -translate-y-1/2 left-6"
        />
        <div className="absolute top-0 z-30 -translate-y-1/2 left-[132px]">
          <div></div>
          <div className="px-3 py-2 text-base rounded shadow bg-bg-back">asdf</div>
        </div>

        {/* Form */}
        <form className="pt-[74px] px-6 pb-6 flex-grow flex flex-col justify-between gap-10" onSubmit={handleSignup}>
          <div>
            <div className="mb-6">
              <InputLabel htmlFor="signup-form-email">이메일</InputLabel>
              <Input
                placeholder="이메일을 입력해주세요"
                id="signup-form-email"
                disabled={true}
                icon="mail"
                value={userData?.data.user.userEmail ?? ''}
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
            <div className="flex items-center justify-between w-full gap-3 mb-6">
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
            <Button type="submit" size="large" className="w-full" disabled={goodToGo === false}>
              회원가입 완료
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Signup;
