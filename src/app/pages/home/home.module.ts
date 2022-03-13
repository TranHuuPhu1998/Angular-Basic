import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  imports: [HomeRoutingModule, TranslateModule],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
