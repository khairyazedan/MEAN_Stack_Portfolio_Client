import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectResponse, IProjectsResponse } from '../models/project.model';

@Service()
export class ProjectsService {
    private _httpClient :HttpClient = inject(HttpClient);
    private apiURL = 'http://localhost:3000/project';

    getProjects(): Observable<IProjectsResponse> {
        return this._httpClient.get<IProjectsResponse>(this.apiURL);
      }
    
      addProject(projectData: FormData): Observable<IProjectResponse> {
        return this._httpClient.post<IProjectResponse>(this.apiURL, projectData);
      }
    
      updateProject(id: string, projectData: FormData): Observable<IProjectResponse> {
        return this._httpClient.put<IProjectResponse>(`${this.apiURL}/${id}`, projectData);
      }
    
      deleteProject(id: string): Observable<IProjectResponse> {
        return this._httpClient.delete<IProjectResponse>(`${this.apiURL}/${id}`);
      }
}
 