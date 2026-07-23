import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BackToTopComponent } from './layout/back-to-top/back-to-top.component';
import { WhatsappButtonComponent } from './layout/whatsapp-button/whatsapp-button.component';
import { SiteBehaviorComponent } from './shared/site-behavior/site-behavior.component';
import { CoreSeoService } from './core-seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent, WhatsappButtonComponent, SiteBehaviorComponent],
  template: `<a class="skip-link" href="#main-content">Skip to main content</a><app-header /><main id="main-content" tabindex="-1"><router-outlet /></main><app-footer /><app-back-to-top /><app-whatsapp-button /><app-site-behavior />`
})
export class AppComponent {
  constructor(private seo: CoreSeoService) {
    this.seo.init();
  }
}
