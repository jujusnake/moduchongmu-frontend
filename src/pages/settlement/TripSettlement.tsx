import { Button, ButtonIcon } from '@/components/ui/buttons';
import { SettlementContainer, SettlementReceiver, SettlementSender } from '@/pages/settlement/components/settlement';
import { useEffect, useRef } from 'react';
import { toBlob } from 'html-to-image';
import { useSettlement } from '@/APIs/travel/settlement/get';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import useUnstrictEffect from '@/hooks/useUnstrictEffect';

const TripSettlement = () => {
  // API Calls
  const { mutate: postSettlement, data: settlementData, isPending, isError } = useSettlement();

  // Hooks
  const { tripUid: travelUid } = useParams();
  const navigate = useNavigate();

  const htmlToPngRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    if (htmlToPngRef.current === null) return;

    toBlob(htmlToPngRef.current, { quality: 1 })
      .then((dataUrl) => {
        if (dataUrl === null) return;

        const fileName = '정산결과.jpeg';

        if (!navigator.share) {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(dataUrl);
          a.download = fileName;
          a.click();
        } else {
          const data = {
            files: [new File([dataUrl], fileName, { type: 'image/jpeg' })],
            title: '타이틀이라네',
            text: '텍스트? 이게 뭐임',
          };

          navigator
            .share(data)
            .then(() => {
              //
            })
            .catch((error) => {
              //
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useUnstrictEffect(() => {
    if (travelUid) {
      postSettlement(travelUid, {
        onError: (error) => {
          if (isAxiosError(error)) {
            toast.error(`에러가 발생했습니다. 정산에 실패했습니다. code: ${error.code}`, { duration: 4000 });
          }
        },
      });
    }
  });

  if (isPending || isError) {
    return (
      <>
        <header className="flex items-center gap-3 px-5 pt-10 pb-5">
          <Button className="p-2" variant="ghost" size="large" onClick={() => navigate(`/trip/${travelUid}`)}>
            <ButtonIcon name="chevron-left" />
          </Button>
          <span className="text-2xl font-semibold text-text-primary">정산하기</span>
        </header>
        <div className="min-h-[calc(100dvh-96px)] flex items-center justify-center flex-col space-y-5">
          {isError && <div className="text-lg font-medium">정산서를 만들지 못했어요. 다시 시도해주세요.</div>}
          {isPending && (
            <>
              <Loader2 size={40} className="text-brand-primary-main animate-spin" />
              <div className="text-lg font-medium">정산서를 만들고 있어요...</div>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <header className="flex items-center gap-3 px-5 pt-10 pb-5">
        <Button className="p-2" variant="ghost" size="large" onClick={() => navigate(`/trip/${travelUid}`)}>
          <ButtonIcon name="chevron-left" />
        </Button>
        <span className="text-2xl font-semibold text-text-primary">정산하기</span>
      </header>

      {/* 정산 내역 */}
      <main className="pb-[100px]">
        <div ref={htmlToPngRef} className="p-5 space-y-4 bg-bg-back">
          {settlementData?.otherCurrencySettlementList?.['KRW']?.map((settlement) => (
            <SettlementContainer key={''}>
              <SettlementSender userName={settlement.sender.userName} className="mb-3" />
              <div className="pl-10 space-y-3">
                <SettlementReceiver
                  userName={settlement.receiver.userName}
                  amount={settlement.amount}
                  currency={settlement.currency}
                />
              </div>
            </SettlementContainer>
          ))}
        </div>
      </main>

      {/* 공유하기 버튼 */}
      <div className="fixed bottom-0 w-full px-6 py-6 left-1/2 -translate-x-1/2 bg-bg-back max-w-[500px]">
        <Button size="large" className="w-full" onClick={handleShare}>
          <ButtonIcon name="share" />
          공유하기
        </Button>
      </div>
    </>
  );
};

export default TripSettlement;
