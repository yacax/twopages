import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [SidebarComponent, CommonModule, MatButtonModule],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
})
export class LayoutMainComponent {
  constructor(private router: Router) {}

  get isAboutPage(): boolean {
    return this.router.url.includes('/about');
  }
}
