import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TripListItemFloat } from '../molecules/TripListItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetTravelListRes } from '@/types/travel';
import { getDestinationName } from '@/lib/geonames';
import { getDday, parseDateRange } from '@/lib/datetime';

const TripsCurrentCarousel = ({ currentTravel }: { currentTravel?: GetTravelListRes['currentTravel'] }) => {
  // Hooks
  const navigate = useNavigate();

  // States
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  // Lifecycle
  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on('select', () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  if (currentTravel === undefined || currentTravel === null) return <></>;

  return (
    <div className="px-6">
      <TripListItemFloat
        imgSrc={currentTravel?.coverImgUrl}
        title={currentTravel.travelName}
        location={getDestinationName(currentTravel.city, currentTravel.country)}
        members={currentTravel.memberArray.length}
        date={parseDateRange(currentTravel.startDate, currentTravel.endDate)}
        dday={getDday(currentTravel.endDate)}
        className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]"
        onClick={() => navigate(`/trip/${currentTravel.uid}`)}
      />
    </div>
  );

  // return (
  //   <div className="space-y-3">
  //     <Carousel setApi={setApi}>
  //       <CarouselContent>
  //         <CarouselItem>
  //           <div className="px-6">
  //             <TripListItemFloat
  //               title="효짱 남쥬 여행~"
  //               location="도쿄, 일본"
  //               members={2}
  //               date="언제나~ 함께!"
  //               className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]"
  //             />
  //           </div>
  //         </CarouselItem>
  //         {/* <CarouselItem>
  //           <div className="px-6">
  //             <TripListItemFloat
  //               title="효짱 남쥬 여행~"
  //               location="도쿄, 일본"
  //               members={2}
  //               date="언제나~ 함께!"
  //               className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]"
  //             />
  //           </div>
  //         </CarouselItem>
  //         <CarouselItem>
  //           <div className="px-6">
  //             <TripListItemFloat
  //               title="효짱 남쥬 여행~"
  //               location="도쿄, 일본"
  //               members={2}
  //               date="언제나~ 함께!"
  //               className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]"
  //             />
  //           </div>
  //         </CarouselItem> */}
  //       </CarouselContent>
  //       {/* <CarouselPrevious /> */}
  //       {/* <CarouselNext /> */}
  //     </Carousel>

  //     <div className="flex items-center justify-center gap-1">
  //       {Array.from({ length: count }).map((_, i) => (
  //         <div
  //           key={`trips-current-pagination-dot-${i}`}
  //           data-current={current === i + 1}
  //           className="rounded-full w-2 h-2 bg-brand-primary-main/50 data-[current=true]:bg-brand-primary-contrastText"
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default TripsCurrentCarousel;
