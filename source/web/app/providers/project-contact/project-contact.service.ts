import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProjectContactService {

  Mock = {
    projectContacts: [{
      '_id': '123456',
      'objectType': 'Issue',
      'emailReporter': 'fulano@gmail.com',
      'title': 'Não consigo preencher a atividade TCLEC',
      'message': 'Quando tento responder uma pergunta, não consigo inserir a resposta',
      'creationDate': new Date(),
      'status': 'OPEN',
      'answers': [{
        'sender': 'ciclano@gmail.com',
        'text': 'solicitação em análise',
        'date': new Date()
      }]
    },

      {
        '_id': '45693214',
        'objectType': 'Issue',
        'emailReporter': 'fulano@gmail.com',
        'title': 'Não consigo salvar uma atividade',
        'message': 'Quando tento salvar os dados, o sistema não aceita',
        'creationDate': new Date(),
        'status': 'CLOSE',
        'answers': [{
          'sender': 'ciclano@gmail.com',
          'text': 'Sem permissão',
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




