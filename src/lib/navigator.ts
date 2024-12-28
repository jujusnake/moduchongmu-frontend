const detectDevice = (): 'iosweb' | 'androidweb' | 'ioswv' | 'androidwv' | 'pc' => {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // @ts-ignore
  if (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream) {
    if (window.webkit && window.webkit.messageHandlers) {
      return 'ioswv';
    }
    return 'iosweb';
  } else if (/Android/.test(userAgent)) {
    // @ts-ignore
    if (typeof window.AndroidInterface !== 'undefined' || userAgent.includes('wv')) {
      return 'androidwv';
    }
    return 'androidweb';
  } else {
    return 'pc';
  }
};

export { detectDevice };
