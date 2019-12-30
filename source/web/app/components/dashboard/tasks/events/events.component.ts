import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AlertService} from '../../../../providers';

@Component({
  selector: 'events-component',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
  @Input() public event: any;
  @Input() public data: any;

  constructor(
    private alertService: AlertService,
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.event);
    console.log(this.data);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    (<EventsComponent>componentRef.instance).data = this.data;
  }
}
