import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ReactNode, useMemo, useState } from 'react';
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
import { Button, ButtonIcon } from '@/components/ui/buttons';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { TransactionCategoryType, TravelUser } from '@/types/transaction';
import { parseDateStr } from '@/lib/datetime';
import { TransactionAvatarButton, TransactionCategoryButton, TransactionLabel } from '@/components/ui/transaction';
import { ko } from 'date-fns/locale';
import { getUserThumbnail } from '@/lib/urls';
import { formatAmountWithCurrency, getDecimalCountFromCurrency } from '@/lib/money';
import { useDeleteTransaction } from '@/APIs/transaction/delete';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { queryKeys } from '@/APIs/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type ResponsiveDrawerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uid?: string;
  travelUid?: string;
  title?: string;
  amount?: number;
  currency?: string;
  category?: string;
  payer?: TravelUser;
  mates?: TravelUser[];
  date?: string;
  expenseSplit?: Record<string, number> | null; // null일 시 1/n
  children?: ReactNode;
};

export function TransactionDetail({
  open,
  onOpenChange,
  uid,
  travelUid,
  title,
  amount,
  currency,
  category,
  payer,
  mates,
  date,
  expenseSplit,
  children,
}: ResponsiveDrawerDialogProps) {
  // Hooks
  const isDesktop = useMediaQuery('(min-width: 500px)');
  const navigate = useNavigate();

  // Values
  const decimalCount = useMemo(() => getDecimalCountFromCurrency(currency), [currency]);

  const evenlySplitAmount = useMemo(() => {
    if (amount === undefined || mates === undefined || mates?.length < 1) return '';

    const amountPerPerson = (amount / mates.length).toFixed(decimalCount);
    const numPerPerson = Number(amountPerPerson);

    return formatAmountWithCurrency(numPerPerson, currency ?? 'KRW');
  }, [amount, mates, currency]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="pt-10 max-w-moduchongmu bg-bg-back">
          <DialogHeader>
            <div className="flex items-start gap-3 flex-wrap justify-between px-4 py-5 border rounded-md shadow-lg bg-bg-back border-[#f2f2f2]">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              <div>
                <aside className="mb-1.5 text-sm font-medium text-text-secondary">
                  {date ? parseDateStr(date, 'yyyy. MM. dd (iiii)', { locale: ko }) : '-'}
                </aside>
                <DialogDescription className="text-2xl font-bold text-brand-primary-dark text-end">
                  {amount && formatAmountWithCurrency(amount, currency)}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="p-4 space-y-5">
            <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
              <div className="flex-[1] space-y-1">
                <TransactionLabel className="w-full">결제한 사람</TransactionLabel>
                <div className="flex flex-wrap gap-1">
                  <TransactionAvatarButton label={payer?.userName} imgSrc={getUserThumbnail(payer?.userEmail)} />
                </div>
              </div>

              <div className="space-y-1 flex-[1]">
                <TransactionLabel className="w-full">카테고리</TransactionLabel>
                <div>
                  <TransactionCategoryButton category={category as TransactionCategoryType} selected />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <TransactionLabel className="w-full">사용한 사람</TransactionLabel>
              <div className="flex flex-wrap gap-1">
                {mates?.map((mate) => (
                  <div key={`transaction-detail-${uid}-spender-${mate.idx}`} className="flex flex-col items-center">
                    <TransactionAvatarButton imgSrc={getUserThumbnail(mate.userEmail)} label={mate.userName} />
                    <aside className="w-[72px] text-sm font-semibold text-text-aside text-center break-words px-1">
                      {expenseSplit === null ? evenlySplitAmount : `expenseSplit[mate.idx] ?? 0}원`}
                    </aside>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-2">
              <DeleteTransactionDialog uid={uid} travelUid={travelUid} onDelete={() => onOpenChange(false)} />

              <DialogClose>
                <Button size="small" variant="primary">
                  닫기
                </Button>
              </DialogClose>
              {/* <Button size="small" variant="primary">
                수정
              </Button> */}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-bg-base max-h-[90dvh] ">
        <div className="overflow-auto">
          <DrawerHeader className="px-4 pt-6 pb-1">
            <div className="flex items-start gap-3 flex-wrap justify-between px-4 py-5 border rounded-md shadow-lg bg-bg-back border-[#f2f2f2]">
              <DrawerTitle className="text-base font-semibold">{title}</DrawerTitle>
              <div>
                <aside className="mb-1.5 text-xs font-medium text-text-secondary">
                  {date ? parseDateStr(date, 'yyyy. MM. dd (iiii)', { locale: ko }) : '-'}
                </aside>
                <DrawerDescription className="text-2xl font-bold text-brand-primary-dark text-end">
                  {amount && formatAmountWithCurrency(amount, currency)}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="p-4 space-y-5">
            <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
              <div className="flex-[1] space-y-1">
                <TransactionLabel className="w-full">결제한 사람</TransactionLabel>
                <div className="flex flex-wrap gap-1">
                  <TransactionAvatarButton label={payer?.userName} imgSrc={getUserThumbnail(payer?.userEmail)} />
                </div>
              </div>

              <div className="space-y-1 flex-[1]">
                <TransactionLabel className="w-full">카테고리</TransactionLabel>
                <div>
                  <TransactionCategoryButton category={category as TransactionCategoryType} selected />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <TransactionLabel className="w-full">사용한 사람</TransactionLabel>
              <div className="flex flex-wrap gap-1">
                {mates?.map((mate) => (
                  <div key={`transaction-detail-${uid}-spender-${mate.idx}`} className="flex flex-col items-center">
                    <TransactionAvatarButton imgSrc={getUserThumbnail(mate.userEmail)} label={mate.userName} />
                    <aside className="w-[72px] text-sm font-semibold text-text-aside text-center break-words px-1">
                      {expenseSplit === null ? evenlySplitAmount : `expenseSplit[mate.idx] ?? 0}원`}
                    </aside>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DrawerFooter>
            <div className="flex justify-end gap-2">
              <DeleteTransactionDialog uid={uid} travelUid={travelUid} onDelete={() => onOpenChange(false)} />

              <DrawerClose asChild>
                <Button
                  size="small"
                  variant="primary"
                  className="flex-[1]"
                  // onClick={() => navigate(`/trip/${travelUid}/transaction/${uid}/edit`)}
                >
                  {/* <ButtonIcon name="pen" /> */}
                  닫기
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const DeleteTransactionDialog = ({
  uid,
  travelUid,
  onDelete,
}: {
  uid?: string;
  travelUid?: string;
  onDelete?: () => void;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

  const handleDelete = () => {
    if (!uid) return;

    deleteTransaction(uid, {
      onSuccess: () => {
        // console.log('Deleted transaction : ', res?.data.uid);
        queryClient.refetchQueries({
          queryKey: [queryKeys.transaction, { type: 'list', uid: travelUid }],
        });
        toast.success('기록을 삭제했습니다', { duration: 1500 });
        setOpen(false);
        onDelete?.();
      },
      onError: (err) => {
        if (isAxiosError(err)) {
          toast.error(`기록 삭제에 실패했습니다. (${err.code})`, { duration: 1500 });
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="small" variant="outline" className="flex-[1]">
          <ButtonIcon name="trash-2" />
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-bg-back">
        <DialogHeader>
          <DialogTitle>기록 삭제</DialogTitle>
          <DialogDescription>이 기록를 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-1">
          <DialogClose asChild>
            <Button size="small" variant="ghost" disabled={isPending}>
              취소
            </Button>
          </DialogClose>
          <Button size="small" variant="destructive" disabled={isPending} onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
