import { Button } from '@/components/ui/buttons';
import { Checkbox, CheckboxLabel, CheckboxLabelDesc } from '@/components/ui/checkbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input, InputLabel } from '@/components/ui/input';
import { Camera, PartyPopper, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { CircleStencil, Cropper } from 'react-mobile-cropper';

import 'react-mobile-cropper/dist/style.css';

const Signup = () => {
  // Refs
  const photoInputRef = useRef<HTMLInputElement>(null);

  // State
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const photoUrl = useMemo(() => {
    if (!photoFile) return null;
    return URL.createObjectURL(photoFile);
  }, [photoFile]);

  // Handlers
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setPhotoFile(file);
    } catch (e) {
      console.error(e);
    } finally {
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

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
        <div className="absolute top-0 -translate-y-1/2 left-6 flex items-center gap-2 z-20">
          <label
            htmlFor="upload-profile-picture"
            className="relative rounded-full w-[100px] h-[100px] border border-white bg-brand-primary-bg shadow-md flex items-center justify-center overflow-hidden isolate"
          >
            <input
              id="upload-profile-picture"
              ref={photoInputRef}
              type="file"
              className="w-full h-full rounded-full opacity-0 cursor-pointer"
              onChange={handlePhotoChange}
              accept="image/*"
              multiple={false}
            />

            {/* z-index : 0 */}
            <Camera size={36} className="text-text-secondary absolute absolute-center pointer-events-none" />

            {/* z-index : 10 */}
            <img
              src={photoUrl ?? undefined}
              className="absolute absolute-center z-10 w-full h-full data-[empty='true']:invisible pointer-events-none object-cover object-center bg-white"
              data-empty={photoFile === null}
            />
          </label>

          {/* Remove Button */}
          <div className="pb-2.5 data-[empty='true']:invisible text-white" data-empty={photoFile === null}>
            <button className="-translate-y-1/2" onClick={handleRemovePhoto}>
              <X />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="pt-[74px] px-6 pb-6 flex-grow flex flex-col justify-between gap-10">
          <div>
            <div className="mb-6">
              <InputLabel htmlFor="signup-form-email">이메일</InputLabel>
              <Input placeholder="이메일을 입력해주세요" id="signup-form-email" disabled={false} icon="mail" />
            </div>
            <div>
              <InputLabel htmlFor="signup-form-nickname">닉네임</InputLabel>
              <Input placeholder="닉네임을 입력해주세요" id="signup-form-nickname" icon="at-sign" />
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center w-full justify-between mb-6">
              <CheckboxLabel className="flex flex-col gap-1 cursor-pointer select-none" htmlFor="signup-form-marketing">
                광고성 정보 수신동의 (선택)
                <CheckboxLabelDesc>저희 서비스와 여행에 대한 소식을 보내드릴게요!</CheckboxLabelDesc>
              </CheckboxLabel>
              <Checkbox id="signup-form-marketing" />
            </div>
            <Button size="large" className="w-full">
              회원가입 완료
            </Button>
          </div>
        </form>
      </main>

      {/* Cropper Modal */}
      {/* <Dialog open={photoUrl !== null}> */}
      {/* <DialogContent className="max-w-[400px] max-h-[60vh] bg-white"> */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[100dvh] w-full max-w-[500px] z-[100]">
        <Cropper className="w-full h-full" src={photoUrl} stencilComponent={CircleStencil} onChange />
      </div>
      {/* </DialogContent> */}
      {/* </Dialog> */}
    </>
  );
};

export default Signup;
