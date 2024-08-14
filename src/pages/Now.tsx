import { Button, ButtonIcon } from '@/components/ui/buttons';
import { TentTree } from 'lucide-react';
import { Link } from 'react-router-dom';

const Now = () => {
  const empty = true;

  if (empty) {
    return (
      <main className="min-h-[calc(100dvh-80px)] flex flex-col justify-center p-6 items-center">
        <TentTree size={100} strokeWidth={1.5} className="mb-6" />
        <h1 className="text-xl font-semibold text-text-primary mb-2">현재는 여행을 하고 있지 않아요</h1>
        <p className="text-text-primary text-base mb-6">새로운 여행을 만들러 갈까요?</p>
        <Button className="w-full max-w-[200px]" asChild>
          <Link to="/createtrip" state={{ from: '/now' }}>
            <ButtonIcon name="plus" /> 새 여행 만들기
          </Link>
        </Button>
      </main>
    );
  }

  return <></>;
};

export default Now;
