import { Component, OnInit } from '@angular/core';
import {ContactService} from './contact.service';
import {Contact} from './contact.model';
import {ReminderService} from '../reminders/reminder.service';
import {Reminder} from '../reminders/reminder.model';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactList: Contact[];
  selectedContact: Contact;
  selectedContactReminders: Reminder[];

  constructor(private contactService: ContactService,
              private reminderService: ReminderService,
              private router: Router) { }

  ngOnInit() {
    this.initSelectedContact();
    this.contactService.getAllContacts()
      .subscribe(contacts => this.contactList = contacts);
  }

  selectContact(contact) {
    this.selectedContact = contact;
    this.reminderService.getRemindersForContact(contact).subscribe(reminders => this.selectedContactReminders = reminders);
  }

  selectReminder(reminder) {
    this.router.navigate(['/reminders/' + reminder.id]);
  }

  addNewReminder(contactId) {
    this.router.navigate(['/new-reminder/' + contactId]);
  }

  deleteContact() {
    this.contactService.deleteContact(this.selectedContact);
  }

  saveContact() {
    this.contactService.saveContact(this.selectedContact)
      .subscribe(contacts => this.contactList = contacts);
  }

  initSelectedContact() {
    this.selectedContact = new Contact(null, null, null, null, null, null, null, null, null);
  }

}
