import { Component, HostListener } from '@angular/core';
@Component({selector:'app-back-to-top', standalone:true, template:`<div id="backToTop" aria-label="Back to top" [class.show]="isVisible" (click)="scrollTop()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5L5 12H9V19H15V12H19L12 5Z" fill="currentColor"/></svg></div>`})
export class BackToTopComponent { isVisible=false; @HostListener('window:scroll') onScroll(){this.isVisible=window.scrollY>400;} scrollTop(){window.scrollTo({top:0,behavior:'smooth'});} }
