import {Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContactService {

  private contactsUrl = 'api/contacts';

  contactList: Contact[];

  constructor(private http: HttpClient) {
  }

  getById(id): Observable<Contact> {
    return this.http.get<Contact[]>(this.contactsUrl + '/' + id);
  }

  getAllContacts(): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.contactsUrl);
  }

  deleteContact(contact): Contact[] {
    const index = this.contactList.indexOf(contact);
    if (index !== -1) {
      this.contactList.splice(index, 1);
    }
    return this.contactList;
  }

  saveContact(contact): Observable<Contact[]> {
    const index = this.contactList.indexOf(contact);
    if (index !== -1) {
      this.contactList[index] = contact;
    } else {
      this.contactList.push(contact);
    }
    return of(this.contactList);
  }

}
