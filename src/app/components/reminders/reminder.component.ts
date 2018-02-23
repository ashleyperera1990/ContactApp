import {Component, OnInit, ViewChild} from '@angular/core';
import {Reminder} from '../../model/reminder.model';
import {ReminderService} from '../../service/reminder.service';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../../service/contact.service';
import {ReminderType} from '../../model/reminder-type.model';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  DELETE_REMINDER_CONFIRMATION_MODAL, DELETE_REMINDER_QUERY_MODAL, SAVE_REMINDER_MODAL,
  UNSAVED_CHANGES_WARNING_MODAL
} from '../confirmation-modal/confirmation-modal.data';
import {DateFormatterService} from '../../service/date-formatter.service';

@Component({
  selector: 'app-messages',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  @ViewChild('reminderForm') form;

  allContacts: Contact[];
  reminderTypes: ReminderType[];
  allReminders: Reminder[];
  selectedReminder: Reminder;
  searchTerm: string;

  dateModel: NgbDateStruct;

  constructor(private reminderService: ReminderService,
              private contactService: ContactService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              public dateFormatter: DateFormatterService) {
  }

  ngOnInit() {
    this.initialiseReminder();
    this.loadRefData();
    const id = +this.route.snapshot.paramMap.get('id');
    const contactId = +this.route.snapshot.paramMap.get('contactId');
    if (id) {
      this.reminderService.getById(id)
        .subscribe(reminder => this.selectedReminder = reminder);
    }
    if (contactId) {
      this.initialiseReminderWithContact(contactId)
        .subscribe(contact => this.selectedReminder.contact = contact);
    }
    this.loadAllReminders();
  }

  selectReminder(reminder: Reminder) {
    this.selectedReminder = reminder;
    this.dateModel = this.dateFormatter.parse(this.selectedReminder.date.toLocaleString());
  }

  newReminder() {
    this.openModal(UNSAVED_CHANGES_WARNING_MODAL).result.then(() => {
      this.initialiseReminder();
      this.form.resetForm();
    });
  }

  setReminderDate() {
    const convertedDate = this.dateFormatter.format(this.dateModel);
    this.selectedReminder.date = new Date(convertedDate);
  }

  saveOrUpdateReminder() {
    this.setReminderDate();
    this.reminderService.saveOrUpdateReminder(this.selectedReminder).subscribe(() => {
      this.loadAllReminders();
      this.openModal(SAVE_REMINDER_MODAL);
    });
  }

  deleteReminder() {
    this.openModal(DELETE_REMINDER_QUERY_MODAL)
      .result.then(() => {
        this.reminderService.deleteReminder(this.selectedReminder).subscribe(() => {
        this.loadAllReminders();
        this.initialiseReminder();
        this.form.resetForm();
        this.openModal(DELETE_REMINDER_CONFIRMATION_MODAL);
      });
    });
  }

  loadRefData() {
    this.loadAllContacts().subscribe(contacts => {
      this.allContacts = contacts;
      this.loadAllReminderTypes().subscribe(types => this.reminderTypes = types);
    });
  }

  loadAllReminders() {
    this.reminderService.getAllReminders().subscribe(messages => this.allReminders = messages);
  }

  loadAllContacts() {
    return this.contactService.getAllContacts();
  }

  loadAllReminderTypes() {
    return this.reminderService.getReminderTypes();
  }

  initialiseReminder() {
    this.selectedReminder = new Reminder(null, null, null, null, null, null, null);
  }

  initialiseReminderWithContact(contactId) {
    return this.contactService.getById(contactId);
  }

  openModal(data) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.data = data;
    return modalRef;
  }

  equals(com1, com2) {
    return com1 && com2 && com1.id === com2.id;
  }
}
