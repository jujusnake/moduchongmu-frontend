import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

type Props = {
  carrier: 'naver' | 'kakao' | 'google' | 'apple';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SocialSigninButton = ({ carrier, type = 'button', className, style, ...props }: Props) => {
  const bgColor = {
    naver: '#03C75A',
    kakao: '#FEE500',
    google: '#FFFFFF',
    apple: '#000000',
  };

  return (
    <button
      type={type}
      className={cn('shadow-[0px_2px_4px_rgba(0,_0,_0,_0.15)] p-3 rounded-full', className)}
      style={{ backgroundColor: bgColor[carrier], ...style }}
      {...props}
    >
      <img src={`/signin/logo-${carrier}.svg`} width={24} height={24} />
    </button>
  );
};

export default SocialSigninButton;
