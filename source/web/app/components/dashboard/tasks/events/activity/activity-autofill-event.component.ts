import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {EventI} from '../event.interface';
import {CookieService} from 'ngx-cookie-service';
import {AlertService} from '../../../../../providers/alert.service';
import {AuthenticationService} from "../../../../../providers/account/authentication/authentication.service";
import {ActivityEventService} from "../../../../../providers/activity-event.service";
import {EventService} from "../../../../../providers";

@Component({
  selector: 'activity-autofill-event',
  templateUrl: './activity-autofill-event.component.html',
  styleUrls: ['./activity-autofill-event.component.css'],
})

export class ActivityAutofillEventComponent implements EventI, OnInit {
  @Input() data: any;
  private previewAddress: string;
  private appAddress: string;
  translatedStatus = {
    ACCOMPLISHED: {translation: 'Realizado', style: {color: '#1B9A59'}},
    PENDING: {translation: ' Pendente', style: {color: '#bfbe00'}}
  };


  constructor(public cookieService: CookieService, public eventService: EventService,public alertService: AlertService, public authenticationService: AuthenticationService, public activityEventService: ActivityEventService) {
    this.previewAddress = cookieService.get('PREVIEW_ADDRESS');
  }

  callPreview() {
    if (!this.previewAddress || !this.data.activityId) {
      this.alertService.error('Event Unavailable');
    } else {
      localStorage.setItem(this.data._id, "true");
      let callback = location.href;
      callback = callback.replace("#","HASHTAG");
      window.location.href = this.previewAddress + '/#/?activity=' + this.data.activityId + '&token=' + this.authenticationService.authToken + '&callback=' + callback ;
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem(this.data._id)) {
      this.activityEventService.getActivity(this.data.activityId).subscribe(result => {
        if (result.data.statusHistory[result.data.statusHistory.length - 1].name === "FINALIZED") {
          this.eventService.accomplishEvent(this.data._id).subscribe(result => {
            this.data.status = 'ACCOMPLISHED';
            localStorage.removeItem(this.data._id);
          })
        }
      })
    }
  }
}
