import { TestBed } from '@angular/core/testing';

import { OtusToasterService } from './otus-toaster.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import {ProjectContactValues} from '../../components/project-contact/project-contact-values';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('OtusToasterService', () => {
  let service: OtusToasterService;
  let snackBar: MatSnackBar;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule, NoopAnimationsModule],
    providers: [MatSnackBar]
  }));

  beforeEach(()=> {
    service = TestBed.get(OtusToasterService);
    snackBar = TestBed.get(MatSnackBar)
    spyOn(snackBar, 'open').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showMessage method should evoke open by snackBar with successMessage ', function () {
    // @ts-ignore
    service.showMessage(ProjectContactValues.toaster.issue.createSuccess)
    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });

  it('showMessage method should evoke open by snackBar with failMessage', function () {
    // @ts-ignore
    service.showMessage(ProjectContactValues.toaster.issue.createFail, true);
    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });
});
