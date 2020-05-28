import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';

@Component({
  selector: 'source-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  contact: ProjectContact;

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.contact = navigation.extras.state as ProjectContact;
  }

  ngOnInit() {}

}
