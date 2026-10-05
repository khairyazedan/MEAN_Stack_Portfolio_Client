export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'Design'
  | 'Tools'
  | 'Soft Skills';

export interface ISkill {
  _id: string; 
  name: string;
  category: SkillCategory;
  proficiencyLevel?: number;
  iconUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ICreateSkill = Omit<ISkill, '_id' | 'createdAt' | 'updatedAt'>;
export type IUpdateSkill = Partial<ICreateSkill>;

 export interface ISkillsResponse {
    message: string;
    allSkills: ISkill[];
  }

