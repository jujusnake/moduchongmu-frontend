import { Button, ButtonIcon } from '@/components/ui/buttons';
import { SettlementContainer, SettlementReceiver, SettlementSender } from '@/pages/settlement/components/settlement';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import { useSettlement } from '@/APIs/travel/settlement/get';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { detectDevice } from '@/lib/navigator';
import EmptyIcon from '@/components/atoms/EmptyIcon';

type SettlementItem = {
  sender: { idx: string | number; userName: string; userEmail: string };
  receiver: { idx: string | number; userName: string; userEmail: string };
  amount: number;
  currency: string;
};

type SettlementItemForRender = Record<
  string,
  {
    sender: SettlementItem['sender'];
    receivers: { idx: string | number; userName: string; transactions: { amount: number; currency: string }[] }[];
  }
>;

const TripSettlement = () => {
  // API Calls
  const { mutate: postSettlement, data: settlementData, isPending, isError } = useSettlement();

  // States
  const [currencyMode, setCurrencyMode] = useState<'each' | 'krw'>('krw');

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

        if (detectDevice() === 'pc') {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(dataUrl);
          a.download = fileName;
          a.click();
          return;
        }

        // TODO: 쉐어 분기쳐야함

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

  useEffect(() => {
    if (travelUid) {
      postSettlement(travelUid, {
        onError: (error) => {
          if (isAxiosError(error)) {
            toast.error(`에러가 발생했습니다. 정산에 실패했습니다. code: ${error.code}`, { duration: 4000 });
          }
        },
      });
    }
  }, []);

  // Values
  const settlementList = useMemo(() => {
    if (!settlementData) return [];

    const otherCurrencyList = Object.values(settlementData.otherCurrencySettlementList).flat();
    const mergedMap = [...settlementData.settlementList, ...otherCurrencyList];

    const result: SettlementItem[] = [];
    mergedMap.forEach((si) => {
      result.push({
        sender: { idx: si.sender.idx, userName: si.sender.userName, userEmail: si.sender.userEmail },
        receiver: { idx: si.receiver.idx, userName: si.receiver.userName, userEmail: si.receiver.userEmail },
        amount: si.originAmount,
        currency: si.originCurrency,
      });
    });

    return mergeSettlementBlocks(result);
  }, [settlementData]);

  const krwSettlementList = useMemo(() => {
    if (!settlementData) return [];

    const otherCurrencyList = Object.values(settlementData.otherCurrencySettlementList).flat();
    const transactions = [...settlementData.settlementList, ...otherCurrencyList];

    // Step 1: Calculate net balances for each person
    const balances: Record<number, { amount: number; userName: string; userEmail: string }> = {};
    transactions.forEach((t) => {
      balances[t.sender.idx] = {
        amount: (balances[t.sender.idx]?.amount || 0) - t.amount,
        userName: t.sender.userName,
        userEmail: t.sender.userEmail,
      };
      balances[t.receiver.idx] = {
        amount: (balances[t.receiver.idx]?.amount || 0) + t.amount,
        userName: t.receiver.userName,
        userEmail: t.receiver.userEmail,
      };
    });

    const creditors: { idx: string; userName: string; userEmail: string; balance: number }[] = [];
    const debtors: { idx: string; userName: string; userEmail: string; balance: number }[] = [];

    for (const [idx, balance] of Object.entries(balances)) {
      if (balance.amount > 0) {
        creditors.push({ idx, userName: balance.userName, balance: balance.amount, userEmail: balance.userEmail });
      } else if (balance.amount < 0) {
        debtors.push({ idx, userName: balance.userName, balance: -balance.amount, userEmail: balance.userEmail }); // Convert to positive for easier processing
      }
    }

    const simplified: SettlementItem[] = [];

    let i = 0,
      j = 0;
    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];
      const amount = Math.min(creditor.balance, debtor.balance);

      simplified.push({
        sender: { idx: debtor.idx, userName: debtor.userName, userEmail: debtor.userEmail },
        receiver: { idx: creditor.idx, userName: creditor.userName, userEmail: creditor.userEmail },
        amount,
        currency: 'KRW',
      });

      creditor.balance -= amount;
      debtor.balance -= amount;

      if (creditor.balance === 0) i++;
      if (debtor.balance === 0) j++;
    }

    return mergeSettlementBlocks(simplified);
  }, [settlementData]);

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
        <div className="flex gap-1 px-5">
          <Button
            onClick={() => {
              setCurrencyMode('krw');
            }}
            variant={currencyMode === 'krw' ? 'primary' : 'outline'}
          >
            KRW(한국 원)
          </Button>
          <Button
            onClick={() => {
              setCurrencyMode('each');
            }}
            variant={currencyMode === 'each' ? 'primary' : 'outline'}
          >
            개별 화폐
          </Button>
        </div>
        <aside
          className="px-5 mt-1 ml-1 text-xs font-medium visible data-[hide=true]:invisible"
          data-hide={currencyMode === 'each'}
        >
          *오늘의 환율로 계산됩니다.
        </aside>

        <div ref={htmlToPngRef} className="p-5 space-y-4 bg-bg-back">
          {settlementList.length === 0 && krwSettlementList.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-base font-medium text-gray-500">
              <EmptyIcon />
              정산할 내역이 없어요!
            </div>
          )}
          {(currencyMode === 'each' ? settlementList : krwSettlementList).map((stm) => (
            <SettlementContainer key={`settlement-${stm.sender.idx}`}>
              <SettlementSender userName={stm.sender.userName} className="mb-3" userEmail={stm.sender.userEmail} />
              <div className="pl-10 space-y-3">
                {stm.receivers.map((receiver) => (
                  <SettlementReceiver
                    key={`settlement-${stm.sender.idx}-${receiver.idx}`}
                    userName={receiver.userName}
                    amounts={receiver.transactions}
                  />
                ))}
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

const mergeSettlementBlocks = (stms: SettlementItem[]) => {
  const result: SettlementItemForRender = {};

  for (const stm of stms) {
    const strIdx = String(stm.sender.idx);

    if (result[strIdx] === undefined) {
      result[strIdx] = {
        sender: stm.sender,
        receivers: [],
      };
    }

    const hasReceiver = result[strIdx].receivers.find((r) => r.idx === stm.receiver.idx);

    if (hasReceiver) {
      hasReceiver.transactions.push({ amount: stm.amount, currency: stm.currency });
    } else {
      result[strIdx].receivers.push({
        idx: stm.receiver.idx,
        userName: stm.receiver.userName,
        transactions: [{ amount: stm.amount, currency: stm.currency }],
      });
    }
  }

  return Object.values(result);
};
