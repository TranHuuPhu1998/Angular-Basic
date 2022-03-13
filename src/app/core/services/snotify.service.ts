import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class snotityService {
  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightTop;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  pauseHover = true;

  constructor(private snotifyService: SnotifyService) {}

  /*
  Change global configuration
   */
  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates
      }
    });
    return {
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  onSuccess(body: string, title: string): void {
    this.snotifyService.success(body, title, this.getConfig());
  }

  onError(body: string, title: string): void {
    this.snotifyService.error(body, title, this.getConfig());
  }
}
