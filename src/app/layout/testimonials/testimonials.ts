import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreateTestimonial, ITestimonial } from '../../core/models/testimonial.model';
import { TestimonialService } from '../../core/services/testimonial.service';

@Component({
  imports: [ReactiveFormsModule],   // this was empty
  selector: 'app-testimonials',
  styleUrl: './testimonials.css',
  templateUrl: './testimonials.html',
})
export class Testimonials implements OnInit {
  testimonials: ITestimonial[] = [];   // the template loops over this

  testimonialForm = new FormGroup({
    authorName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    authorTitle: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    company: new FormControl('', { nonNullable: true }),
    relationship: new FormControl('', { nonNullable: true }),
    authorAvatar: new FormControl('', { nonNullable: true }),
    rating: new FormControl<number | null>(null),
    content: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  isSending = false;
  sent = false;
  errorMessage = '';

  constructor(
    private _testimonialService: TestimonialService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  sendTestimonial(): void {
    if (this.testimonialForm.invalid) {
      this.testimonialForm.markAllAsTouched();
      return;
    }

    const value = this.testimonialForm.getRawValue();

    const data: ICreateTestimonial = {
      authorName: value.authorName.trim(),
      authorTitle: value.authorTitle.trim(),
      content: value.content.trim(),
      company: value.company.trim() || undefined,
      relationship: value.relationship.trim() || undefined,
      authorAvatar: value.authorAvatar.trim() || undefined,
      rating: value.rating ?? undefined,
    };

    this.isSending = true;
    this.errorMessage = '';

    this._testimonialService.addTestimonials(data).subscribe({
      next: () => {
        this.isSending = false;
        this.sent = true;
        this.testimonialForm.reset();
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.isSending = false;
        this.errorMessage = err?.error?.message ?? 'Failed to send. Please try again.';
        this._cdr.detectChanges();
      },
    });
  }
  loadTestimonials(): void {
    this._testimonialService.getApprovedTestimonials().subscribe((res) => {
      this.testimonials = res.allTestimonials
        .filter((a) => a.isApproved === true)
        .slice(0, 6);
      this._cdr.detectChanges();
    });
  }
  // getApprovedTestimonials

  sendAnother(): void {
    this.sent = false;
  }
}