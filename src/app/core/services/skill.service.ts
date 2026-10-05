import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill,ISkillsResponse, ICreateSkill, IUpdateSkill } from '../models/skill.model';

@Service()
export class SkillService {
    private _httpClient: HttpClient = inject(HttpClient);
    private apiURL = 'http://localhost:3000/skill';

    getSkills(): Observable<ISkillsResponse> {
        return this._httpClient.get<ISkillsResponse>(this.apiURL);
      }
    
    
      addSkill(skillData: ICreateSkill): Observable<ISkillsResponse> {
        return this._httpClient.post<ISkillsResponse>(this.apiURL, skillData);
      }
    
      updateSkill(id: string, skillData: IUpdateSkill): Observable<ISkillsResponse> {
        return this._httpClient.put<ISkillsResponse>(`${this.apiURL}/${id}`, skillData);
      }
    
      deleteSkill(id: string): Observable<ISkillsResponse> {
        return this._httpClient.delete<ISkillsResponse>(`${this.apiURL}/${id}`);
      }      
     
}

