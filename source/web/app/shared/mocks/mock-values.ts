export const MockValues = {
  contactProject: {
    "issues": [
      {
        "_id": "1",
        "objectType": "Issue",
        "sender": "777777",
        "group": "",
        "title": "Não consigo preencher a atividade TCLEC",
        "text": "Quando tento responder uma pergunta, não consigo inserir a resposta",
        "creationDate": "2020-04-10T15:30:07.533Z",
        "status": "OPEN"
      },
      {
        "_id": "2",
        "objectType": "Issue",
        "sender": "777777",
        "group": "",
        "title": "Não consigo salvar uma atividade",
        "text": "Quando tento salvar os dados, o sistema não aceita",
        "creationDate": "2020-05-06T08:15:07.533Z",
        "status": "CLOSED"
      },
      {
        "_id": "3",
        "objectType": "Issue",
        "sender": "777777",
        "group": null,
        "title": "Aplicativo não mostra atividades",
        "text": "Tela de atividades fica em branco, sem nenhuma informação",
        "creationDate": "2020-03-06T18:15:07.533Z",
        "status": "FINALIZED"
      },
      {
        "_id": "_4S0uT_",
        "objectType": "Issue",
        "sender": "777777",
        "group": "",
        "title": "refatoração id",
        "text": "teste de criação de chamado",
        "creationDate": "2020-06-10T13:05:45.285Z",
        "status": "OPEN"
      }
    ],
    "messages": [
      {
        "_id": "1",
        "text": "verifique a sua conexão",
        "sender": "888888",
        "creationDate": "2020-04-11T09:30:07.533Z",
        "issueId": "1"
      },
      {
        "_id": "2",
        "text": "conexão ok, qual próximo passo",
        "sender": "777777",
        "creationDate": "2020-04-12T11:30:07.533Z",
        "issueId": "1"
      },
      {
        "_id": "3",
        "text": "faça logout e tente se conectar novamente",
        "sender": "999999",
        "creationDate": "2020-05-09T08:30:07.533Z",
        "issueId": "1"
      },
      {
        "_id": "4",
        "text": "Mussum Ipsum, cacilds vidis litro abertis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Delegadis gente finis, bibendum egestas augue arcu ut est. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.",
        "sender": "888888",
        "creationDate": "2020-05-14T15:30:07.533Z",
        "issueId": "1"
      },
      {
        "_id": "Dtx4nlW",
        "objectType": "IssueMessage",
        "text": "teste de criação de última mensagem",
        "sender": "777777",
        "creationDate": "2020-06-10T13:07:49.740Z",
        "issueId": "_4S0uT_"
      },
      {
        "_id": "RGw_XR4",
        "objectType": "IssueMessage",
        "text": "testes de criação no state de mensagem",
        "sender": "777777",
        "creationDate": "2020-06-10T13:08:28.413Z",
        "issueId": "_4S0uT_"
      }
    ],
    "senders": [
      {
        "_id": "777777",
        "objectType": "Participant",
        "name": "Fulano"
      },
      {
        "_id": "888888",
        "objectType": "User",
        "name": "José Silva Otus"
      },
      {
        "_id": "999999",
        "objectType": "User",
        "name": "Paulo Souza Otus"
      }
    ]
  }
}
