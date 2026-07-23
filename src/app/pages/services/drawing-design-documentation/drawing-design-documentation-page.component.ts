import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../../shared/contact-form/contact-form.component';

@Component({ selector: 'app-drawing-design-documentation', standalone: true, imports: [CommonModule, RouterLink, ContactFormComponent], templateUrl: './drawing-design-documentation-page.component.html', styleUrls: ['../../../../styles/pages/drawing-design-documentation.css'] })
export class DrawingDesignDocumentationPageComponent {}
