import {Contact} from '../contact/contact.model';
import {ReminderType} from './reminder-type.model';

export class Reminder {

  constructor(public id: number,
              public contactId: number,
              public contact: Contact,
              public subject: string,
              public type: ReminderType,
              public date: string,
              public message: string) {
  }

}
