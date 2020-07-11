import {baseTemplate} from './template';

export const TemplateService = (reportTemplate: string) => {
  const newWindow: Window = window.open('about:blank', '_blank');
  newWindow.document.write(baseTemplate);
  newWindow.document.body.innerHTML = reportTemplate +
    `<button class="no-print button-print md-button md-fab md-mini" onclick="window.print()">
    <i class="material-icons white">print</i>
    </button>`;
};
