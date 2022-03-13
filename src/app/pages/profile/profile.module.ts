import { NgModule } from '@angular/core';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [ProfileRoutingModule, NzListModule, TranslateModule, NzAvatarModule],
  declarations: [ProfileComponent],
  providers: []
})
export class ProfileModule {}
