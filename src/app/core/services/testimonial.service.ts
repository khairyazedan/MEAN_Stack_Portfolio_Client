import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateTestimonial, ITestimonial, ITestimonialResponse, ITestimonialsResponse } from '../models/testimonial.model';
 
@Service() 
export class TestimonialService {
    private _httpClient: HttpClient = inject(HttpClient);
    private apiURL = 'http://localhost:3000/testimonials';

    // public portfolio: approved only
getApprovedTestimonials(): Observable<ITestimonialsResponse> {
  return this._httpClient.get<ITestimonialsResponse>(this.apiURL);
}

// admin: everything, including pending
getAllTestimonials(): Observable<ITestimonialsResponse> {
  return this._httpClient.get<ITestimonialsResponse>(`${this.apiURL}/all`);
}

    // getTestimonials(): Observable <ITestimonialsResponse>{
    //     return this._httpClient.get<ITestimonialsResponse>(this.apiURL);
    // }

    addTestimonials(data: ICreateTestimonial) : Observable<ITestimonialResponse> {
        return this._httpClient.post<ITestimonialResponse>(this.apiURL, data);
    }
    

    updateTestimonials(id: string, isApproved: ITestimonial['isApproved']) : Observable<ITestimonialResponse>  {
        return this._httpClient.patch<ITestimonialResponse>(`${this.apiURL}/${id}/isApproved`, { isApproved });
    }

    deleteTestimonials(id: string) : Observable<ITestimonialResponse>{
        return this._httpClient.delete<ITestimonialResponse>(`${this.apiURL}/${id}`);
    }

    
}
 