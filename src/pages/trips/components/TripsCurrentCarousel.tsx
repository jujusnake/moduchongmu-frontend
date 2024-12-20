import { TripListItemFloat } from './TripListItem';
import { useNavigate } from 'react-router-dom';
import { GetTravelListRes } from '@/types/travel';
import { getDday, parseDateRange } from '@/lib/datetime';
import { getTravelThumbnail } from '@/lib/urls';
// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
// import { getDestinationName } from '@/lib/geonames';
// import { useEffect, useState } from 'react';

const TripsCurrentCarousel = ({ currentTravel }: { currentTravel?: GetTravelListRes['currentTravel'] }) => {
  // Hooks
  const navigate = useNavigate();

  if (currentTravel === undefined || currentTravel === null) return <></>;

  return (
    <div className="px-6">
      <TripListItemFloat
        imgSrc={getTravelThumbnail(currentTravel.uid)}
        title={currentTravel.travelName}
        members={currentTravel.memberArray.length}
        date={parseDateRange(currentTravel.startDate, currentTravel.endDate)}
        dday={getDday(currentTravel.endDate)}
        className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]"
        onClick={() => navigate(`/trip/${currentTravel.uid}`)}
        city={currentTravel.city}
        country={currentTravel.country}
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
