import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';

@Component({
  selector: 'source-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  contact: ProjectContact;
  messages: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectContactService: ProjectContactService) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation.extras.state === undefined) {

      let contactSave: any = {
        _id: "1",
        objectType: "Issue",
        sender: "fulano@email.com",
        title: "Não consigo preencher a atividade TCLEC",
        message: "Quando tento responder uma pergunta, não consigo inserir a resposta",
        creationDate: "2020-04-10T15:30:07.533Z",
        status: "OPEN"
      }
      this.contact = contactSave as ProjectContact;
    }
    else this.contact = navigation.extras.state as ProjectContact;
    this.getMessages();
  }

  ngOnInit() {
    this.messages = [];
  }

  ngOnDestroy(){
    console.log("destruiu");
  }

  getMessages(): void {
    this.projectContactService.getProjectContactMessages()
      .subscribe((messages: any[]) => this.messages = messages);
  }

}
