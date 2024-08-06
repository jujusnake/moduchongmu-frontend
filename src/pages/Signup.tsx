import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Camera, PartyPopper, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

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
      file.setPhotoFile(file);
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
      <main className="relative">
        <div className="absolute top-0 -translate-y-1/2 left-6 rounded-full w-[100px] h-[100px] border border-white bg-brand-primary-bg shadow-md flex items-center justify-center overflow-hidden isolate">
          <Camera size={36} className="text-text-secondary absolute absolute-center" />
          <input
            ref={photoInputRef}
            type="file"
            className="w-full h-full rounded-full opacity-0"
            onChange={handlePhotoChange}
            accept="image/*"
            multiple={false}
          />
          <img
            src={photoUrl ?? undefined}
            className="absolute absolute-center z-10 w-full h-full data-[empty='true']:invisible pointer-events-none object-cover object-center"
            data-empty={photoFile === null}
          />
        </div>
      </main>

      {/* Cropper Modal */}
      <Dialog>
        <DialogContent>asdf</DialogContent>
      </Dialog>
    </>
  );
};

export default Signup;
