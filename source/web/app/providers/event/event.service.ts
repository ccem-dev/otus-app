import { Injectable } from '@angular/core';
import {EventClientService} from '../rest/event/event-client.service';

@Injectable()
export class EventService {

  constructor(private eventClientService: EventClientService) {
      }

  getParticipantEvents(ownerRn: String) {
     return this.eventClientService.getEvents(ownerRn);
  }

  accomplishEvent(eventId : string) {
     return this.eventClientService.accomplishEvent(eventId);
  }

  public getOwner() {
    return window.sessionStorage.getItem('ownerRn');
  }

  public setOwner(ownerRn: string) {
    window.sessionStorage.setItem('ownerRn', ownerRn);
  }
}
