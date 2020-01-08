import {Component, NgZone, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService, EventService} from '../../providers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Otus Randomization';
  private action: string;

  constructor(private router: Router, private ngZone: NgZone, private authenticationService: AuthenticationService, private service: EventService) {
    this.ngZone.run(() => this.router.navigate(['dashboard/tasks'])).then();
  }

  ngOnInit() {
    this.service.setOwner(this.authenticationService.currentUserValue.recruitmentNumber);
    this.ngZone.run(() => this.router.navigate(['dashboard/tasks'])).then();
  }

}
