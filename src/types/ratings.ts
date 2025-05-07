export interface RatingBase {
  rated: boolean;
  reporting: boolean;
  ratedSince: string;
  rating: string;
}

export type Rating = RatingBase;
