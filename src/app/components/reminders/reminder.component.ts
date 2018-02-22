import {Component, OnInit} from '@angular/core';
import {Reminder} from '../../model/reminder.model';
import {ReminderService} from '../../service/reminder.service';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../../service/contact.service';
import {ReminderType} from '../../model/reminder-type.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  allContacts: Contact[];
  reminderTypes: ReminderType[];
  allReminders: Reminder[];
  selectedReminder: Reminder;
  searchTerm: string;

  constructor(private reminderService: ReminderService,
              private contactService: ContactService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const contactId = +this.route.snapshot.paramMap.get('contactId');

    if (!id) {
      this.initialiseReminder();
    } else {
      this.loadReminderFromId(id);
    }
    if (contactId) {
      this.initialiseReminderWithContact(contactId);
    }
    this.loadAllReminders();
    this.loadAllReminderTypes();
    this.loadAllContacts();
  }

  selectReminder(reminder: Reminder) {
    this.selectedReminder = reminder;
  }

  equals(com1, com2) {
    return com1 && com2 && com1.id === com2.id;
  }

  newReminder() {
    this.selectedReminder = new Reminder(null, null, null, null, null, null, null);
  }

  saveOrUpdateReminder() {
    this.reminderService.saveOrUpdateReminder(this.selectedReminder).subscribe(reminder => {
      this.selectedReminder = reminder;
      this.loadAllReminders();
    });
  }

  deleteReminder() {
    this.reminderService.deleteReminder(this.selectedReminder).subscribe(() => {
      this.loadAllReminders();
      this.initialiseReminder();
    });
  }

  loadAllContacts() {
    this.reminderService.getReminderTypes().subscribe(types => this.reminderTypes = types);
  }

  loadAllReminders() {
    this.reminderService.getAllReminders().subscribe(messages => this.allReminders = messages);
  }

  loadAllReminderTypes() {
    this.contactService.getAllContacts().subscribe(contacts => this.allContacts = contacts);
  }

  initialiseReminder() {
    this.selectedReminder = new Reminder(null, null, null, null, null, null, null);
  }

  initialiseReminderWithContact(contactId) {
    this.contactService.getById(contactId).subscribe(contact => this.selectedReminder.contact = contact);
  }

  loadReminderFromId(id) {
    this.reminderService.getById(id).subscribe(reminder => this.selectedReminder = reminder);
  }

}
