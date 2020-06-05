export const ProjectContactValues = {
  toaster: {
    issue: {
      createSuccess: 'comunicação OK: Chamado criado',
      createFail: 'Falha na comunicação: Chamado não criado',
    },
    message: {
      createSucess: 'comunicação OK: Mensagem enviada',
      createFail: 'Falha na comunicação: Mensagem não enviada',
    }
  },
  status: {
    open: 'Aberto',
    close: 'Fechado',
    finalized: 'Finalizado'
  },
  resources: {
    issues: 'project-communication/issue',
    messages: `message`
  },
  placeholder: {
    issue: {
      inputText: 'Ex. Atividades não aparecem',
      inputTextArea: 'Ex. Quando entro no sistema via 3g não estou conseguindo visualizar atividades'
    },
  },
  title: {
    contactProject: 'Contato com o Projeto',
    solicitation: 'Solicitação',
    historic: 'Histórico',
    instructionsForUse: 'Instruções de Uso',
    btnOpenIssue: 'ABRIR CHAMADO',
    issueInputText: 'Titulo',
    issueInputTextArea: 'Descreva a situação',
    withoutContacts: 'Nenhum contato encontrado'
  },
  tooltip: {
    save: 'salvar',
    reset: 'resetar',
    return: 'voltar'
  },
  context: {
    cardFormContact: {
      p1: 'Caso esteja acessando este módulo pela primeira vez, e precise contactar-se com o projeto para informar\n' +
        '        alguma anomalia do sistema ou simplesmente tentar solucionar uma dúvida,\n' +
        '        clique no botão "criar chamado" para acessar o formulário de solicitação.',
      p2: 'Caso queira somente ver a respostas dos especialistas em relação aos chamados criados, vá para\n' +
        '        a seção de histórico e expanda um ou mais titulos.',
      p3: 'Se necessário tirar mais dúvidas sobre a solução enviada, crie uma nova mensagem com mais detalhes ou sugestões.\n' +
        '        Em "ver +" atualize-se sobre a conversa com todas as mensagens do mesmo chamado.'
    }
  }
};
