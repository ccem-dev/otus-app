import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';

@Component({
  selector: 'source-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  contact: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.contact = this.route.snapshot.paramMap.get('contact');

    console.log("Data via params: ",this.route.snapshot.paramMap.get('contact'));
  }

}
