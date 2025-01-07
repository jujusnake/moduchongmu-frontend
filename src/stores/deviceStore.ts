import { detectDevice } from '@/lib/navigator';
import { create } from 'zustand';

type DeviceStore = {
  deviceType: 'iosweb' | 'androidweb' | 'ioswv' | 'androidwv' | 'pc';
};

const useDeviceStore = create<DeviceStore>(() => ({
  deviceType: detectDevice(),
}));

export { useDeviceStore };
