import {Contact} from './contact.model';
import {ReminderType} from './reminder-type.model';

export class Reminder {

  constructor(public id: number,
              public contactId: number,
              public contact: Contact,
              public subject: string,
              public type: ReminderType,
              public date: Date,
              public message: string) {
  }

}
