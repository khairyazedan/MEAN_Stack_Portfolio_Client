import { ContactService } from '../../core/services/contact.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({ 
  imports: [ReactiveFormsModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
}) 
export class Contact  implements OnInit {
  contactForm = new FormGroup({
    senderName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    senderEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    subject: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  isSending = false;
  sent = false;
  errorMessage = '';

  constructor(
    private _contactService: ContactService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
   
  }


  sendMessage(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    this.errorMessage = '';

    this._contactService.sendContact(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.isSending = false;
        this.sent = true;
        this.contactForm.reset();
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.isSending = false;
        this.errorMessage = err?.error?.message ?? 'Failed to send. Please try again.';
        this._cdr.detectChanges();
      },
    });
  }

  sendAnother(): void {
    this.sent = false;
  }
}
 