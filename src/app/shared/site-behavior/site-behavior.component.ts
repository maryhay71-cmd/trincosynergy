import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

declare const L: any;

@Component({ selector: 'app-site-behavior', standalone: true, template: '' })
export class SiteBehaviorComponent implements AfterViewInit, OnDestroy {
  private subscription?: Subscription;
  private cleanup: Array<() => void> = [];
  private readonly isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.subscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.initialize());
    this.initialize();
  }

  ngOnDestroy(): void {
    this.cleanup.forEach((fn) => fn());
    this.subscription?.unsubscribe();
  }

  private initialize(): void {
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    const timeout = window.setTimeout(() => {
      this.revealCards();
      this.setupFaq();
      this.setupLightboxes();
      this.revealContact();
      this.setupCounters();
      this.setupProjectFilters();
      this.setupMap();
    });
    this.cleanup.push(() => window.clearTimeout(timeout));
  }

  private revealCards(): void {
    const cards = document.querySelectorAll('.featured-card, .arch-card, .project-card');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('show'); }), { threshold: 0.2 });
    cards.forEach((card) => observer.observe(card));
    this.cleanup.push(() => observer.disconnect());
  }

  private setupFaq(): void {
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
      const timeout = window.setTimeout(() => faqSection.classList.add('show'), 50);
      this.cleanup.push(() => window.clearTimeout(timeout));
    }
    document.querySelectorAll('.faq-item').forEach((item) => {
      const question = item.querySelector('.faq-question');
      const handler = () => {
        const active = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));
        if (!active) item.classList.add('active');
      };
      question?.addEventListener('click', handler);
      if (question) this.cleanup.push(() => question.removeEventListener('click', handler));
    });
  }

  private setupLightboxes(): void {
    const lightbox = document.getElementById('archLightbox') ?? document.getElementById('projectLightbox');
    const mainImg = document.getElementById('lightboxMain') as HTMLImageElement | null;
    const caption = document.getElementById('lightboxCaption');
    const thumbs = document.getElementById('lightboxThumbs');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    if (!lightbox || !mainImg || !caption || !thumbs) return;
    let images: HTMLImageElement[] = [];
    let index = 0;
    const update = () => {
      const img = images[index];
      if (!img) return;
      mainImg.src = img.src;
      caption.textContent = img.dataset['caption'] || '';
      thumbs.querySelectorAll('img').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
    };
    const open = (i = 0) => {
      index = i;
      thumbs.innerHTML = '';
      images.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.addEventListener('click', () => { index = idx; update(); });
        thumbs.appendChild(thumb);
      });
      update();
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
    };
    const close = () => {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    const prev = () => { if (images.length) { index = (index - 1 + images.length) % images.length; update(); } };
    const next = () => { if (images.length) { index = (index + 1) % images.length; update(); } };
    document.querySelectorAll('.arch-card, .project-card').forEach((card) => {
      const handler = (event: Event) => {
        const gallery = card.querySelectorAll('.arch-gallery img, .project-gallery img');
        images = Array.from(gallery) as HTMLImageElement[];
        if (!images.length) return;
        event.preventDefault();
        open(0);
      };
      const keyHandler = (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          handler(event);
        }
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', keyHandler);
      this.cleanup.push(() => card.removeEventListener('click', handler));
      this.cleanup.push(() => card.removeEventListener('keydown', keyHandler));
    });
    const keyHandler = (event: KeyboardEvent) => {
      if (!lightbox.classList.contains('show')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    closeBtn?.addEventListener('click', close); prevBtn?.addEventListener('click', prev); nextBtn?.addEventListener('click', next); document.addEventListener('keydown', keyHandler);
    this.cleanup.push(() => { closeBtn?.removeEventListener('click', close); prevBtn?.removeEventListener('click', prev); nextBtn?.removeEventListener('click', next); document.removeEventListener('keydown', keyHandler); });
  }

  private revealContact(): void {
    const reveal = () => document.querySelectorAll('.contact-left, .contact-right').forEach((section) => { if (section.getBoundingClientRect().top < window.innerHeight * 0.85) section.classList.add('visible'); });
    window.addEventListener('scroll', reveal); reveal();
    this.cleanup.push(() => window.removeEventListener('scroll', reveal));
  }

  private setupCounters(): void {
    document.querySelectorAll('.map-content h2').forEach((counter) => {
      const target = Number(counter.getAttribute('data-target')) || 0;
      const symbol = counter.getAttribute('data-symbol') || '';
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 3000, 1);
        counter.textContent = Math.floor(progress * target) + symbol;
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      let frame = requestAnimationFrame(animate);
      this.cleanup.push(() => cancelAnimationFrame(frame));
    });
  }

  private setupProjectFilters(): void {
    const cards = Array.from(document.querySelectorAll('.project-card')) as HTMLElement[];
    const buttons = Array.from(document.querySelectorAll('.filter-btn')) as HTMLButtonElement[];
    const paginationContainers = Array.from(document.querySelectorAll('.pagination')) as HTMLElement[];
    if (!cards.length || !buttons.length) return;
    const cardsPerPage = 12;
    let activeFilter = buttons.find((button) => button.classList.contains('active'))?.dataset['filter'] || 'all';
    let currentPage = 1;
    const filteredCards = () => cards.filter((card) => activeFilter === 'all' || card.classList.contains(activeFilter));
    const apply = () => {
      const matchingCards = filteredCards();
      const pageCount = Math.max(Math.ceil(matchingCards.length / cardsPerPage), 1);
      currentPage = Math.min(currentPage, pageCount);
      cards.forEach((card) => { card.style.display = 'none'; });
      matchingCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).forEach((card) => { card.style.display = 'block'; });
      this.renderPagination(paginationContainers, pageCount, currentPage, (page) => {
        currentPage = page;
        apply();
      });
    };
    buttons.forEach((button) => {
      const handler = () => {
        buttons.forEach((b) => b.classList.remove('active'));
        buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        activeFilter = button.dataset['filter'] || 'all';
        currentPage = 1;
        apply();
      };
      button.addEventListener('click', handler);
      this.cleanup.push(() => button.removeEventListener('click', handler));
    });
    apply();
  }

  private renderPagination(containers: HTMLElement[], pageCount: number, currentPage: number, onPageChange: (page: number) => void): void {
    containers.forEach((container) => {
      container.innerHTML = '';
      if (pageCount <= 1) return;
      const createButton = (label: string, page: number, disabled = false, active = false) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.disabled = disabled;
        if (active) button.classList.add('active');
        const handler = () => onPageChange(page);
        button.addEventListener('click', handler);
        this.cleanup.push(() => button.removeEventListener('click', handler));
        container.appendChild(button);
      };
      createButton('Prev', Math.max(currentPage - 1, 1), currentPage === 1);
      for (let page = 1; page <= pageCount; page++) createButton(String(page), page, false, page === currentPage);
      createButton('Next', Math.min(currentPage + 1, pageCount), currentPage === pageCount);
    });
  }

  private setupMap(): void {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;
    const map = L.map('map', { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false }).setView([7.5, 7.0], 6);
    const controller = new AbortController();
    let active = true;
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/NGA.geo.json', { signal: controller.signal }).then((res) => res.json()).then((data) => {
      if (!active) return;
      const nigeriaLayer = L.geoJSON(data, { style: { fillColor: '#222742', fillOpacity: 1, color: '#222742', weight: 0 } }).addTo(map);
      map.fitBounds(nigeriaLayer.getBounds(), { padding: [5, 5], animate: false });
      [{ coords: [6.455, 7.4986] }, { coords: [5.1063, 7.3662] }, { coords: [5.4858, 7.0357] }, { coords: [6.1477, 6.789] }].forEach((city) => {
        L.circleMarker(city.coords, { radius: 6, color: '#d4b100', fillColor: '#d4b100', fillOpacity: 1, weight: 2 }).addTo(map);
        const pulse = L.circleMarker(city.coords, { radius: 9, color: '#d4b100', fillColor: '#d4b100', fillOpacity: 0.6, weight: 0 }).addTo(map);
        let radius = 9;
        let opacity = 0.9;
        let frame = 0;
        const expand = () => {
          radius += 0.18;
          opacity -= 0.006;
          pulse.setRadius(radius);
          pulse.setStyle({ fillOpacity: opacity });
          if (radius >= 15 || opacity <= 0) {
            radius = 5;
            opacity = 0.4;
          }
          frame = requestAnimationFrame(expand);
        };
        frame = requestAnimationFrame(expand);
        this.cleanup.push(() => cancelAnimationFrame(frame));
      });
    }).catch((error) => {
      if (error?.name !== 'AbortError') console.error('Error loading Nigeria map:', error);
    });
    this.cleanup.push(() => {
      active = false;
      controller.abort();
      map.remove();
    });
  }
}
