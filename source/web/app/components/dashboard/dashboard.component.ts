import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../providers';
import {OwnerService} from "../../shared/owner/owner.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Otus Randomization';
  private action: string;

  constructor(private ownerService: OwnerService,private router: Router, private ngZone: NgZone, private authenticationService: AuthenticationService) {
    this.ngZone.run(() => this.router.navigate(['dashboard/tasks'])).then();
  }

  ngOnInit() {
    this.ownerService.setOwner(this.authenticationService.currentUserValue.recruitmentNumber);
    this.ngZone.run(() => this.router.navigate(['dashboard/tasks'])).then();
  }

}
