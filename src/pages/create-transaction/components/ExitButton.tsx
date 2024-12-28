import { Button, ButtonIcon } from '@/components/ui/buttons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { memo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ExitButton = () => {
  // Hooks
  const navigate = useNavigate();
  const { state } = useLocation();
  const { tripUid } = useParams();

  // Handler
  const handleExit = () => {
    if (state?.from) navigate(state.from);
    else if (tripUid) navigate(`/trip/${tripUid}`);
    else navigate('/trips');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="contrast" className="p-2" size="large">
          <ButtonIcon name="x" size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-bg-back max-w-moduchongmu">
        <DialogHeader>
          <DialogTitle>기록 작성을 중단하시나요?</DialogTitle>
          <DialogDescription>작성 중인 내용은 저장되지 않습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleExit}>
            나가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ExitButton);
