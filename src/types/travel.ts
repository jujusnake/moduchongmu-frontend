type Member = {
  idx: number;
  name: string;
  email: string;
};

type Travel = {
  uid: string;
  host: string;
  travelName: string;
  country: string;
  city: string;
  memberArray: Member[];
  startDate: string;
  endDate: string;
  currency: string;
  memo: string;
  settlementDone: boolean;
  coverImgUrl: string;
  createdDate: string;
};

type GetTravelRes = {
  travel: Travel;
};

type GetCurrentTravelRes = {
  travel: Travel | null;
};

type GetTravelErrorCodes = 'NOT_MEMBER' | 'Internal_Server_Error';

type PostTravelParams = {
  travelName: string;
  city: string;
  country?: string;
  startDate: string;
  endDate: string;
  memo?: string;
};

type PostTravelRes = {
  postingImageUrl?: string | null;
  travel: {
    uid: string;
    host: string;
    travelName: string;
    country: string;
    city: string;
    memberArray: string[];
    startDate: string;
    endDate: string;
    currency: string;
    memo: string;
    settlementDone: boolean;
    coverImgUrl: string;
    createdDate: string;
  };
};

type PostTravelErrorCodes = 'ALREADY_EXIST_TRAVEL_NAME' | 'Internal_Server_Error';

type PutTravelParams = {
  uid: string;
  travelName?: string;
  city?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
  memo?: string;
  settlementDone?: boolean;
  coverImage?: boolean;
};

type PutTravelRes = {
  travel: Travel;
  postingImageUrl?: string;
};

type PutTravelErrorCodes = GetTravelErrorCodes;

type GetTravelListRes = {
  currentTravel: {
    uid: string;
    host: string;
    travelName: string;
    country: string;
    city: string;
    memberArray: string[];
    startDate: string;
    endDate: string;
    currency: string;
    memo: string;
    settlementDone: boolean;
    coverImgUrl: string;
    createdDate: string;
  };
  travelList: Travel[];
  totalCount: number;
};

type GetTravelCityRes = {
  result:
    | {
        city: string;
        country: string;
        cover: string;
      }[]
    | null;
};

type GetTravelCityErrorCodes = 'Internal_Server_Error';

export {
  type GetTravelRes,
  type GetTravelErrorCodes,
  type PostTravelParams,
  type PostTravelRes,
  type PostTravelErrorCodes,
  type PutTravelParams,
  type PutTravelRes,
  type PutTravelErrorCodes,
  type GetTravelListRes,
  type GetTravelCityRes,
  type GetTravelCityErrorCodes,
  type Member,
  type GetCurrentTravelRes,
};
