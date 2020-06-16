import {Component, Input, OnInit} from '@angular/core';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';
import {ProjectContactValues} from '../project-contact-values';

@Component({
  selector: 'otus-project-contact-item',
  templateUrl: './project-contact-item.component.html',
  styleUrls: ['./project-contact-item.component.css']
})
export class ProjectContactItemComponent implements OnInit {

  @Input() public contactItem: ProjectContact;
  private networkLoading: boolean;
  private isEmptyMessages: boolean;
  private projectContactValues;

  constructor(
    private router: Router,
    private projectContactService: ProjectContactService) {
  }

  ngOnInit() {
    this.isEmptyMessages = true;
    this.networkLoading = true;
    this.projectContactValues = ProjectContactValues;
  }

  loadContactItemContent(projectContact: ProjectContact) {
    if (!projectContact.messages) {
      this.projectContactService.getLastMessage(projectContact._id)
        .subscribe(messages => [
          this.verifyMessages(messages),
          messages.length > 0 ? this.projectContactService.getSender(messages) : null,
          this.projectContactService.addLastMessage(projectContact, messages[messages.length-1]),
          this.networkLoading = false
        ]);
    }
  }

  goToMessages(contactItem: ProjectContact) {
    this.router.navigate([`/project-contact/${contactItem._id}/messages/`], {state: contactItem});
  }

  updateLastMessage(message) {
    this.projectContactService.getSender(Array.of(message))
    this.contactItem.messages[this.contactItem.messages.length - 1] = message;
    this.isEmptyMessages = false;
  }

  private verifyMessages(messages): void {
    if (messages.length === 0) {
      this.isEmptyMessages = true;
    } else {
      this.isEmptyMessages = false;
    }
  }
}
