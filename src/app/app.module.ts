import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { MessagesComponent } from './messages/messages.component';
import {RouterModule, Routes} from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactComponent },
  { path: 'messages',      component: MessagesComponent },
  { path: '**', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    MessagesComponent,
    NavigationComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
