import {Component, Input, OnInit} from '@angular/core';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';

@Component({
  selector: 'otus-project-contact-item',
  templateUrl: './project-contact-item.component.html',
  styleUrls: ['./project-contact-item.component.css']
})
export class ProjectContactItemComponent implements OnInit {

  @Input() public contactItem: any;
  private networkLoading: boolean;
  private isEmptyMessages: boolean

  constructor(
    private router: Router,
    private projectContactService: ProjectContactService) {}

  ngOnInit() {
    this.isEmptyMessages = true;
    this.networkLoading = true;
  }

  loadContactItemContent(contact: ProjectContact) {
    if(!contact.messages)
      this.projectContactService.getLastMessage(contact.id)
        .subscribe( lastMessage => [
          this.verifyMessages(lastMessage),
          this.projectContactService.addLastMessage(contact, lastMessage),
          this.networkLoading = false
        ])
  }

  goToMessages(contactItem: any) {
    this.router.navigate([`/project-contact/${contactItem.id}/messages/`], {state: contactItem});
  }

  updateLastMessage(message){
    this.contactItem.messages[this.contactItem.messages.length-1] = message,
    this.isEmptyMessages = false;
  }

  private verifyMessages(messages): void{
    if(messages.length === 0) this.isEmptyMessages = true;
    else this.isEmptyMessages = false;
  }
}
