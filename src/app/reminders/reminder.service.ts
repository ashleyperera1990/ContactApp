import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reminder} from './reminder.model';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../contact/contact.model';
import {ReminderType} from './reminder-type.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class ReminderService {

  private remindersUrl = 'api/reminders';
  private reminderTypesUrl = 'api/reminderTypes';

  remindersList: Reminder[];

  constructor(private http: HttpClient) {
  }

  getById(id): Observable<Reminder> {
    return this.http.get<Reminder[]>(this.remindersUrl + '/' + id);
  }

  getAllReminders(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(this.remindersUrl)
      .pipe(tap((reminders: Reminder[]) => this.remindersList = reminders));
  }

  getRemindersForContact(contact: Contact): Observable<Reminder[]> {
    const url = this.remindersUrl + '/?contactId=' + contact.id;
    return this.http.get<Reminder[]>(url);
  }

  getReminderTypes(): Observable<ReminderType[]> {
    return this.http.get<Reminder[]>(this.reminderTypesUrl);
  }

  saveOrUpdateReminder(reminder: Reminder): Observable<Reminder> {

    const index = this.remindersList.indexOf(reminder);
    if (index === -1) {
      return this.addReminder(reminder);
    } else {
      return this.updateReminder(reminder);
    }
  }

  addReminder(reminder: Reminder): Observable<Reminder> {
    reminder.contactId = reminder.contact.id;
    return this.http.post(this.remindersUrl, reminder);
  }

  updateReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.post(this.remindersUrl, reminder);
  }

  deleteReminder(reminder: Reminder): Observable<Reminder> {
    const url = this.remindersUrl + '/' + reminder.id;
    return this.http.delete(url);
  }
}
