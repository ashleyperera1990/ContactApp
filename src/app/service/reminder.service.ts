import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reminder} from '../model/reminder.model';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../model/contact.model';
import {ReminderType} from '../model/reminder-type.model';
import {tap} from 'rxjs/operators';
import {HTTP_HEADERS} from '../app-http.config';
import {DateFormatterService} from './date-formatter.service';

@Injectable()
export class ReminderService {

  private remindersUrl = 'api/reminders';
  private reminderTypesUrl = 'api/reminderTypes';

  remindersList: Reminder[];

  constructor(private http: HttpClient,
              private dateFormatter: DateFormatterService) {
  }

  getById(id): Observable<Reminder> {
    return this.http.get<Reminder>(this.remindersUrl + '/' + id);
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
    return this.http.get<ReminderType[]>(this.reminderTypesUrl);
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
    return this.http.post<Reminder>(this.remindersUrl, reminder, HTTP_HEADERS);
  }

  updateReminder(reminder: Reminder): Observable<Reminder> {

    return this.http.put<Reminder>(this.remindersUrl, reminder, HTTP_HEADERS);
  }

  deleteReminder(reminder: Reminder): Observable<Reminder> {
    const url = this.remindersUrl + '/' + reminder.id;
    return this.http.delete<Reminder>(url, HTTP_HEADERS);
  }
}
