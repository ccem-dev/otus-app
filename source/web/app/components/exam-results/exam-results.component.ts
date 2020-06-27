import {Component, OnInit, Output} from '@angular/core';
import {ExamResultsService} from '../../providers/exam-results/exam-results.service';
import {OwnerService} from '../../shared/owner/owner.service';
import {Report} from '../../model/exam-results/report';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'source-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css']
})
export class ExamResultsComponent implements OnInit {

  @Output() reports: Report[] = [];
  @Output() owner;
  @Output() loading: boolean = false;
  private examResults$: Subscription;

  constructor(private examResultsService: ExamResultsService,
              private ownerService: OwnerService) {
    this.owner = this.ownerService.getOwner();
  }

  ngOnInit() {
    this.getReportByParticipant(this.owner);
  }

  createPDF() {
    // const doc = new jsPDF()
    // const element = document.querySelector('div')
    // doc.fromHTML(element)
    // doc.save()
  }

  ngOnDestroy() {
    this.examResults$.unsubscribe();
  }

  private getReportByParticipant(ownerRn: string): void {
    this.examResults$ = this.examResultsService.getReportByParticipant(ownerRn)
      .pipe(tap(result => console.log(result)))
      .subscribe(reportFull => [
        this.reports = reportFull,
        this.loading = false],
      );
  }

  private goToReport(report: Report): void {
    // this.examReportService.setReport(report)
    // this.router.navigateByUrl("/exam-report")
  }

}
