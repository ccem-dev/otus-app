import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {AlertService} from '../../../providers';
import {EventService} from '../../../providers/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit, OnDestroy {
  participantEvents = [];
  private eventList: Object;
  isLoading = false;
  private projects: any;
  eventListNotFound = false;


  constructor(private alertService: AlertService, private eventService: EventService, private router: Router, private ngZone: NgZone) {
    this.eventList = this.eventService.getEventComponents();
  }

  ngOnInit() {
    const ownerId = this.eventService.getOwner();
    if (ownerId) {
      this.isLoading = true;
      this.eventService.getParticipantEvents(ownerId).subscribe(response => {
        if (response['data']) {
          this.participantEvents = response['data'].eventList;
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
