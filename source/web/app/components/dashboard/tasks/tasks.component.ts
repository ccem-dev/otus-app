import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '../../../providers/event/event.service';
import {Router} from '@angular/router';
import {events} from './events/events';
import {OwnerService} from '../../../shared/owner/owner.service';
import {AlertService} from '../../../providers';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit, OnDestroy {
  participantEvents = [];
  isLoading = false;
  eventListNotFound = false;
  private eventList: Object;
  private projects: any;

  constructor(private ownerService: OwnerService, private alertService: AlertService, private eventService: EventService, private router: Router, private ngZone: NgZone) {
    this.eventList = events;
  }

  ngOnInit() {
    const ownerId = this.ownerService.getOwner();
    if (ownerId) {
      this.isLoading = true;
      this.eventService.getParticipantEvents(ownerId).subscribe(response => {
        if (response['data']) {
          this.participantEvents = response['data'];
        }
        this.isLoading = false;
      }, error => {
        this.eventListNotFound = true;
        this.isLoading = false;
      });
    } else {
      this.ngZone.run(() => this.router.navigate(['/login'])).then();
    }
  }

  ngOnDestroy() {
  }

}
