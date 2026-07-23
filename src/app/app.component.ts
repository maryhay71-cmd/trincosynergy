import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BackToTopComponent } from './layout/back-to-top/back-to-top.component';
import { WhatsappButtonComponent } from './layout/whatsapp-button/whatsapp-button.component';
import { SiteBehaviorComponent } from './shared/site-behavior/site-behavior.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent, WhatsappButtonComponent, SiteBehaviorComponent],
  template: `<app-header /><router-outlet /><app-footer /><app-back-to-top /><app-whatsapp-button /><app-site-behavior />`
})
export class AppComponent {}
