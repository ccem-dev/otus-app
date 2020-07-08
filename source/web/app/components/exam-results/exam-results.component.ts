import {Component, OnInit, Output} from '@angular/core';
import {ExamResultsService} from '../../providers/exam-results/exam-results.service';
import {TemplateService} from "./template-service/template.service";
import {OwnerService} from '../../shared/owner/owner.service';
import {Report} from '../../model/exam-results/report';
import {OtusToasterService} from '../../shared/services/otus-toaster.service';

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
              private ownerService: OwnerService,
              private otusToasterService: OtusToasterService) {
    this.owner = this.ownerService.getOwner();
  }

  ngOnInit() {
    this.getReportByParticipant(this.owner);
  }

  getReportByParticipant(ownerRn: string, page:number=1){
    this.loading = true
    this.examResultsService.getReportByParticipant(ownerRn, page).subscribe(response => {
      //@ts-ignore
      this.reports = this.reports.concat(new Report(response.data))
      console.info(this.reports)
    }, error => {
      console.info(error);
      this.hasMore = false;
      this.loading= false;
      }
     ,()=> {
        this.loading = false;
        if(this.reports.length < 1)
          this.hasMore = false
      }
    )
  }

  onScroll() {
    this.loading = true
    this.getReportByParticipant(this.owner, ++this.currentPage)
  }

  onClickResult(report: Report): void{
    if(!report.hasAllDatasources)
      return this.otusToasterService.showMessage('não há todos os resultados')
    this.examResultsService.getTemplateReport(this.owner, report._id).subscribe(template => {
       TemplateService(template.data);
    })
  }
}
