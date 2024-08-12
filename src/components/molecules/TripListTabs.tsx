import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const TripListTabs = ({ value, onValueChange }: Props) => {
  return (
    <Tabs className="px-6 mb-4 w-full" value={value} onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        <TabsTrigger value="previous">지난 여행</TabsTrigger>
        <TabsTrigger value="future">앞으로 남은 여행</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TripListTabs;
