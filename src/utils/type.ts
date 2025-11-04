export type BookFeatureProps = {
  id: string
  title: string,
  author: string,
  genre: string,
  rating: number,
  coverUrl: string,
  coverColor: string,
  description: string,
  totalCopies: number,
  availableCopies: number,
  videoUrl: string,
  summary: string
}

export interface BookFormInputs {
  title: string;
  author: string;
  genre: string;
  bookVideo: string;
  bookPrimaryColor: string;
  bookImage: string;
  totalNumberOfBooks: string;
  description: string;
}