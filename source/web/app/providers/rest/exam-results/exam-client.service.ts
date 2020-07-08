import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseUrlResolveService} from "../base-url-resolve.service";
import {environment} from "../../../../environments/environment";
import {Report} from "../../../model/exam-results/report";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamClientService {

  constructor(private http: HttpClient, private baseUrl: BaseUrlResolveService) { }

  getReportByParticipant(ownerRn: string, page: number = 1): Observable<Report[]>{
    return this.http.get<Report[]>(`${this.baseUrl.getBaseUrl()}${environment.reportBasePath}/participant/list/app/${ownerRn}?page=${page}`)
  }
  getFullReport(ownerRn: string, reportId: string): Observable<Report>{
    return this.http.get<Report>(`${this.baseUrl.getBaseUrl()}${environment.reportBasePath}/participant/${ownerRn}/${reportId}`)
  }
  getTemplateReport(ownerRn: string, reportId: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl.getBaseUrl()}${environment.templateBaseParh}/report/${ownerRn}/${reportId}`, {})
  }
}
