export const filterKeys = [
  'BIKE_PATH',
  'BLUFF',
  'CAMPGROUND',
  'DSABLDACSS',
  'DUNES',
  'FEE',
  'RESTROOMS',
  'SNDY_BEACH',
  'VISTOR_CTR',
  'BOATING',
  'FISHING',
  'PARKING',
  'PTH_BEACH',
  'RKY_SHORE',
  'STRS_BEACH',
  'WLDLFE_VWG',
] as const;

export type FilterKey = typeof filterKeys[number];

export type Filter = {
  key: FilterKey;
  title: string;
  value: boolean;
};

export const defaultFilters: Filter[] = [
  { key: 'BIKE_PATH', title: 'Bike path', value: false },
  { key: 'BLUFF', title: 'Bluff', value: false },
  { key: 'CAMPGROUND', title: 'Campground', value: false },
  { key: 'DSABLDACSS', title: 'Dsabldacss', value: false },
  { key: 'DUNES', title: 'Dunes', value: false },
  { key: 'FEE', title: 'Fee', value: false },
  { key: 'RESTROOMS', title: 'Restrooms', value: false },
  { key: 'SNDY_BEACH', title: 'SNDY-beach', value: false },
  { key: 'VISTOR_CTR', title: 'Vistor_CTR', value: false },
  { key: 'BOATING', title: 'Boating', value: false },
  { key: 'FISHING', title: 'Fishing', value: false },
  { key: 'PARKING', title: 'Parking', value: false },
  { key: 'PTH_BEACH', title: 'PTH_beach', value: false },
  { key: 'RKY_SHORE', title: 'RKY_SHORE', value: false },
  { key: 'STRS_BEACH', title: 'STRS_beach', value: false },
  { key: 'WLDLFE_VWG', title: 'WLDLFE_VWG', value: false },
];
