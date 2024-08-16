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

export { cn, getCleanPathname, addCommas };
