interface AndroidInterface {
  onSocialSignin: (carrier: string) => void;
}

interface Window {
  Android?: AndroidInterface;
}
