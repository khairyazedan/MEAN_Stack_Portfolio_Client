export interface ITestimonial {
    _id: string;
    authorName: string;
    authorTitle: string;
    company?: string;
    authorAvatar?: string;
    relationship?: string;
    content: string; 
    rating?: number;
    isApproved: boolean;
    order: number;
    createdAt: string;  
    updatedAt: string;
  }
  
  export type ICreateTestimonial = Omit<ITestimonial, '_id' | 'createdAt' | 'updatedAt' | 'isApproved' | 'order' | 'rating'> & {
    rating?: number | null;
  };
  export type IUpdateTestimonial = Partial<Omit<ITestimonial, '_id' | 'createdAt' | 'updatedAt'>>;

  export interface ITestimonialsResponse {
    message: string;
    allTestimonials: ITestimonial[];
  }
  
  export interface ITestimonialResponse {
    message: string;
    testimonial: ITestimonial;
  }