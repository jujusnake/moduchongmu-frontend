import { EffectCallback, useEffect, useRef } from 'react';

function useUnstrictEffect(effect: EffectCallback) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      effect();
    }
  }, []);
}

export default useUnstrictEffect;
