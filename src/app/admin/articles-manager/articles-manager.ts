import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../core/services/article.service';
import { IArticle } from '../../core/models/article.model';

@Component({ 
  imports: [ReactiveFormsModule],   
  selector: 'app-articles-manager',
  styleUrl: './articles-manager.css',
  templateUrl: './articles-manager.html',
})
export class ArticlesManager implements OnInit {
  articles: IArticle[] = []; 
  showForm = false;          
  filter = 'All';   
  editingId = ''; 
  editingPublishedAt = ''; 
  articleForm : FormGroup = new FormGroup({
    title: new FormControl(''),
    slug: new FormControl(''),
    summary: new FormControl(''),
    content: new FormControl(''),
    coverImage: new FormControl(null),
    tags: new FormControl(""),
    status: new FormControl('draft'),
    readingTimeMinutes: new FormControl(5),
  })

  constructor( private _articleService: ArticleService, private _cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadArticles();
  }

  
  loadArticles() {
    this._articleService.getArticles().subscribe((res) => {
      this.articles = res.allarticles;
      this._cdr.detectChanges();
    });
  }

  get visible(): IArticle[] {
    if (this.filter === 'All') return this.articles;
    return this.articles.filter((a) => a.status === this.filter.toLowerCase());
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  openNew() {
    this.editingId = '';
    this.editingPublishedAt = '';
    this.articleForm.reset({ status: 'draft', readingTimeMinutes: 5, tags: '' });
    this.showForm = true;
  }

  openEdit(article: IArticle) {
    this.editingId = article._id;
    this.editingPublishedAt = article.publishedAt ? String(article.publishedAt) : '';
    this.articleForm.reset({
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      content: article.content,
      coverImage: null,            
      tags: article.tags ? article.tags.join(', ') : '',
      status: article.status,
      readingTimeMinutes: article.readingTimeMinutes,
    });
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingId = '';
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.articleForm.patchValue({ coverImage: event.target.files[0] });
    } else {
      this.articleForm.patchValue({ coverImage: null });
    }
  }

  onSubmit() {
    let myFormData = new FormData();
    myFormData.append('title', this.articleForm.value.title);
    myFormData.append('slug', this.articleForm.value.slug);
    myFormData.append('summary', this.articleForm.value.summary);
    myFormData.append('content', this.articleForm.value.content);
    myFormData.append('tags', this.articleForm.value.tags);
    myFormData.append('status', this.articleForm.value.status);
    myFormData.append('readingTimeMinutes', this.articleForm.value.readingTimeMinutes);
    myFormData.append('publishedAt', this.editingPublishedAt || new Date().toISOString()); 
    if (this.articleForm.value.coverImage) {
      myFormData.append('coverImage', this.articleForm.value.coverImage);
    }
 
    this._articleService.addArticle(myFormData).subscribe(() => {
      console.log('Article added successfully');
      this.showForm = false;                                  
      this.articleForm.reset({ status: 'draft', readingTimeMinutes: 5, tags: '' });
      this.loadArticles();                                     
    });
  }

  deleteArticle(id: string) {
    if (!confirm('Delete this article?')) return;
 
    this._articleService.deleteArticle(id).subscribe(() => {
      console.log('Article deleted successfully');
      this.loadArticles();
    });
  }
}
  