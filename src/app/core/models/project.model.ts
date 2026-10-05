export interface IProject {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    description?: string;
    coverImage?: string;
    images: string[];
    liveUrl?: string;
    githubUrl?: string;
    technologies: string[];  
    featured: boolean;
    order: number;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
  }

export type ICreateProject = Omit<IProject, '_id' | 'createdAt' | 'updatedAt'>;
export type IUpdateProject = Partial<ICreateProject>;

export interface IProjectsResponse {
  message: string;
  allprojects: IProject[];
} 

export interface IProjectResponse {
  message: string;
  project: IProject;
}
  