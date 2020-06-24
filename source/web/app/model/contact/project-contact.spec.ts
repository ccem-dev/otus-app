import { ProjectContact } from './project-contact';

let Mock;

describe('ProjectContact', () => {

  beforeEach(()=>{
    Mock = initializeMocks();
  })


  it('should create an instance', () => {
    expect(new ProjectContact(Mock.form)).toBeTruthy();
  });


  function initializeMocks() {
    return {
      form: {title: "Title of Issue",
        text: "context of inputTextArea by Issue"}
    }
  }
});
