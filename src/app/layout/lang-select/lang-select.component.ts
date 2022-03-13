import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-select',
  templateUrl: './lang-select.component.html'
})
export class LangSelectComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ja']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ja/) ? browserLang : 'en');
  }
}
