import { HTMLAttributes } from 'react';

type Props = {
  type: 'naver' | 'kakao' | 'google' | 'apple';
} & HTMLAttributes<HTMLButtonElement>;

const SocialSigninButton = ({ type, ...props }: Props) => {
  const bgColor = {
    naver: '#03C75A',
    kakao: '#FEE500',
    google: '#FFFFFF',
    apple: '#000000',
  };

  return (
    <button
      {...props}
      className="shadow-[0px_2px_4px_rgba(0,_0,_0,_0.15)] p-3 rounded-full"
      style={{ backgroundColor: bgColor[type] }}
    >
      <img src={`/signin/logo-${type}.svg`} width={24} height={24} />
    </button>
  );
};

export default SocialSigninButton;
