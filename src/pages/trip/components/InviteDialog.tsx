import { Button } from '@/components/ui/buttons';
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
import { set } from 'date-fns';
import { UserPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const InviteDialog = ({ travelUid }: { travelUid?: string }) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);
  const [showWebShareBtn, setShowWebShareBtn] = useState(false);

  // Values
  const shareData = {
    title: '[초대장] 모두의 총무',
    text: 'Join my trip!',
    url: `https://moduchongmu.com/invitation/${travelUid ?? 'unknown'}`,
  };

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
      <DialogContent className="bg-bg-back">
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
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
