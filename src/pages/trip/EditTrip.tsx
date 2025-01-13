import { useTravel } from '@/APIs/travel/get';
import { Button } from '@/components/ui/buttons';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Image, Loader2, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TripThumbnailImg from '@/components/atoms/TripThumbnailImg';
import { getTravelThumbnail } from '@/lib/urls';
import { useUpdateTravel } from '@/APIs/travel/put';
import { format } from 'date-fns';
import { queryKeys } from '@/APIs/react-query';
import { toast } from 'sonner';
import MemberList from './components/MemberList';
import { LocationSelector } from '@/components/organism/location';
import { useQueryClient } from '@tanstack/react-query';
import DeleteTrip from './components/DeleteTrip';
import { uploadImageToS3 } from '@/lib/image';

const EditTrip = () => {
  // Hooks
  const queryClient = useQueryClient();
  const { tripUid } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  // States
  const [travelName, setTravelName] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [location, setLocation] = useState<string[]>([]);
  const [thumbnailImg, setThumbnailImg] = useState<File | undefined>();
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // API Calls
  const { data: travelRes, isError } = useTravel(tripUid ?? '');
  const { mutate: updateTravel, isPending: updatingTravel } = useUpdateTravel();

  // Handlers
  const handleUpdateTravel = () => {
    const uid = travelRes?.data.travel.uid;
    if (!uid) {
      toast.error('여행 정보를 불러오는 중입니다. 잠시만 기다려주세요', { duration: 3000 });
      return;
    }

    const newTravelName =
      travelName.length > 0 && travelName !== travelRes?.data.travel.travelName ? travelName : undefined;
    const newCity = location[0].length > 0 && location[0] !== travelRes?.data.travel.city ? location[0] : undefined;
    const newCountry =
      // TODO: null을 보낼 수 있게 백엔드 수정해야함
      location[1] === undefined ? '' : location[1] !== travelRes?.data.travel.country ? location[1] : undefined;
    const newStartDate =
      date?.from && travelRes.data.travel.startDate !== format(date?.from, 'yyyy-MM-dd')
        ? format(date?.from, 'yyyy-MM-dd')
        : undefined;
    const newEndDate =
      date?.to && travelRes.data.travel.endDate !== format(date?.to, 'yyyy-MM-dd')
        ? format(date?.to, 'yyyy-MM-dd')
        : undefined;

    const newTravelData = {
      travelName: newTravelName,
      city: newCity,
      country: newCountry,
      startDate: newStartDate,
      endDate: newEndDate,
      coverImage: thumbnailImg !== undefined,
    };

    updateTravel(
      {
        uid,
        ...newTravelData,
      },
      {
        onSuccess: async (data) => {
          if (data.postingImageUrl && thumbnailImg) {
            setIsUploadingImage(true);
            await uploadImageToS3(data.postingImageUrl, thumbnailImg);
            setIsUploadingImage(false);
          }
          queryClient.invalidateQueries({ queryKey: [queryKeys.travel] });
          navigate(state?.from ?? `/trip/${tripUid}`, { replace: true });
          toast.success('여행 정보를 수정했습니다', { duration: 3000 });
        },
        onError: (error) => {
          console.log(error);
          toast.error('여행 수정을 실패했습니다. 다시 시도해주세요', { duration: 3000 });
        },
      },
    );
  };

  // Lifecycle
  useEffect(() => {
    if (travelRes) {
      setTravelName(travelRes.data.travel.travelName);
      setLocation([travelRes.data.travel.city, travelRes.data.travel.country]);
      setDate({
        from: new Date(travelRes.data.travel.startDate),
        to: new Date(travelRes.data.travel.endDate),
      });
    }
  }, [travelRes]);

  // Render
  if (isError || tripUid === undefined) {
    return (
      <>
        <header className="relative flex gap-2 px-6 py-6 bg-brand-primary-dark">
          <button className="text-text-contrast" onClick={() => navigate(state?.from ?? `/trip/${tripUid}`)}>
            <ChevronLeft />
          </button>
          <h1 className="z-10 text-2xl font-semibold text-brand-primary-contrastText">여행 정보 수정하기</h1>
        </header>

        <div className="p-6 space-y-6">오류가 있는 것 같습니다!</div>
      </>
    );
  }

  return (
    <>
      <header className="flex justify-between p-5 bg-brand-primary-dark">
        <div className="flex items-center gap-4">
          <button
            className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200"
            onClick={() => navigate(state?.from ?? `/trip/${tripUid}`)}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <h1 className="z-10 text-2xl font-semibold text-brand-primary-contrastText">여행 정보</h1>
        </div>

        <div className="flex gap-3">
          <MemberList
            travelUid={tripUid}
            memberArray={travelRes?.data.travel.memberArray}
            host={travelRes?.data.travel.host}
          >
            <button className="relative p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200">
              <Users size={20} strokeWidth={2.5} />
              <aside className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold truncate rounded-full -bottom-1 -right-1 bg-brand-primary-main/90 text-brand-primary-contrastText">
                {travelRes?.data.travel.memberArray.length ?? '0'}
              </aside>
            </button>
          </MemberList>

          <DeleteTrip uid={tripUid} host={travelRes?.data.travel.host}>
            <button className="p-2 transition-colors rounded-full text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200">
              <Trash2 size={20} strokeWidth={2.5} />
            </button>
          </DeleteTrip>
        </div>
      </header>

      <main className="p-6 mb-24 space-y-6">
        {/* 썸네일 */}
        <div className="relative flex aspect-video rounded-md overflow-hidden isolate shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-50 mb-3">
          <TripThumbnailImg
            src={thumbnailImg ? URL.createObjectURL(thumbnailImg) : getTravelThumbnail(travelRes?.data.travel.uid)}
            city={travelRes?.data.travel.city}
            className="object-cover object-center w-full h-full"
          />

          <div className="absolute p-2 transition-colors rounded-full bottom-2 size-9 right-2 text-text-secondary bg-white/80 hover:bg-white/100 active:bg-neutral-200">
            <Image
              size={20}
              strokeWidth={2.5}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
            <input
              type="file"
              className="w-full h-full opacity-0"
              accept="image/*"
              id="thumbnail-upload-input"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setThumbnailImg(file);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>

        {/* 여행 이름 */}
        <div className="space-y-2">
          <label htmlFor="edit-trip-travel-name" className="text-sm font-semibold text-text-secondary">
            여행 이름
          </label>
          <Input
            id="edit-trip-travel-name"
            value={travelName}
            onChange={(e) => setTravelName(e.target.value)}
            placeholder={travelRes?.data.travel.travelName}
          />
        </div>

        {/* 여행지 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-secondary">여행지</label>
          <LocationSelector location={location} onLocationChange={setLocation} />
        </div>

        {/* 일정 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-secondary">일정</label>
          <div className="flex items-center gap-3">
            <Calendar
              id="create-trip-calendar"
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              className="w-full border rounded-md border-border-light/50 bg-bg-back"
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 flex justify-center w-full p-6 pointer-events-none">
        <Button
          variant="primary"
          className="w-full shadow-md pointer-events-auto max-w-moduchongmu-padding"
          onClick={handleUpdateTravel}
          disabled={updatingTravel || isUploadingImage}
        >
          {updatingTravel || isUploadingImage ? <Loader2 size={16} className="animate-spin" /> : '수정사항 저장'}
        </Button>
      </div>
    </>
  );
};

export default EditTrip;
