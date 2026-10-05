export interface ISocialLink {
   platform: string;
   url: string;
   icon?: string;
 }
 
 export interface IAbout {
   _id: string;
   fullName: string;
   title?: string;
   headLine?: string;   
   bio?: string;
   avatarUrl?: string;
   resumeUrl?: string;
   location?:string;
   yearsOfExperience?: number;
   socialLinks: ISocialLink[];
   createdAt: string;
   updatedAt: string;
 }
 
 export type IUpdateAbout = Partial<Omit<IAbout, '_id' | 'createdAt' | 'updatedAt'>>;

 export interface IAboutResponse {
  message: string;
  allabouts: IAbout [];
}