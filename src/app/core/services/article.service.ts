import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IArticle, IArticlesResponse } from '../models/article.model';
import { Observable } from 'rxjs';

@Service()  
export class ArticleService { 
  private _http: HttpClient = inject(HttpClient);
  private apiURL = 'http://localhost:3000/article';

  getArticles(): Observable<IArticlesResponse> {
    return this._http.get<IArticlesResponse>(this.apiURL);
  }


  addArticle(articleData: FormData) {
    return this._http.post(this.apiURL, articleData);
  }

  updateArticle(id: string, articleData: FormData) {
    return this._http.put(this.apiURL + '/' + id, articleData);
  }

  deleteArticle(id: string) {
    return this._http.delete(this.apiURL + '/' + id);
  }
}
