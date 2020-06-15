import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContactItemComponent } from './project-contact-item.component';

describe('ProjectContactItemComponent', () => {
  let component: ProjectContactItemComponent;
  let fixture: ComponentFixture<ProjectContactItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectContactItemComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
