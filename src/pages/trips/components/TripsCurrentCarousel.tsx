import { TripListItemFloat, TripListItemFloatSkeleton } from './TripListItem';
import { useNavigate } from 'react-router-dom';
import { getDdayOrElapsedDay, parseDateRange } from '@/lib/datetime';
import { getTravelThumbnail } from '@/lib/urls';
import { useCurrentTravel } from '@/APIs/travel/current/get';

const TripsCurrentCarousel = () => {
  // Hooks
  const navigate = useNavigate();

  // API Calls
  const { data: travel, isLoading } = useCurrentTravel();

  if (isLoading) {
    return (
      <div className="px-6">
        <TripListItemFloatSkeleton className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]" />
      </div>
    );
  }

  if (travel === undefined || travel.travel === null) {
    return <></>;
  }

  return (
    <div className="px-6">
      <TripListItemFloat
        imgSrc={getTravelThumbnail(travel.travel.uid)}
        title={travel.travel.travelName}
        members={travel.travel.memberArray.length}
        date={parseDateRange(travel.travel.startDate, travel.travel.endDate)}
        dday={getDdayOrElapsedDay(travel.travel.startDate, travel.travel.endDate)}
        className="w-full px-3 py-4 bg-[#4E7CD4] rounded-[4px]"
        onClick={() => navigate(`/trip/${travel.travel?.uid}`)}
        city={travel.travel.city}
        country={travel.travel.country}
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
