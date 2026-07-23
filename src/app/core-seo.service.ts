import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class CoreSeoService {
  constructor(private router: Router, private route: ActivatedRoute, private title: Title, private meta: Meta) {}

  init(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap((route) => route.data)
    ).subscribe((data) => {
      const title = data['title'] || 'Trinco Synergy';
      const description = data['description'] || 'Trinco Synergy provides construction, design, turnkey, renovation, remodeling and interior design services.';
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
    });
  }
}
