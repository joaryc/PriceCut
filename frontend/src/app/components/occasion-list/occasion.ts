export interface Occasion {
  _id: number;
  title: string;  
  start_date;
  end_date;
  price: number; 
  description: string;  
  status: string;
  occasion_link: string;
  pic_link: string;
  comments?: [];
  gallery1?: String,
  gallery2?: String,
  gallery3?: String,
  gallery4?: String,
}

function createOccasion(config: Occasion): {
  title: string; 
  start_date: Date; 
  end_date: Date;
  price: number; 
  description: string;
  status: string;
  occasion_link: string,
  pic_link: string,  
  gallery1: String,
  gallery2: String,
  gallery3: String,
  gallery4: String,
  
} {
  let newOccasion = {
    title: config.title, 
    start_date: config.start_date, 
    end_date: config.end_date,
    price: config.price, 
    description: config.description,
    occasion_link: config.occasion_link,
    status: config.status,
    pic_link: config.pic_link, 
    gallery1: config.gallery1,
    gallery2: config.gallery2,
    gallery3: config.gallery3,
    gallery4: config.gallery4,
  };


  return newOccasion;
}