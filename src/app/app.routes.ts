import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { AboutPageComponent } from './pages/about/about-page.component';
import { ProjectsPageComponent } from './pages/projects/projects-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { ConstructionServicesPageComponent } from './pages/services/construction-services/construction-services-page.component';
import { DrawingDesignDocumentationPageComponent } from './pages/services/drawing-design-documentation/drawing-design-documentation-page.component';
import { TurnkeySolutionsPageComponent } from './pages/services/turnkey-solutions/turnkey-solutions-page.component';
import { RenovationRemodelingPageComponent } from './pages/services/renovation-remodeling/renovation-remodeling-page.component';
import { InteriorDesignPageComponent } from './pages/services/interior-design/interior-design-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Trinco Synergy' },
  { path: 'about', component: AboutPageComponent, title: 'About Us | Trinco Synergy' },
  { path: 'projects', component: ProjectsPageComponent, title: 'Projects | Trinco Synergy' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact Us | Trinco Synergy' },
  { path: 'services/construction-services', component: ConstructionServicesPageComponent, title: 'Construction Services | Trinco Synergy' },
  { path: 'services/drawing-design-documentation', component: DrawingDesignDocumentationPageComponent, title: 'Drawing, Design & Documentation | Trinco Synergy' },
  { path: 'services/turnkey-solutions', component: TurnkeySolutionsPageComponent, title: 'Turnkey Solutions | Trinco Synergy' },
  { path: 'services/renovation-remodeling', component: RenovationRemodelingPageComponent, title: 'Renovation & Remodeling | Trinco Synergy' },
  { path: 'services/interior-design', component: InteriorDesignPageComponent, title: 'Interior Design | Trinco Synergy' },
  { path: '**', redirectTo: '' }
];
