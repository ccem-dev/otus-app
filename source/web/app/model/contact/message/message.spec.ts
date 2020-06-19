import { Message } from './message';
import {ProjectContact} from '../project-contact';

let Mock;

describe('Message', () => {

  beforeEach(()=>{
    Mock = initializeMocks();
  })

  it('should create an instance', () => {
    expect(new Message(Mock.text, new ProjectContact(Mock.form))).toBeTruthy();
  });

  function initializeMocks(){
    return {
      text: "context of inputTextArea by Message",
      form: {title: "Title of Issue",
             text: "context of inputTextArea by Issue"}
    }
  }
});
