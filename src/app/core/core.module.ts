import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CoreRoutingModule, SharedModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
