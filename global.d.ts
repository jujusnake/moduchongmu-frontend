declare global {
  interface Window {
    webkit: {
      messageHandlers: {
        moChong: {
          postMessage: (parameter: string) => void;
        };
      };
    };
    initContent: (parameter: InitContent) => void;
  }
}

export {};
