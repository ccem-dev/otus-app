import {Injectable} from '@angular/core';
import {Report} from '../../model/exam-results/report';
import {ExamClientService} from '../rest/exam-results/exam-client.service';
import {concatMap, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamResultsService {
  // }
  private invalidResponse: Observable<any>;

  // getReportByParticipant(ownerRn: string) {
  //   let examList = [];
  //   let reportFull$ = this.examClientService.getReportByParticipant(ownerRn)
  //     .pipe(
  //       concatMap(response => response['data']),
  //       mergeMap(report => this.examClientService.getFullReport(ownerRn, report['_id'])),
  //       tap((item) => console.log(item)),
  //       map(item => examList.push(new Report(item.data))),
  //       map(() => examList)
  //     );
  //   return reportFull$;

  constructor(private examClientService: ExamClientService) {
  }

  getReportByParticipant(ownerRn: string) {
    return this.examClientService.getReportByParticipant(ownerRn)
      .pipe(
        // tap(ver1 => console.log(ver1)),
        concatMap(response => response['data']),
        mergeMap(report => {
          console.log(report['label']);
          if ((report['label']) !== 'Retinografia') {
            return this.examClientService.getFullReport(ownerRn, report['_id']);
          } else return [{data: {}}]
        }),
        //tap((ver2 => console.log(ver2))),
        map(item => this.isValidReport(item.data)),
        toArray()
      );
  }

  isValidReport(candidate) {
    try {
      return new Report(candidate);
    } catch (e) {
      console.log('não é reportValido');
    }
  }
}
