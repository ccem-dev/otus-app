import { Injectable } from '@angular/core';
import {Report} from "../../../model/exam-results/report";

@Injectable({
  providedIn: 'root'
})
export class ExamReportService {

  report = Report

  constructor() {
  }

  setReport(report:Report){
    localStorage.setItem("report", JSON.stringify(report))
  }

  getReport():Report{
    //@ts-ignore
    this.report = new Report(JSON.parse(localStorage.getItem("report")))
    //@ts-ignore
    return this.report
  }

  removeReport(){
    localStorage.removeItem("report");
  }
}
