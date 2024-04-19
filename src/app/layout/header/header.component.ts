import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ThemeHandleService } from '../../core/theme-handle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDarkMode = false;
  constructor(
    private router: Router,
    private themeHandleService: ThemeHandleService
  ) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeHandleService.switchTheme(this.isDarkMode);
  }
}
