export interface IContact {
  _id: string;
  senderName: string;
  senderEmail: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'archived' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export type ICreateContact = Pick<IContact, 'senderName' | 'senderEmail' | 'subject' | 'message'>;
export type IUpdateContactStatus = Pick<IContact, 'status'>;

export interface IContactsResponse {
  message: string;
  allContacts: IContact[];
}

export interface IContactResponse {
  message: string;
  contact: IContact;
}