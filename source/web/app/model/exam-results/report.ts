

export class Report{
  objectType?: string;
  _id?: string;
  label?: string;
  dirty?: boolean;
  template?: string;
  dataSources?: [];
  missingDataSources?: any;
  fieldsError?: any;
  compiledTemplate?: string;
  hasError?: boolean;
  hasAllDatasources?: boolean;
  isAvailable?: boolean;
  loading?: boolean;
  status?: {
    color?: string,
    icon?: string
  };

  constructor(report: Report) {
    this._id = report._id;
    this.objectType = "ParticipantReport";
    this.label = report.label;
    this.dirty = false;
    this.template = report.template;
    //@ts-ignore
    this.dataSources = report.dataSources
    this.missingDataSources = [];
    this.fieldsError = false;
    this.compiledTemplate = undefined;
    this.hasError = false;
    this.hasAllDatasources = false;
    this.isAvailable = false;
    this.loading = false;
    this.status = {
      color: "black",
      icon: "load",
    };
    this.manageDataSources(this.dataSources);
    this.setStatus()
  }

  private manageDataSources(dataSourceList){
    dataSourceList.forEach(data=>{
      if(!data.result[0]) {
        if(data.optional){
          return;
        }
        this.missingDataSources.push(data.label);
      }
    })
    this.missingDataSources.length < 1 ?
      this.hasAllDatasources = true : this.hasAllDatasources = false
  }

  private setStatus() {
    if(!this.hasAllDatasources)
      return this.status = {
        color: "orange",
        icon: "priority_high"
      }
    else
      return this.status = {
        color: "green",
        icon: "done"
      }

  }

  public fromJSON(reportJson) {
    this.objectType = reportJson.objectType;
    this._id = reportJson._id;
    this.label = reportJson.label;
    this.dirty = reportJson.dirty;
    this.template = reportJson.template;
    this.dataSources = reportJson.dataSources;
    this.missingDataSources = reportJson.missingDataSources;
    this.fieldsError = reportJson.fieldsError;
    this.compiledTemplate = reportJson.compiledTemplate;
    this.hasError = reportJson.hasError;
    this.hasAllDatasources = reportJson.hasError;
    this.isAvailable = reportJson.hasError;
    this.loading = reportJson.loading;
    this.status = reportJson.status;
  }

  public toJSON() {
    return {
      objectType: this.objectType,
      _id: this._id,
      label: this.label,
      dirty: this.dirty,
      template: this.template,
      dataSources: this.dataSources,
      missingDataSources: this.missingDataSources,
      fieldsError: this.fieldsError,
      compiledTemplate: this.compiledTemplate,
      hasError: this.hasError,
      hasAllDatasources: this.hasAllDatasources,
      isAvailable: this.isAvailable,
      loading: this.loading,
      status: this.status
    };
  }
}
