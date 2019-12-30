import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  returnUrl: string;
  errorCode: number;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.returnUrl) {
      this.returnUrl = this.route.snapshot.queryParams.returnUrl;
      const queryIndex = this.returnUrl.indexOf('?');
      if (queryIndex > -1) {
        this.returnUrl = this.returnUrl.slice(
          0,
          queryIndex
        );
      }
    } else {
      this.returnUrl = '/login';
    }
    this.errorCode = this.route.snapshot.queryParams.errorCode || 404;
    this.errorMessage = this.route.snapshot.queryParams.errorMessage || 'Page not found';
  }

  goBack() {
    this.router.navigate([this.returnUrl]);
  }
}
