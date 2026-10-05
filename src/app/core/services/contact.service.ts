import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IContact,
  IContactResponse,
  IContactsResponse,
  ICreateContact, 
} from '../models/contact.model';

@Service()
export class ContactService {
  private _http: HttpClient = inject(HttpClient);
  private apiURL = 'http://localhost:3000/contact';

  getContacts(): Observable<IContactsResponse> {
    return this._http.get<IContactsResponse>(this.apiURL);
  }

  sendContact(data: ICreateContact): Observable<IContactResponse> {
    return this._http.post<IContactResponse>(this.apiURL, data);
  }

  updateStatus(id: string, status: IContact['status']): Observable<IContactResponse> {
    return this._http.patch<IContactResponse>(`${this.apiURL}/${id}/status`, { status });
  }

  deleteContact(id: string): Observable<IContactResponse> {
    return this._http.delete<IContactResponse>(`${this.apiURL}/${id}`);
  }
}