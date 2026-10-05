export interface IArticle {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage?: string;
    tags: string[];
    status: 'draft' | 'published';
    readingTimeMinutes?: number;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  } 
  
  export interface IArticlesResponse {
    message: string;
    allarticles: IArticle[];
  }