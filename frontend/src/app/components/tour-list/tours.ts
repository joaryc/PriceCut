export interface Tour {
  _id: number;
  name: string;
  destination: string;
  start_date;
  end_date;
  price: number;
  seats: number;
  seats_taken: number;
  description: string;
  pic_link: string;
  rate: number;
  comments?: [];
  gallery1?: String,
  gallery2?: String,
  gallery3?: String,
  gallery4?: String,
}

function createTour(config: Tour): {
  name: string; destination: string; start_date: Date; end_date: Date;
  price: number; seats: number; seats_taken: number; description: string;
  pic_link: string; rate: number
  gallery1: String,
  gallery2: String,
  gallery3: String,
  gallery4: String,
} {
  let newTour = {
    name: config.name, destination: config.destination, start_date: config.start_date, end_date: config.end_date,
    price: config.price, seats: config.seats, seats_taken: config.seats_taken, description: config.description,
    pic_link: config.pic_link, rate: config.rate,
    gallery1: config.gallery1,
    gallery2: config.gallery2,
    gallery3: config.gallery3,
    gallery4: config.gallery4,
  };


  return newTour;
}