import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {EventI} from '../event.interface';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'activity-autofill-event',
  templateUrl: './activity-autofill-event.component.html',
  styleUrls: ['./activity-autofill-event.component.css'],
})

export class ActivityAutofillEventComponent implements EventI, OnInit{
  @Input() data: any;
  private previewAddress: string;
  private appAddress: string;


  constructor(public cookieService: CookieService) {
    this.previewAddress = cookieService.get('preview-address') || 'http://143.54.83.45:51001';
    this.appAddress = cookieService.get('app-address') || 'http://143.54.83.45:8081';
  }

  callPreview() {
    window.location.href = this.previewAddress+'/#/?activity='+this.data.activityId+'&token=123&callback='+this.appAddress ;
  }

  ngOnInit(): void {
    this.data.activityId = 'survey.json';
  }
}
