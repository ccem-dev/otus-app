import {Component, OnInit, Output} from '@angular/core';
import {ExamResultsService} from '../../providers/exam-results/exam-results.service';
import {OwnerService} from '../../shared/owner/owner.service';
import {Report} from '../../model/exam-results/report';
import {interval, Observable, of, Subscription} from 'rxjs';
import {concatMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'source-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css']
})
export class ExamResultsComponent implements OnInit {

  @Output() reports: Report[] = [];
  // @Output() reports$: Observable<Report[]>;
  @Output() owner;
  @Output() loading: boolean = false;

  search: string = ""

  constructor(private examResultsService: ExamResultsService,
              private ownerService: OwnerService) {
    this.owner = this.ownerService.getOwner();
  }

  ngOnInit() {
    this.getReportByParticipant(this.owner);
  }

  private getReportByParticipant(ownerRn: string){
    this.examResultsService.getReportByParticipant(this.owner).subscribe(res => {
      //@ts-ignore
      of(res.data).pipe(
        switchMap(repo => repo),
        //@ts-ignore
        concatMap(res => this.examResultsService.getFullReport(ownerRn, res._id)),
      ).subscribe(response => {
        //@ts-ignore
        this.reports = this.reports.concat(new Report(response.data))
      })
    })
  }

  // private getReportByParticipant(ownerRn: string): Observable<Report[]>{
  //  return this.examResultsService.getReportByParticipant(ownerRn);
  // }

  private goToReport(report: Report): void {
    // this.examReportService.setReport(report)
    // this.router.navigateByUrl("/exam-report")
  }

}
