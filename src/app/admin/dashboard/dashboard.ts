import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutService } from '../../core/services/about.service';
import { IAbout } from '../../core/models/about.model';
import { DatePipe } from '@angular/common';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact.service';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})  
export class Dashboard implements OnInit{
  about: IAbout | null = null;

  totalMessages = 0;
  unreadCount = 0;
  recentMessages: IContact[] = [];

  links = [
    { label: 'Add Project', path: '/admin/projects' },
    { label: 'Add Skill',   path: '/admin/skills' },
    { label: 'Edit About',  path: '/admin/about' },
    { label: 'View Inbox',  path: '/admin/messages' },
  ];

  constructor(private _aboutService: AboutService,private _contactService: ContactService, private _cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.loadAbout();
    this.loadMessages();
  }

  loadAbout(): void {
    this._aboutService.getAbout().subscribe((res) => {
      this.about = res.allabouts[0] ?? null;
      this._cdr.detectChanges();
    });
  }

  loadMessages(): void {
    this._contactService.getContacts().subscribe({
      next: (res) => {
        const all = res.allContacts; 
        this.totalMessages = all.length;
        this.unreadCount = all.filter((c) => c.status === 'unread').length;
        this.recentMessages = [...all]
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .slice(0, 3);
        this._cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load messages', err),
    });
  }

}
