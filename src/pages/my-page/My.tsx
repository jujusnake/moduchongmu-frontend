import { Button, ButtonIcon } from '@/components/ui/buttons';
import MyShowMode from './components/MyShowMode';
import { useState } from 'react';
import MyEditMode from './components/MyEditMode';

const My = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-2 px-6 pt-10 pb-20 bg-brand-primary-dark">
        <h1 className="text-2xl font-semibold text-brand-primary-contrastText">My Page</h1>
        {isEditMode ? (
          <Button shape="round" className="p-2" variant="secondary" onClick={() => setIsEditMode(false)}>
            <ButtonIcon name="x" size={18} />
          </Button>
        ) : (
          <Button shape="round" className="p-2" variant="secondary" onClick={() => setIsEditMode(true)}>
            <ButtonIcon name="pencil" size={18} />
          </Button>
        )}
      </header>
      <main className="relative px-6 pt-[60px]">
        {isEditMode ? <MyEditMode onUpdate={() => setIsEditMode(false)} /> : <MyShowMode />}
      </main>
    </>
  );
};

export default My;
