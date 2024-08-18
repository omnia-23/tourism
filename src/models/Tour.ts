export type Tour = {
  id: number;
  name: string;
  description: string;
  location: string;
  duration: string;
  includes: string[];
  excludes: string[];
  media: TourMedia[];
  reviews: TourReview[];
  options: TourOption[];
  price: number;
};

export type TourOption = {
  name: string;
  price: number;
};

export type TourMedia = {
  id: number;
  original_url: string;
};

export type TourReview = {
  title: string;
  body: string;
  stars: number;
  tour_id: number;
  id: number;
  tour?: Tour;
  deleted_at: string | null;
};
