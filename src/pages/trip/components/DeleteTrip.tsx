import { queryKeys } from '@/APIs/react-query';
import { useDeleteTravel } from '@/APIs/travel/delete';
import { useUser } from '@/APIs/user/get';
import { Button } from '@/components/ui/buttons';
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
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type Props = { uid: string; host?: string; children?: ReactNode };

const DeleteTrip = ({ uid, host, children }: Props) => {
  // Hooks
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // API Calls
  const { data: user } = useUser();
  const { mutate: deleteTravel, isPending } = useDeleteTravel();

  // Values
  const isHost = useMemo(() => host === user?.data.user.userName, [host, user]);

  // Handlers
  const handleDeleteTravel = () => {
    deleteTravel(uid, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.travel, 'list'] });
        toast.success('여행이 삭제되었습니다', { duration: 2000 });
        navigate('/trips');
      },
      onError: (err) => {
        if (isAxiosError(err)) {
          toast.error(`여행을 삭제할 수 없습니다, (${err.code})`, { duration: 2000 });
        }
      },
    });
  };

  if (!isHost) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle>여행을 삭제할까요?</DialogTitle>
          <DialogDescription>
            한번 삭제된 여행은 <strong className="font-semibold underline">다시 복구할 수 없습니다</strong>.
            <br />
            신중하게 결정해주세요
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-1">
          <DialogClose asChild>
            <Button variant="ghost" disabled={isPending}>
              취소
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={isPending} onClick={handleDeleteTravel}>
            삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTrip;
