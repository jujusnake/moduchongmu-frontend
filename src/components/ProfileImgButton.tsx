import { cn } from '@/lib/utils';
import { HTMLAttributes, useMemo, useRef, useState } from 'react';
import { CircleStencil, Cropper, CropperRef } from 'react-mobile-cropper';
import { Button } from './ui/buttons';
import { Camera, X } from 'lucide-react';
import 'react-mobile-cropper/dist/style.css';

interface ProfileImgButtonProps extends HTMLAttributes<HTMLDivElement> {
  selectedImg?: string | File | null;
  onChangeImg?: (img: File | null) => void;
  disabled?: boolean;
}

const ProfileImgButton = ({ className, selectedImg, onChangeImg, disabled, ...props }: ProfileImgButtonProps) => {
  // Refs
  const imgInputRef = useRef<HTMLInputElement>(null);
  const imgCropperRef = useRef<CropperRef>(null);

  // States
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [tempProfileImg, setTempProfileImg] = useState<File | null>(null);
  const profileImgUrl = useMemo(() => {
    if (typeof selectedImg === 'string') return selectedImg;
    if (!selectedImg) return null;
    return URL.createObjectURL(selectedImg);
  }, [selectedImg]);

  // Handlers
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setTempProfileImg(file);
    } catch (e) {
      console.error(e);
    } finally {
      if (imgInputRef.current) {
        imgInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = () => {
    setTempProfileImg(null);
    onChangeImg?.(null);
    if (imgInputRef.current) {
      imgInputRef.current.value = '';
    }
  };

  const handleCrop = () => {
    setIsCropping(true);
    if (!imgCropperRef.current) {
      setIsCropping(false);
      return;
    }

    const canvas = imgCropperRef.current.getCanvas();
    if (!canvas) {
      setIsCropping(false);
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        setIsCropping(false);
        return;
      }

      const file = new File([blob], tempProfileImg?.name ?? 'profile-image.png', {
        type: tempProfileImg?.type ?? 'image/png',
        lastModified: Date.now(),
      });

      onChangeImg?.(file);
      setTempProfileImg(null);
      setIsCropping(false);
    });
  };

  return (
    <>
      <div className={cn('flex items-center gap-2', className)} {...props}>
        <label
          htmlFor="upload-profile-picture"
          className="relative rounded-full w-[100px] h-[100px] border border-white bg-brand-primary-bg shadow-md flex items-center justify-center overflow-hidden isolate"
          aria-disabled={disabled}
        >
          <input
            id="upload-profile-picture"
            ref={imgInputRef}
            type="file"
            className="w-full h-full rounded-full opacity-0 cursor-pointer"
            onChange={handlePhotoChange}
            accept="image/*"
            multiple={false}
            disabled={disabled}
          />

          {/* z-index : 0 */}
          <Camera size={36} className="absolute pointer-events-none text-text-secondary absolute-center" />

          {/* z-index : 10 */}
          <img
            src={profileImgUrl ?? undefined}
            className="absolute absolute-center z-10 w-full h-full data-[empty='true']:invisible pointer-events-none object-cover object-center bg-white"
            data-empty={profileImgUrl === null}
          />
        </label>

        {/* Remove Button */}
        {disabled !== true && (
          <div className="pb-2.5 data-[empty='true']:invisible text-white" data-empty={selectedImg === null}>
            <button className="-translate-y-1/2" onClick={handleRemovePhoto}>
              <X />
            </button>
          </div>
        )}
      </div>

      {/* Cropper Modal */}
      {disabled !== true && (
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 h-[100dvh] w-full max-w-moduchongmu z-[100] data-[open='true']:visible invisible"
          data-open={tempProfileImg !== null}
        >
          <Cropper
            ref={imgCropperRef}
            className="w-full h-full"
            src={tempProfileImg ? URL.createObjectURL(tempProfileImg) : undefined}
            stencilComponent={CircleStencil}
          />
          <div className="absolute flex items-center gap-4 top-6 right-6">
            {isCropping ? (
              <Button disabled>자르는 중...</Button>
            ) : (
              <>
                <Button
                  size="large"
                  variant="secondary"
                  onClick={() => {
                    setTempProfileImg(null);
                    if (imgInputRef.current) {
                      imgInputRef.current.value = '';
                    }
                  }}
                >
                  취소
                </Button>
                <Button size="large" onClick={handleCrop}>
                  확인
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileImgButton;
