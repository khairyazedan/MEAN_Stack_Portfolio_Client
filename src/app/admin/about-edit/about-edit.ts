import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAbout, IAboutResponse } from '../../core/models/about.model';
import { AboutService } from '../../core/services/about.service';

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
 
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-about-edit',
  styleUrl: './about-edit.css',
  templateUrl: './about-edit.html',
})
export class AboutEdit implements OnInit {
  private _aboutService = inject(AboutService);
  private _cdr = inject(ChangeDetectorRef);

  
  form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    title: new FormControl('', { nonNullable: true }),
    headLine: new FormControl('', { nonNullable: true }),
    bio: new FormControl('', { nonNullable: true }),
    resumeUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(/^$|^https?:\/\/.+/i)],
    }),
    avatarUrl: new FormControl('', { nonNullable: true }),
    social: new FormGroup({
      github: new FormControl('', { nonNullable: true }),
      linkedin: new FormControl('', { nonNullable: true }),
      twitter: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
    }),
  });

  // about: IAboutResponse[]=[];
  aboutId = ''; 
  selectedFile: File | null = null;

  
  isSaving = false;
  isUploading = false;
  isError = false;
  message = '';
  avatarError = '';

  ngOnInit(): void {
    this.loadAbout()
  }
  loadAbout(): void {
    this._aboutService.getAbout().subscribe({
      next: (res) => {
        const data = res.allabouts[0]; 
        if (data) {
          this.aboutId = data._id;
          this.patchForm(data);
        }
        this._cdr.detectChanges();
      },
      error: () => this.showMessage('Failed to load about data.', true),
    });
  }

  private patchForm(data: IAbout): void {
    // socialLinks is an array in the model, but the form uses named controls
    const link = (platform: string) =>
      data.socialLinks?.find((l) => l.platform.toLowerCase() === platform)?.url ?? '';

    this.form.patchValue({
      fullName: data.fullName ?? '',
      title: data.title ?? '',
      headLine: data.headLine ?? '',
      bio: data.bio ?? '',
      resumeUrl: data.resumeUrl ?? '',
      avatarUrl: data.avatarUrl ?? '',
      social: {
        github: link('github'),
        linkedin: link('linkedin'),
        twitter: link('twitter'),
        email: link('email'),
      },
    });
    this.form.markAsPristine();
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.avatarError = '';
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      this.avatarError = 'Only JPG, PNG or WebP images are allowed.';
      input.value = '';
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      this.avatarError = 'Image must be 2 MB or smaller.';
      input.value = '';
      return;
    }

    this.selectedFile = file;
    // Local preview only; the real file is sent in buildFormData()
    this.form.controls.avatarUrl.setValue(URL.createObjectURL(file));
    this.form.markAsDirty();
  }

  removeAvatar(input: HTMLInputElement): void {
    input.value = '';
    this.selectedFile = null;
    this.form.controls.avatarUrl.setValue('');
    this.form.markAsDirty();
  }

  private buildFormData(): FormData {
    const value = this.form.getRawValue();
    const formData = new FormData();

    formData.append('fullName',value.fullName);
    formData.append('title',value.title);
    formData.append('headLine',value.headLine);
    formData.append('bio',value.bio);
    formData.append('resumeUrl',value.resumeUrl);

    // Convert the named social controls back to the array the API expects
    const socialLinks = Object.entries(value.social)
      .filter(([, url]) => !!url)
      .map(([platform, url]) => ({ platform, url }));
    formData.append('socialLinks', JSON.stringify(socialLinks));

    if (this.selectedFile) {
      formData.append('avatarUrl', this.selectedFile);
    } else {
      formData.append('avatarUrl',value.avatarUrl);
    }
    return formData;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.isUploading = !!this.selectedFile;
    this.message = '';

    this._aboutService.saveAbout(this.buildFormData()).subscribe({
      next: () => {
        this.isSaving = this.isUploading = false;
        this.selectedFile = null;
        this.form.markAsPristine();
        this.showMessage('About saved successfully.', false);
        this._cdr.detectChanges();
      },
      error: () => {
        this.isSaving = this.isUploading = false;
        this.showMessage('Failed to save. Please try again.', true);
        this._cdr.detectChanges();
      },
    });
  }

  private showMessage(text: string, isError: boolean): void {
    this.message = text;
    this.isError = isError;
    setTimeout(() => {
      this.message = '';
      this._cdr.detectChanges();
    }, 3000);
  }
}