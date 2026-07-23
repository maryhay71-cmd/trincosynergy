import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';

@Component({ selector: 'app-home', standalone: true, imports: [CommonModule, RouterLink, ContactFormComponent], templateUrl: './home-page.component.html' })
export class HomePageComponent {}
