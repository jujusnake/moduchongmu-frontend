import { queryClient, queryKeys } from '@/APIs/react-query';
import { useDeleteTravelMember } from '@/APIs/travel/member/delete';
import { useUser } from '@/APIs/user/get';
import BetterImg from '@/components/atoms/BetterImg';
import { Button } from '@/components/ui/buttons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { getUserThumbnail } from '@/lib/urls';
import { Member } from '@/types/travel';
import { isAxiosError } from 'axios';
import { UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type Props = { memberArray?: Member[]; host?: string; travelUid: string };

const MemberList = ({ memberArray, host, travelUid }: Props) => {
  // States
  const [showKickoutDialog, setShowKickoutDialog] = useState<false | Member>(false);

  // API Calls
  const { data: user } = useUser();
  const { mutate: kickMemberOut } = useDeleteTravelMember();

  // Handlers
  const handleKickOut = () => {
    if (!showKickoutDialog) return;

    kickMemberOut(
      { memberName: showKickoutDialog.name, travelUid },
      {
        onSuccess: () => {
          toast.success(`멤버 '${showKickoutDialog.name}'를 강퇴했습니다.`);
          setShowKickoutDialog(false);
          queryClient.invalidateQueries({
            queryKey: [queryKeys.travel, travelUid],
          });
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            toast.error(`강퇴 요청을 실패했습니다. (${err.code})`);
          }
        },
      },
    );
  };

  // Values
  const isHost = useMemo(() => host === user?.data.user.userName, [host, user]);

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="rounded-full flex items-center gap-1 px-3 py-1.5 border border-border-light text-text-secondary font-semibold text-sm">
            <UsersRound size={14} />
            <span>{memberArray?.length ?? 0}명의 메이트</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="min-h-[50dvh] max-w-moduchongmu moduchongmu:left-[calc(50%-250px)]">
          <DrawerHeader>
            <DrawerTitle>여행 메이트</DrawerTitle>
            <DrawerDescription>여행에 함께하는 {memberArray?.length ?? 0}명의 메이트들</DrawerDescription>
          </DrawerHeader>
          <ul className="p-4 pt-0">
            {memberArray?.map((member) => (
              <li
                key={`member-list-item-${member.idx}`}
                className="flex items-center gap-3 py-2.5 px-1.5 odd:bg-brand-primary-bg"
              >
                <div className="flex-shrink-0 overflow-hidden rounded-full size-10 bg-brand-primary-lighter">
                  <BetterImg src={getUserThumbnail(member.email)} className="size-full" />
                </div>
                <div className="space-y-0.5 flex-shrink flex-grow">
                  <div className="text-base font-semibold truncate text-text-primary">{member.name}</div>
                  <div className="text-base truncate text-text-tertiary">{member.email}</div>
                </div>
                {isHost && member.email !== user?.data.user.userEmail && (
                  <div className="flex-shrink-0">
                    <Button size="xsmall" variant="destructive" onClick={() => setShowKickoutDialog(member)}>
                      강퇴
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>

      <Dialog open={!!showKickoutDialog} onOpenChange={(open) => !open && setShowKickoutDialog(false)}>
        <DialogContent className="bg-bg-back">
          <DialogHeader>
            <DialogTitle>멤버 강퇴</DialogTitle>
            <DialogDescription>이 멤버를 강제퇴장 시키시나요?</DialogDescription>
          </DialogHeader>
          {showKickoutDialog && (
            <div className="p-3 border rounded">
              <ul className="space-y-1 text-base">
                <li>
                  <span>- 이름 : </span>
                  <strong className="font-medium">{showKickoutDialog.name}</strong>
                </li>
                <li>
                  <span>- 이메일 : </span>
                  <strong className="font-medium">{showKickoutDialog.email}</strong>
                </li>
              </ul>
            </div>
          )}
          <DialogFooter className="gap-y-2">
            <DialogClose asChild>
              <Button variant="secondary">취소</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleKickOut}>
              강퇴하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberList;
