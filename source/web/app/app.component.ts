import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {User} from './model';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthenticationService} from './providers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Otus App';
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
    private media: MediaMatcher
  ) {
    this.authenticationService.CurrentUser.subscribe((user) => {
      this.currentUser = user;
      if (!user) {
        this.opened = false;
      }
    });
    // this.matIconRegistry.addSvgIcon(
    //   'participant-app',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/participant-app.svg')
    // );
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout() {
    this.authenticationService.logout(() => {
      this.opened = false;
      this.router.navigate(['/login']);
    });
  }

  ngOnInit(): void {
    this.opened = !this.mobileQuery.matches && this.authenticationService.currentUserValue !== undefined && this.hasLogged();
  }

  hasLogged() {
    return !!this.authenticationService.currentUserValue;
  }

}
