import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {ProjectContactValues} from '../project-contact-values';
import {Subscription} from 'rxjs';

@Component({
  selector: 'source-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public contact: ProjectContact;
  private messages: any[];
  private networkLoading = true;
  private projectContactValues;
  private getMessagesObservable: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectContactService: ProjectContactService) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state === undefined) {
      this.router.navigate([`/project-contact/`]);
    } else {
      this.contact = navigation.extras.state as ProjectContact;
    }
    this.getMessages();
  }

  ngOnInit() {
    this.messages = [];
    this.projectContactValues = ProjectContactValues;
  }

  getMessages(): void {
    this.getMessagesObservable = this.projectContactService.getProjectContactMessages(this.contact._id)
      .subscribe((messages: any[]) => [
        this.projectContactService.getSender(messages),
        this.messages = messages,
        this.networkLoading = false
      ]);
  }

  ngOnDestroy() {
    this.getMessagesObservable.unsubscribe();
  }
}
