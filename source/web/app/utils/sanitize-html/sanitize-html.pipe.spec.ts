import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import {DomSanitizer} from "@angular/platform-browser";

describe('SanitizeHtmlPipe', () => {
  it('create an instance', () => {
    let _sanitizer:DomSanitizer
    const pipe = new SanitizeHtmlPipe(_sanitizer);
    expect(pipe).toBeTruthy();
  });
});
