import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule,
  MatToolbarModule, MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import {SanitizeHtmlPipe} from './utils/sanitize-html/sanitize-html.pipe';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {CreateAccountComponent} from './components/account/create-account/create-account.component';
import {EventService} from './providers';
import {EventsComponent} from './components/dashboard/tasks/events/events.component';
import {ActivityAutofillEventComponent} from './components/dashboard/tasks/events/activity/activity-autofill-event.component';
import {LoginComponent} from './components/account/login/login.component';
import {AppAlertComponent} from './components/alert/app-alert.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {TasksComponent} from './components/dashboard/tasks/tasks.component';
import {EventClientService} from './providers/rest/event-client.service';


@NgModule({
  declarations: [
    EventsComponent,
    ActivityAutofillEventComponent,
    AppComponent,
    LoginComponent,
    AppAlertComponent,
    DashboardComponent,
    ErrorPageComponent,
    SanitizeHtmlPipe,
    CreateAccountComponent,
    TasksComponent
  ],
  entryComponents: [
    ActivityAutofillEventComponent
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
    MatMenuModule,
    MatSidenavModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [
    EventService,
    EventClientService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
