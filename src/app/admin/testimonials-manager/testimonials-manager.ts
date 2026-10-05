import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITestimonial } from '../../core/models/testimonial.model';
import { TestimonialService } from '../../core/services/testimonial.service';

@Component({
  imports: [],
  selector: 'app-testimonials-manager',
  styleUrl: './testimonials-manager.css',
  templateUrl: './testimonials-manager.html',
})
export class TestimonialsManager implements OnInit {
  testimonials : ITestimonial [] = [];
   selected: ITestimonial | null = null;

  constructor(private _testimonialServic: TestimonialService, private _cdr:ChangeDetectorRef){};

  ngOnInit(): void {
    this._testimonialServic.getAllTestimonials().subscribe((res)=>{
      this.testimonials = res.allTestimonials;
      this._cdr.detectChanges();
    })
  }

  get approvedCount(): number {
    return this.testimonials.filter((c) => c.isApproved === true).length;
  }

  changeStatus(testimonial: ITestimonial, isApproved: ITestimonial['isApproved']): void {
      this._testimonialServic.updateTestimonials(testimonial._id, isApproved).subscribe((res) => {
        testimonial.isApproved = res.testimonial.isApproved;
        this._cdr.detectChanges();
      });
    }

    deleteMessage(testimonial: ITestimonial): void {
      if (!confirm(`Delete the testimonial from ${testimonial.authorName}?`)) return;
      this._testimonialServic.deleteTestimonials(testimonial._id).subscribe(() => {
        this.testimonials = this.testimonials.filter((t) => t._id !== testimonial._id);
        this.selected = null;
        this._cdr.detectChanges();
      });
    }


}
  