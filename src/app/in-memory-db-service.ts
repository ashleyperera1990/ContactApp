import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Contact} from './contact/contact.model';
import {Reminder} from './reminders/reminder.model';
import {ReminderType} from './reminders/reminder-type.model';

export class InMemoryDBService implements InMemoryDbService {
  createDb() {
    const contact1 = new Contact(
      1,
      'James',
      'Bond',
      'james.bond007@mi6.gov.uk',
      '85 Albert Embankment',
      'Lambeth',
      'London',
      null,
      'SE1 7TP'
    );

    const contact2 = new Contact(
      2,
      'Jason',
      'Bourne',
      'jason.bourne@treadstone.cia.com',
      'CIA',
      '',
      'Langley',
      'Virginia',
      'SO123445'
    );
    const contacts = [contact1, contact2];

    const reminderType1 = new ReminderType(1, 'Email');
    const reminderType2 = new ReminderType(2, 'Call');
    const reminderType3 = new ReminderType(3, 'Meeting');

    const reminderTypes = [reminderType1, reminderType2, reminderType3];

    const reminders = [
      new Reminder(
        1,
        1,
        contact1,
        'Call about mission',
        reminderType2,
        '20/02/2018',
        'Call to discuss the outline of the mission'),
      new Reminder(
        2,
        1,
        contact1,
        'Meet about the upcoming mission',
        reminderType3,
        '28/02/2018',
        'Briefing for the upcoming mission is at 09:00 on the 28th, do not be late!'
      ),
      new Reminder(
        3,
        2,
        contact2,
        'Get to france',
        reminderType3,
        '230/03/2018',
        'I can help you find out who you are'
      )
    ];
    return {contacts, reminders, reminderTypes};
  }
}