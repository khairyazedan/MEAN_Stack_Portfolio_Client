import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IAbout, IAboutResponse, IUpdateAbout } from '../models/about.model';
import { Observable } from 'rxjs';

@Service()
export class AboutService {
  private _http: HttpClient = inject(HttpClient);
  private apiURL = 'http://localhost:3000/about';

  getAbout(): Observable<IAboutResponse> {
    return this._http.get<IAboutResponse>(this.apiURL);
  }

  saveAbout(aboutData : FormData){
    return this._http.post(this.apiURL, aboutData);
  }

  updateAbout(id: string, aboutData: FormData) {
    return this._http.put(this.apiURL + '/' + id, aboutData);
  }
}
