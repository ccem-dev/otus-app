import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {ProjectContactValues} from '../project-contact-values';
import {Message} from '../../../model/contact/message/message';

@Component({
  selector: 'source-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public contact: ProjectContact;
  messages: Message[];
  networkLoading = true;
  projectContactValues;

  constructor(
    private router: Router,
    private projectContactService: ProjectContactService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state === undefined) {
      this.router.navigate([`/project-contact/`]);
    } else {
      this.contact = navigation.extras.state as ProjectContact;
    }
  }

  ngOnInit() {
    this.messages = [];
    this.projectContactValues = ProjectContactValues;
    this.getMessages();
  }

  getMessages(): void {   
    this.projectContactService.getProjectContactMessages(this.contact._id)
      .subscribe((messages) => [
        this.projectContactService.getSender(messages),
        this.messages = messages,
        this.networkLoading = false
      ]);
  }
}
