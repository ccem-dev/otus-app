import {async, TestBed} from '@angular/core/testing';
import { TemplateService } from './template.service';


describe('TemplateService', () => {
  let template = TemplateService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TemplateService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    template = TestBed.get(TemplateService)
  });

  it("should be instantiated", () => {
    expect(template("")).toBeTruthy()
  })

});
