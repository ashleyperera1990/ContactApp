import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ContactComponent} from './components/contact/contact.component';
import {ReminderComponent} from './components/reminders/reminder.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {ContactService} from './service/contact.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDBService} from './in-memory-db-service';
import {ReminderService} from './service/reminder.service';
import {ContactFilterPipe} from './filter/contact-filter.pipe';
import {ReminderFilterPipe} from './filter/reminder-filter.pipe';

const appRoutes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'contacts', component: ContactComponent},
  {path: 'reminders', component: ReminderComponent},
  {path: 'reminders/:id', component: ReminderComponent},
  {path: 'new-reminder/:contactId', component: ReminderComponent},
  {path: '**', component: ContactComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ReminderComponent,
    NavigationComponent,
    ContactFilterPipe,
    ReminderFilterPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDBService),
    FormsModule
  ],
  providers: [
    ContactService,
    ReminderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
