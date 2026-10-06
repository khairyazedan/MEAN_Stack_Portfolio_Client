import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAbout } from '../../core/models/about.model';
import { AboutService } from '../../core/services/about.service';

@Component({
  imports: [RouterLink],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnInit {
  about: IAbout | null = null;
 
  get bioParagraphs(): string[] {
    return (this.about?.bio ?? '')
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  constructor( private _aboutService: AboutService, private _cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadAbout();
  }

  loadAbout(): void {
    this._aboutService.getAbout().subscribe((res) => {
      this.about = res.allabouts[0] ?? null;
      this._cdr.detectChanges();
    });
  }
  }


   