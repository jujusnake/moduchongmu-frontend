import BetterImg from '@/components/atoms/BetterImg';
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
import { UsersRound } from 'lucide-react';

type Props = { memberArray?: Member[] };

const MemberList = ({ memberArray }: Props) => {
  return (
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
              <div className="space-y-0.5 flex-shrink">
                <div className="text-base font-semibold truncate text-text-primary">{member.name}</div>
                <div className="text-base truncate text-text-tertiary">{member.email}</div>
              </div>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default MemberList;
