import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact.service';
  
@Component({
  imports: [DatePipe],
  selector: 'app-messages-inbox',
  styleUrl: './messages-inbox.css',
  templateUrl: './messages-inbox.html',
})
export class MessagesInbox  implements OnInit{
  contacts: IContact[] = [];
  selected: IContact | null = null;

  constructor(
    private _contactService: ContactService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._contactService.getContacts().subscribe((res) => {
      this.contacts = res.allContacts;   // matches your route's key
      this._cdr.detectChanges();
    });
  }

  get unreadCount(): number {
    return this.contacts.filter((c) => c.status === 'unread').length;
  }

  // click a message in the list
  openMessage(contact: IContact): void {
    this.selected = contact;

    // only unread -> read (don't downgrade "replied" or "archived")
    if (contact.status === 'unread') {
      this.changeStatus(contact, 'read');
    }
  }

  markUnread(): void {
    if (this.selected) {
      this.changeStatus(this.selected, 'unread');
    }
  }

  changeStatus(contact: IContact, status: IContact['status']): void {
    this._contactService.updateStatus(contact._id, status).subscribe((res) => {
      contact.status = res.contact.status;  
      this._cdr.detectChanges();
    });
  }

  deleteMessage(): void {
    if (!this.selected) return; 
    const id = this.selected._id;

    this._contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter((c) => c._id !== id);
      this.selected = null;
      this._cdr.detectChanges();
    });
  }

  closeMessage(): void {
    this.selected = null;
  }
}
