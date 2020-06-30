import {Component, OnInit, Output} from '@angular/core';
import {ExamResultsService} from '../../providers/exam-results/exam-results.service';
import {OwnerService} from '../../shared/owner/owner.service';
import {Report} from '../../model/exam-results/report';
import {interval, Observable, of, Subscription} from 'rxjs';
import {concatMap, switchMap } from 'rxjs/operators';
import {getMatAutocompleteMissingPanelError} from "@angular/material/autocomplete";

@Component({
  selector: 'source-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css']
})
export class ExamResultsComponent implements OnInit {

  reports: Report[] = [];
  owner: string = "";

  loading: boolean = true;

  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(private examResultsService: ExamResultsService,
              private ownerService: OwnerService) {
    this.owner = this.ownerService.getOwner();
  }

  ngOnInit() {
    this.getReportByParticipant(this.owner);
  }

  private getReportByParticipant(ownerRn: string, page:number=1){
    this.loading = true
    this.examResultsService.getReportByParticipant(ownerRn, page).subscribe(response => {
      //@ts-ignore
      this.reports = this.reports.concat(new Report(response.data))
    }, error => {
      console.info(error);
      this.hasMore = false;
      this.loading= false;
      }
     ,()=> {this.loading = false}
    )
  }

  loadMore() {
    this.loading = true
    this.getReportByParticipant(this.owner, ++this.currentPage)
  }

  private goToReport(report: Report): void {
    // this.examReportService.setReport(report)
    // this.router.navigateByUrl("/exam-report")
  }
}
