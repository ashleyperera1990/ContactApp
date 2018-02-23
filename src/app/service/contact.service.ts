import {Injectable} from '@angular/core';
import {Contact} from '../model/contact.model';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {HTTP_HEADERS} from '../app-http.config';
import {DateFormatterService} from './date-formatter.service';

@Injectable()
export class ContactService {

  private contactsUrl = 'api/contacts';

  contactList: Contact[];

  constructor(private http: HttpClient,
              private dateFormatter: DateFormatterService) {
  }

  getById(id): Observable<Contact> {
    return this.http.get<Contact>(this.contactsUrl + '/' + id);
  }

  getAllContacts(): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.contactsUrl);
  }

  deleteContact(contact): Observable<Contact[]> {
    return this.http.delete<Contact[]>(this.contactsUrl + '/' + contact.id, HTTP_HEADERS);
  }

  saveContact(contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, HTTP_HEADERS);
  }

  updateContact(contact): Observable<Contact> {
    return this.http.put<Contact>(this.contactsUrl, contact, HTTP_HEADERS);
  }

}
