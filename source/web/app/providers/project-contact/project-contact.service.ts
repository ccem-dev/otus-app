import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProjectContactService {

  Mock = {
    projectContacts: [{
      '_id': '123456',
      'objectType': 'issue',
      'emailReporter': 'fulano@gmail.com',
      'title': 'Não consigo preencher a atividade TCLEC',
      'description': 'Quando tento responder uma pergunta, não consigo inserir a resposta',
      'date': new Date(),
      'state': 'open',
      'answers': [{
        'email': 'ciclano@gmail.com',
        'answer': 'solicitação em análise',
        'date': new Date()
      }]
    },

      {
        '_id': '654321',
        'objectType': 'issue',
        'emailReporter': 'fulano@gmail.com',
        'title': 'Não consigo salvar uma atividade',
        'description': 'Quando tento salvar os dados, o sistema não aceita',
        'date': new Date(),
        'state': 'open',
        'answers': [{
          'email': 'ciclano@gmail.com',
          'answer': 'solicitação em análise',
          'date': new Date()
        }]
      }
    ]
  };

  constructor() {
  }

  getProjectContacts() {
    return this.Mock.projectContacts;
  }
}




