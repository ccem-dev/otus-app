import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProjectComponent } from './contact-project.component';

describe('ContactProjectComponent', () => {
  let component: ContactProjectComponent;
  let fixture: ComponentFixture<ContactProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
