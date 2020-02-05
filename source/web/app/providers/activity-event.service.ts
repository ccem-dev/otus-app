import { Injectable } from '@angular/core';
import {ActivityClientService} from "./rest/activity-client.service";

@Injectable()
export class ActivityEventService {

  constructor(private activityClientService: ActivityClientService) {}


  getActivity(activityId: String) {
    return this.activityClientService.getActivity(activityId);
  }
}
