export const baseTemplate: string ="<html>\n" +
  "        <head>          \n" +
  "          <link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic\" rel=\"stylesheet\" />\n" +
  "          <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\" />\n" +
  "          <link rel=\"stylesheet\" href=\"https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css\">\n" +
  "          <style>\n" +
  "            @page {\n" +
  "              size: 210mm 297mm;\n" +
  "              margin-left: 225mm; \n" +
  "              margin-right: 300mm; \n" +
  "              margin-top: 125mm; \n" +
  "              margin-bottom: 125mm;\n" +
  "            }\n" +
  "        \n" +
  "            @media print {\n" +
  "              .no-print, .no-print *,\n" +
  "              otus-script, otus-script *,\n" +
  "              otus-datasource, otus-datasource * {\n" +
  "                display: none !important;\n" +
  "              }\n" +
  "            }\n" +
  "            \n" +
  "            @media screen {\n" +
  "              .no-print, .no-print * {\n" +
  "                visibility: visible;\n" +
  "              }\n" +
  "              \n" +
  "              body {\n" +
  "                margin: 10px 100px 0 100px;\n" +
  "              }\n" +
  "            }\n" +
  "            \n" +
  "            otus-script {\n" +
  "              display: none;\n" +
  "            }\n" +
  "            \n" +
  "            otus-datasource {\n" +
  "              display: none;\n" +
  "            }          \n" +
  "                    \n" +
  "            .button-print{\n" +
  "            bottom: 5px;\n" +
  "            right: 0;\n" +
  "            position: fixed;\n" +
  "            background-color: #3883ff;\n" +
  "            }\n" +
  "            \n" +
  "            .material-icons.white {\n" +
  "            color: #ffffff;\n" +
  "            }\n" +
  "            \n" +
  "          </style>\n" +
  "          <title>Relatório</title>          \n" +
  "        </head>\n" +
  "        <button class=\"no-print button-print md-button md-fab md-mini\" onclick=\"window.print()\" >\n" +
  "        <i class=\"material-icons white\">print</i>\n" +
  "        </button>\n" +
  "        <body> \n" +
  "        </body>\n" +
  "        <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js\" type=\"text/javascript\"></script>\n" +
  "        </html>"
