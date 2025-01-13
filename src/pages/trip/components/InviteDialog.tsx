import { useTravel } from '@/APIs/travel/get';
import { useUser } from '@/APIs/user/get';
import { Button, ButtonIcon } from '@/components/ui/buttons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { copyToClipboard } from '@/lib/utils';
import { useDeviceStore } from '@/stores/deviceStore';
import { UserPlus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const InviteDialog = ({ travelUid }: { travelUid?: string }) => {
  const { deviceType } = useDeviceStore();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);
  const [showWebShareBtn, setShowWebShareBtn] = useState(false);

  // API Calls
  const { data: user } = useUser();
  const { data: travelData } = useTravel(travelUid ?? '');

  // Values
  const shareData = useMemo(
    () => ({
      title: `[모두의총무] ${user?.data.user.userName ? user?.data.user.userName + '님으로부터 ' : ''}초대장이 도착했습니다.`,
      text: `${travelData?.data.travel.travelName}에 함께 떠나요! 🏝`,
      url: `참여 링크:\nhttps://moduchongmu.com/invitation/${travelUid ?? 'unknown'}`,
    }),
    [travelUid, user, travelData],
  );

  // Handlers
  const handleCopy = () => {
    timer.current && clearTimeout(timer.current);

    copyToClipboard(`https://moduchongmu.com/invitation/${travelUid ?? 'unknown'}`, {
      onSuccess: () => {
        setCopied(true);
        timer.current = setTimeout(() => setCopied(false), 5000);
      },
      onError: () => {
        setCopied(false);
        timer.current && clearTimeout(timer.current);
      },
    });
  };

  // const handleShare = async () => {
  //   try {
  //     await navigator.share(shareData);
  //   } catch (e) {
  //     console.error('Failed to share: ', e);
  //   }
  // };

  // const handleKakaoShare = () => {
  //   // @ts-ignore
  //   if (Kakao.isInitialized() === false) return;

  //   const URL = `https://moduchongmu.com/invitation/${travelUid ?? 'unknown'}`;

  //   // function shareMessage() {
  //   //   // 현재 링크 가져오기
  //   //   var currentURL = window.location.href;

  //   //   // 제품 타이틀을 가져오는 부분
  //   //   var productTitleElement = document.querySelector('p.prod_top');
  //   //   var productTitle = productTitleElement ? productTitleElement.innerText : '';

  //   //   // 제품 설명을 가져오는 부분
  //   //   var productSummaryElement = document.querySelector('pre');
  //   //   var productSummary = productSummaryElement ? productSummaryElement.innerText : '';

  //   //   // 제품 이미지를 가져오는 부분
  //   //   var productImageElement = document.querySelector('.swiper-slide img');
  //   //   var productImageUrl = productImageElement ? productImageElement.getAttribute('src') : '';

  //   //   Kakao.Link.sendDefault({
  //   //     objectType: 'feed',
  //   //     content: {
  //   //       title: productTitle,
  //   //       description: productSummary,
  //   //       imageUrl: productImageUrl,
  //   //       link: {
  //   //         mobileWebUrl: currentURL,
  //   //         webUrl: currentURL,
  //   //       },
  //   //     },
  //   //     buttons: [
  //   //       {
  //   //         title: '웹으로 보기',
  //   //         link: {
  //   //           mobileWebUrl: currentURL,
  //   //           webUrl: currentURL,
  //   //         },
  //   //       },
  //   //     ],
  //   //     // 카카오톡 미설치 시 카카오톡 설치 경로이동
  //   //     installTalk: true,
  //   //   });
  //   // }
  // };

  // Lifecycle
  useEffect(() => {
    if (!navigator.canShare) {
      setShowWebShareBtn(false);
    } else if (navigator.canShare(shareData)) {
      setShowWebShareBtn(true);
    } else {
      setShowWebShareBtn(false);
    }
  }, [navigator.canShare]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200">
          <UserPlus size={20} strokeWidth={2.5} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>초대</DialogTitle>
          <DialogDescription>초대하고싶은 분께 링크를 전달해주세요!</DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex gap-2">
            <Input
              type="text"
              wrapperClassName="grow"
              className="text-sm"
              readOnly
              value={`https://moduchongmu.com/invitation/${travelUid ?? 'unknown'}`}
            />
            <Button
              variant={copied ? 'secondary' : 'primary'}
              size="small"
              disabled={travelUid === undefined}
              onClick={handleCopy}
              className="gap-0"
            >
              <span
                className={`whitespace-nowrap overflow-hidden  transition-[width,_opacity] ${copied ? 'w-0 opacity-0' : 'w-[34px] opacity-100'}`}
              >
                Copy
              </span>
              <span
                className={`whitespace-nowrap overflow-hidden  transition-[width,_opacity] ${!copied ? 'w-0 opacity-0' : 'w-[56px] opacity-100'}`}
              >
                Done! 🎉
              </span>
            </Button>
          </div>
        </div>

        {/* {showWebShareBtn && <button onClick={handleShare}>Share</button>} */}

        {deviceType === 'androidwv' && (
          <div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                window.AndroidWV?.shareText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`);
              }}
            >
              <ButtonIcon name="send" size={14} />
              바로 공유하기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
