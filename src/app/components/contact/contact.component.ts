import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from '../../service/contact.service';
import {Contact} from '../../model/contact.model';
import {ReminderService} from '../../service/reminder.service';
import {Reminder} from '../../model/reminder.model';
import {Router} from '@angular/router';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  DELETE_CONTACT_QUERY_MODAL,
  DELETE_CONTACT_CONFIRMATION_MODAL,
  SAVE_CONTACT_MODAL,
  UNSAVED_CHANGES_WARNING_MODAL
} from '../confirmation-modal/confirmation-modal.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('contactForm') form;
  contactList: Contact[];
  selectedContact: Contact;
  selectedContactReminders: Reminder[];
  searchTerm: string;

  constructor(private contactService: ContactService,
              private reminderService: ReminderService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.initSelectedContact();
    this.loadAllContacts();
  }

  initSelectedContact() {
    this.selectedContact = new Contact(null, null, null, null, null, null, null, null, null);
  }

  loadAllContacts() {
    this.contactService.getAllContacts()
      .subscribe(contacts => this.contactList = contacts);
  }

  selectContact(contact) {
    this.selectedContact = contact;
    this.reminderService.getRemindersForContact(contact).subscribe(reminders => this.selectedContactReminders = reminders);
  }

  deleteContact() {
    this.openModal(DELETE_CONTACT_QUERY_MODAL).result.then(() => {
      this.contactService.deleteContact(this.selectedContact).subscribe(() => {
        this.loadAllContacts();
        this.form.resetForm();
        this.openModal(DELETE_CONTACT_CONFIRMATION_MODAL);
      });
    });
  }

  saveContact() {
    let observable = null;
    const index = this.contactList.indexOf(this.selectedContact);
    if (index !== -1) {
      observable = this.contactService.updateContact(this.selectedContact);
    } else {
      observable = this.contactService.saveContact(this.selectedContact);
    }
    observable.subscribe(() => {
      this.openModal(SAVE_CONTACT_MODAL);
      this.loadAllContacts();
    });
  }

  newContact() {
    if (this.form.dirty) {
      this.openModal(UNSAVED_CHANGES_WARNING_MODAL).result.then(() => {
        this.initSelectedContact();
        this.form.resetForm();
      });
    } else {
      this.initSelectedContact();
      this.form.resetForm();
    }
  }

  selectReminder(reminder) {
    this.router.navigate(['/reminders/' + reminder.id]);
  }

  addNewReminder(contactId) {
    this.router.navigate(['/new-reminder/' + contactId]);
  }

  openModal(data) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.data = data;
    return modalRef;
  }

}
