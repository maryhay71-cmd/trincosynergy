import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';

@Component({ selector: 'app-about', standalone: true, imports: [CommonModule, RouterLink, ContactFormComponent], templateUrl: './about-page.component.html', styleUrls: ['../../../styles/pages/about-us.css'] })
export class AboutPageComponent {}
