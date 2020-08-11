import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {User} from './model';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';
import {AlertService, AuthenticationService} from './providers';
import {first} from "rxjs/operators";
import {projectName} from '../assets/visual-identity/data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Papp';
  currentUser: User;
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  opened: boolean;

  @ViewChild('sidenav', {static: true}) sidenav;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private alertService: AlertService,
    private titleService: Title
  ) {
    this.authenticationService.CurrentUser.subscribe((user) => {
      this.currentUser = user;
      if (!user) {
        this.opened = false;
      }
    });

    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout() {
    this.authenticationService.logout()
      .pipe(first())
      .subscribe(
        data => {
          this.opened = false;
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
        });
  }

  ngOnInit(): void {
    this.opened = !this.mobileQuery.matches && this.authenticationService.currentUserValue !== undefined && this.hasLogged();
    this.titleService.setTitle(projectName);
  }

  hasLogged() {
    return !!this.authenticationService.currentUserValue;
  }

  redirectToProjectContact() {
    this.router.navigate(['/project-contact']);
  }
}
