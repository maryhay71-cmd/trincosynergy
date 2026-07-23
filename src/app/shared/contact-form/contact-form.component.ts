import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form class="contact-form" id="contactForm" [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-grid">
        <label class="sr-only" for="fullName">Full Name</label>
        <input type="text" name="fullName" id="fullName" placeholder="Full Name" formControlName="fullName" required>
        <label class="sr-only" for="phone">Phone Number</label>
        <input type="tel" name="phone" id="phone" placeholder="Phone Number" formControlName="phone" required>
      </div>
      <label class="sr-only" for="email">Email Address</label>
      <input type="email" name="email" id="email" placeholder="Email Address" formControlName="email" required>
      <label class="sr-only" for="message">Your Message</label>
      <textarea name="message" id="message" placeholder="Your Message..." formControlName="message" required></textarea>
      <input type="text" class="company-field" tabindex="-1" autocomplete="off" formControlName="company" aria-hidden="true">
      <button type="submit" class="contact-btn" [disabled]="isSending"><span class="btn-text">{{ isSending ? 'Sending...' : 'Send Message' }}</span></button>
    </form>
  `,
  styles: [`.company-field{position:absolute;left:-9999px;opacity:0;height:0;width:0;}`]
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  isSending = false;
  form = this.fb.group({ fullName: ['', Validators.required], phone: ['', Validators.required], email: ['', [Validators.required, Validators.email]], message: ['', Validators.required], company: [''] });

  async submit(): Promise<void> {
    if (this.form.value.company) return;
    if (this.form.invalid) { alert('Please fill in all required fields.'); return; }
    this.isSending = true;
    try {
      const emailjs = await import('emailjs-com');
      emailjs.init('eD1IL2bHc58RV8VRc');
      const value = this.form.getRawValue();
      await emailjs.send('service_8e61y9l', 'template_n8kn299', {
        fullName: value.fullName?.trim(),
        email: value.email?.trim(),
        message: `\nFull Name: ${value.fullName?.trim()}\nPhone Number: ${value.phone?.trim()}\nEmail: ${value.email?.trim()}\n\nMessage:\n${value.message?.trim()}`
      });
      alert('Message sent successfully!');
      this.form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    } finally { this.isSending = false; }
  }
}
