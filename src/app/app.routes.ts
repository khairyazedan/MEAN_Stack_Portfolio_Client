import { Routes } from '@angular/router';
import {Layout} from "./layout/layout"
import { Admin } from './admin/admin';
import { Dashboard } from './admin/dashboard/dashboard';
import { AboutEdit } from './admin/about-edit/about-edit';
import { ArticlesManager } from './admin/articles-manager/articles-manager';
import { MessagesInbox } from './admin/messages-inbox/messages-inbox';
import { ProjectsManager } from './admin/projects-manager/projects-manager';
import { SkillsManager } from './admin/skills-manager/skills-manager';
import { TestimonialsManager } from './admin/testimonials-manager/testimonials-manager';
import { Settings } from './admin/settings/settings';
import { AdminLogin } from './admin/admin-login/admin-login';
import { Notfound } from './shared/notfound/notfound';
import { About } from './layout/about/about';
import { Skills } from './layout/skills/skills';
import { Projects } from './layout/projects/projects';
import { Testimonials } from './layout/testimonials/testimonials';
import { Articles } from './layout/articles/articles';
import { Contact } from './layout/contact/contact';

export const routes: Routes = [
    {
        path:'',
        component:Layout, 
        children:[
            {
                path:"", 
                redirectTo:'home',
                pathMatch:'full'
            },
            {
                path:'home',
                component:About
            },
            {
                path:'skills',
                component:Skills
            },{
                path:'projects',
                component:Projects
            },{
                path:'testimonials',
                component:Testimonials
            },{
                path:'articles',
                component:Articles
            },
            {
                path:'contact',
                component:Contact
            },
        ]

    },
    {
        path:"admin/login",
        component:AdminLogin
    },
    {
        path:"admin",
        component:Admin,
        children:[
            {
                path:"",
                redirectTo:'dashboard',
                pathMatch:'full'
            },
            {
                path:"dashboard",
                component:Dashboard
        
            },
            {
                path:"about",
                component:AboutEdit
        
            },
            {
                path:"article",
                component:ArticlesManager
        
            },
            {
                path:"messages",
                component:MessagesInbox
        
            },
            {
                path:"projects",
                component:ProjectsManager
        
            },
            {
                path:"skills",
                component:SkillsManager
        
            },
            {
                path:"testimonials",
                component:TestimonialsManager
        
            },
            {
                path:"settings",
                component:Settings
        
            }

        ]
    },
    {
        path:'**',
        component:Notfound
    }
];
 