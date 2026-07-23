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
  { path: '', component: HomePageComponent, title: 'Trinco Synergy', data: { title: 'Trinco Synergy', description: 'Trinco Synergy provides construction, design, turnkey, renovation, remodeling and interior design services in Nigeria.' } },
  { path: 'about', component: AboutPageComponent, title: 'About Us | Trinco Synergy', data: { title: 'About Us | Trinco Synergy', description: 'Learn about Trinco Synergy, its construction experience, leadership, mission, vision and values.' } },
  { path: 'projects', component: ProjectsPageComponent, title: 'Projects | Trinco Synergy', data: { title: 'Projects | Trinco Synergy', description: 'Explore selected Trinco Synergy residential and commercial construction project galleries.' } },
  { path: 'contact', component: ContactPageComponent, title: 'Contact Us | Trinco Synergy', data: { title: 'Contact Us | Trinco Synergy', description: 'Contact Trinco Synergy to discuss construction, design, renovation or turnkey project needs.' } },
  { path: 'services/construction-services', component: ConstructionServicesPageComponent, title: 'Construction Services | Trinco Synergy', data: { title: 'Construction Services | Trinco Synergy', description: 'Construction services for residential, commercial, hospitality, institutional and community projects.' } },
  { path: 'services/drawing-design-documentation', component: DrawingDesignDocumentationPageComponent, title: 'Drawing, Design & Documentation | Trinco Synergy', data: { title: 'Drawing, Design & Documentation | Trinco Synergy', description: 'Architectural drawings, structural design, MEP drawings, visualization and construction documentation services.' } },
  { path: 'services/turnkey-solutions', component: TurnkeySolutionsPageComponent, title: 'Turnkey Solutions | Trinco Synergy', data: { title: 'Turnkey Solutions | Trinco Synergy', description: 'End-to-end turnkey construction delivery from planning and approvals through execution and handover.' } },
  { path: 'services/renovation-remodeling', component: RenovationRemodelingPageComponent, title: 'Renovation & Remodeling | Trinco Synergy', data: { title: 'Renovation & Remodeling | Trinco Synergy', description: 'Renovation and remodeling services for existing residential, commercial, hospitality and institutional spaces.' } },
  { path: 'services/interior-design', component: InteriorDesignPageComponent, title: 'Interior Design | Trinco Synergy', data: { title: 'Interior Design | Trinco Synergy', description: 'Interior design services focused on functional, refined and buildable spaces.' } },
  { path: '**', redirectTo: '' }
];
