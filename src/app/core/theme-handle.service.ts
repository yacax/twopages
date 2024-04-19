import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeHandleService {
  private linkElement: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.linkElement = document.getElementById('theme-link') as HTMLLinkElement;
    if (!this.linkElement) {
      this.linkElement = document.createElement('link');
      this.linkElement.id = 'theme-link';
      this.linkElement.rel = 'stylesheet';
      document.head.appendChild(this.linkElement);
    }
  }

  switchTheme(isDark: boolean) {
    this.linkElement.href = isDark ? 'dark-theme.css' : 'light-theme.css';
  }
}
