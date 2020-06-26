import {
  Component,
  OnInit,
  Compiler,
  Injector,
  NgModuleRef, NgModule, ViewContainerRef, AfterViewInit
} from '@angular/core';
import {Report} from "../../../model/exam-results/report";
import {ExamReportService} from "../../../providers/exam-results/exam-report/exam-report.service";
import * as jsPDF from 'jspdf'

@Component({
  selector: 'source-exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.css']
})
export class ExamReportComponent implements OnInit{

  report: Report
  initialHtml;

  constructor(private examReportService: ExamReportService,
              private _compiler: Compiler,
              private _injector: Injector,
              private _m: NgModuleRef<any>,
              private vc: ViewContainerRef) {
    this.report = examReportService.getReport()
  }

  ngOnInit() {

    const retorno = this.report.template.split('</otus-script>')
    //@ts-ignore
    const participant = {participant: this.report.dataSources[0].result[0]}

    const template = `<div id="report">` + retorno[1] + `<button (click)="generatePDF()"></button></div>`;

    const tmpCmp = Component({template: template,
      styles: ['div{ margin: 0 20px;}']}
      )(class {
      }
      );
    const tmpModule = NgModule({declarations: [tmpCmp]})(class {

    });

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        const cmpRef = this.vc.createComponent(f);
        //@ts-ignore
        cmpRef.instance.data = participant;
        cmpRef.instance.generatePDF = () => {
          const newWindow = window.open("", "_blank");
          newWindow.document.write(`
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css">
          <style>
            @page {
              size: 210mm 297mm;
              margin-left: 225mm;
              margin-right: 300mm;
              margin-top: 125mm;
              margin-bottom: 125mm;
            }

            @media print {
              .no-print, .no-print *,
              otus-script, otus-script *,
              otus-datasource, otus-datasource * {
                display: none !important;
              }
            }

            @media screen {
              .no-print, .no-print * {
                visibility: visible;
              }

              body {
                display: flex;
              }
            }

            otus-script {
              display: none;
            }

            otus-datasource {
              display: none;
            }

            .participantInfo {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            body {
                width: 940px;
                margin: 50px auto;
            }

            .button-print{
            bottom: 5px;
            right: 0;
            position: fixed;
            background-color: #3883ff;
            }

            .material-icons.white {
            color: #ffffff;
            }

          </style>
          <title>Relatório</title>
        </head>
        <button class="no-print button-print md-button md-fab md-mini" onclick="window.print()" >
        <i class="material-icons white">print</i>
        </button>
        <body>
        </body>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js"></script>
        </html>
      `)
          //@ts-ignore
          newWindow.document.body.append(document.getElementById("report"))
        }
      })
  }
}
