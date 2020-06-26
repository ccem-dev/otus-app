import {Injectable} from '@angular/core';
import {Report} from '../../model/exam-results/report';
import {ExamClientService} from '../rest/exam-results/exam-client.service';
import {concatMap, map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamResultsService {
  constructor(private examClientService: ExamClientService) {
  }

  getReportByParticipant(ownerRn: string) {
    let examList = [];
    let reportFull$ = this.examClientService.getReportByParticipant(ownerRn)
      .pipe(
        concatMap(response => response['data']),
        mergeMap(report => this.examClientService.getFullReport(ownerRn, report['_id'])),
        map(item => examList.push(new Report(item.data))),
        map(() => examList)
      );
    return reportFull$;
  }
}
