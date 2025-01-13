import { queryClient } from '@/APIs/react-query';
import { useDeleteUser } from '@/APIs/user/delete';
import { useUser } from '@/APIs/user/get';
import { usePutUser } from '@/APIs/user/put';
import ProfileImgButton from '@/components/ProfileImgButton';
import { Button } from '@/components/ui/buttons';
import { Checkbox, CheckboxLabel, CheckboxLabelDesc } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input, InputLabel } from '@/components/ui/input';
import { removeTokens } from '@/lib/auth';
import { uploadImageToS3 } from '@/lib/image';
import { getUserThumbnail } from '@/lib/urls';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type Props = { onUpdate?: () => void };

const MyEditMode = ({ onUpdate }: Props) => {
  // Hooks
  const navigate = useNavigate();

  // API Calls
  const { data: user } = useUser();
  const { mutate: updateUser, isPending: isUpdating } = usePutUser();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteUser();

  const [nickname, setNickname] = useState('');
  const [marketingAgreement, setMarketingAgreement] = useState(user?.data.user.marketingAgreed === 1);
  const [profileImg, setProfileImg] = useState<File | null | string>(
    getUserThumbnail(user?.data.user.userEmail) ?? null,
  );

  const handleUpdateAccount = () => {
    updateUser(
      { userName: nickname, marketingAgreed: marketingAgreement, profileImage: profileImg !== null },
      {
        onSuccess: async (res) => {
          console.log(res.data);

          if (res.data.profileImageUrl && profileImg) {
            await uploadImageToS3(res.data.profileImageUrl, profileImg);
          }

          toast(
            <span className="flex items-center gap-1 font-medium">
              <Check size={18} strokeWidth={3} className="text-functional-success-main" />
              <span className="text-functional-success-dark">회원정보가 수정되었습니다.</span>
            </span>,
            { duration: 3000 },
          );
          queryClient.invalidateQueries({ queryKey: ['user'] });
          onUpdate?.();
        },
        onError: () => {
          toast('회원정보 수정에 실패했습니다. 다시 시도해주세요.', { duration: 3000 });
        },
      },
    );
  };

  const handleDeleteAccount = () => {
    toast(
      <div>
        <h1 className="font-semibold">모두의 총무를 탈퇴합니다</h1>
        <p>언젠가 다시 만나요! 🥲</p>
      </div>,
      {
        duration: 3000,
      },
    );
    deleteAccount(undefined, {
      onSuccess: () => {
        removeTokens();
        navigate('/signin');
      },
      onError: () => {
        toast.error('회원탈퇴에 실패했습니다. 다시 시도해주세요.', { duration: 3000 });
      },
    });
  };

  return (
    <>
      <ProfileImgButton
        selectedImg={profileImg}
        onChangeImg={setProfileImg}
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
            id="signup-form-nickname"
            icon="at-sign"
            placeholder={user?.data.user.userName ?? ''}
            maxLength={21}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-3 mb-12">
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

      <Button className="w-full mb-1" onClick={handleUpdateAccount} disabled={isUpdating}>
        수정사항 저장
      </Button>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-1.5 py-2 text-sm font-medium text-text-tertiary">회원탈퇴</button>
          </DialogTrigger>
          <DialogContent className="bg-bg-back max-w-moduchongmu">
            <DialogHeader className="mb-2">
              <DialogTitle className="mb-2">회원 탈퇴하기</DialogTitle>
              <DialogDescription className="text-base text-pretty">
                탈퇴 시 지금까지의 모든 정보가 삭제되며,
                <br />
                <u className="font-semibold">복구가 불가능합니다</u>. 정말 탈퇴하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={isDeleting}>
                  취소
                </Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                탈퇴하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MyEditMode;
