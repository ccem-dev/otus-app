import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {ProjectContactValues} from '../project-contact-values';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectContactService: ProjectContactService) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation.extras.state === undefined) {
      this.router.navigate([`/project-contact/`])
    }
    else this.contact = navigation.extras.state as ProjectContact;
    this.getMessages();
  }

  ngOnInit() {
    this.messages = [];
    this.projectContactValues = ProjectContactValues
  }

  ngOnDestroy(){
    console.log("destruiu");
  }

  getMessages(): void {
    this.projectContactService.getProjectContactMessages(this.contact.id)
      .subscribe((messages: any[]) => [
        this.projectContactService.getSender(messages),
        console.log(messages),
        this.messages = messages,
        this.networkLoading = false
      ]);
  }

}
