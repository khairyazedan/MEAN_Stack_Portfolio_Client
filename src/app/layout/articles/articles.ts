import { DatePipe } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { ChangeDetectorRef, Component} from '@angular/core';

import { IArticle } from '../../core/models/article.model';
import { ArticleService } from '../../core/services/article.service';

   
@Component({ 
  imports: [DatePipe,ReactiveFormsModule], 
  selector: 'app-articles',
  styleUrl: './articles.css',
  templateUrl: './articles.html',
}) 
export class Articles {
  articles: IArticle[] = [];

  constructor(
      private _articleService: ArticleService,
      private _cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
      this.loadArticles();
    }
  
    loadArticles(): void {
      this._articleService.getArticles().subscribe((res) => {
        this.articles = res.allarticles
          .filter((a) => a.status === 'published')
          .slice(0, 3);
        this._cdr.detectChanges();
      });
    }

    selectedArticle: IArticle | null = null;

openArticle(article: IArticle): void {
  this.selectedArticle = article;
  document.body.style.overflow = 'hidden';
}

closeArticle(): void {
  this.selectedArticle = null;
  document.body.style.overflow = '';
}
 }
