import { Injectable } from '@angular/core';
import {ActivityAutofillEventComponent} from '../components/dashboard/tasks/events/activity/activity-autofill-event.component';
import {EventClientService} from './rest/event-client.service';

@Injectable()
export class EventService {

  constructor(private client: EventClientService) {
      }

  getEventComponents() {
    return {
      ActivityAutoFillEvent: ActivityAutofillEventComponent
    };
  }

  getParticipantEvents(ownerRn: String) {
     return this.client.getEvents(ownerRn);
  }

  public getOwner() {
    return window.sessionStorage.getItem('ownerRn');
  }

  public setOwner(ownerRn: string) {
    window.sessionStorage.setItem('ownerRn', ownerRn);
  }
}
