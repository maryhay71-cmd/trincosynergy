import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';

@Component({ selector: 'app-contact', standalone: true, imports: [CommonModule, ContactFormComponent], templateUrl: './contact-page.component.html', styleUrls: ['../../../styles/pages/contact-us.css'] })
export class ContactPageComponent {}
