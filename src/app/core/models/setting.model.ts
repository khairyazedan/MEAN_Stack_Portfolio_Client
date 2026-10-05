export interface ISetting {
    _id: string;
    siteName: string;
    siteDescription?: string;
    primaryColor: string;
    enableBlog: boolean;
    enableContactForm: boolean;
    seoKeywords: string[];
    googleAnalyticsId?: string;
    themeMode: 'light' | 'dark' | 'system';
    createdAt: string;
    updatedAt: string;
  }
  export interface ISettingResponse {
    message: string;
    setting: ISetting;
  }
  
  export type IUpdateSetting = Partial<Omit<ISetting, '_id' | 'createdAt' | 'updatedAt'>>;