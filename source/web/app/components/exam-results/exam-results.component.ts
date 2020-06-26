import {Component, OnInit, Output} from '@angular/core';
import {ExamResultsService} from '../../providers/exam-results/exam-results.service';
import {OwnerService} from '../../shared/owner/owner.service';
import {Report} from '../../model/exam-results/report';


@Component({
  selector: 'source-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css']
})
export class ExamResultsComponent implements OnInit {

  @Output() reports: Report[] = [];
  //@Output() reports$: Observable<Report[]>;
  @Output() owner;
  @Output() loading: boolean = false;

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

  private getReportByParticipant(ownerRn: string): void {
    // @ts-ignore
    this.examResultsService.getReportByParticipant(ownerRn)
      .subscribe(reportFull => [
        this.reports = reportFull,
        this.loading = false]
      );
  }

  private goToReport(report: Report): void {
    // this.examReportService.setReport(report)
    // this.router.navigateByUrl("/exam-report")
  }

}
