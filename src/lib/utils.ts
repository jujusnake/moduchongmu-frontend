import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getCleanPathname = (path: string) => {
  if (path === '/') return path;
  return path.replace(/\/+$/, '');
};

const addCommas = (number: number) => number.toLocaleString();

function copyToClipboard(text: string, options?: { onSuccess?: () => void; onError?: () => void }): void {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        options?.onSuccess?.();
      })
      .catch((error) => {
        options?.onError?.();
      });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Avoid scrolling to bottom
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.();
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

export { cn, getCleanPathname, addCommas, copyToClipboard };
