import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {AlertService} from '../../providers';

export interface Message {
  cssClass: string;
  type: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: 'app-alert.component.html'
})

export class AppAlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        if (message && typeof message === 'object') {
          switch (message && message['type']) {
            case 'success':
              message.cssClass = 'alert alert-success';
              break;
            case 'error':
              message.cssClass = 'alert alert-danger';
              break;
          }

        } else {}
        this.message = message;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
