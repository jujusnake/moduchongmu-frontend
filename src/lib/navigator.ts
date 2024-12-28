const detectDevice = () => {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // @ts-ignore
  if (/iPhone|iPad|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  } else if (/Android/.test(userAgent)) {
    return 'android';
  } else {
    return 'pc';
  }
};

export { detectDevice };
