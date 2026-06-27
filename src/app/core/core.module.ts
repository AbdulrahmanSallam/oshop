import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from 'shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, NotFoundComponent],
  imports: [CoreRoutingModule, SharedModule],
  exports: [NavbarComponent, FooterComponent, NotFoundComponent],
})
export class CoreModule {}
