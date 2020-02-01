import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {EventI} from '../event.interface';
import {CookieService} from 'ngx-cookie-service';
import {AlertService} from '../../../../../providers/alert.service';

@Component({
  selector: 'activity-autofill-event',
  templateUrl: './activity-autofill-event.component.html',
  styleUrls: ['./activity-autofill-event.component.css'],
})

export class ActivityAutofillEventComponent implements EventI, OnInit {
  @Input() data: any;
  private previewAddress: string;
  private appAddress: string;
  private translatedStatus = {
    ACCOMPLISHED: {translation: 'Realizado', style: {color: '#1B9A59'}},
    PENDING: {translation: ' Pendente', style: {color: '#bfbe00'}}
  };


  constructor(public cookieService: CookieService, public alertService: AlertService) {
    this.previewAddress = cookieService.get('preview-address');
    this.appAddress = cookieService.get('app-address');
  }

  callPreview() {
    if (!this.previewAddress || !this.appAddress || !this.data.activityId) {
      this.alertService.error('Event Unavailable');
    } else {
      window.location.href = this.previewAddress + '/#/?activity=' + this.data.activityId + '&token=123&callback=' + this.appAddress ;
    }
  }

  ngOnInit(): void {}
}
