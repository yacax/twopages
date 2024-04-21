import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormStateService } from '../../core/form-state.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    MatCard,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutMainComponent {
  constructor(
    private router: Router,
    private formStateService: FormStateService
  ) {}

  get isAboutPage(): boolean {
    return this.router.url.includes('/about');
  }

  handleFormClear(): void {
    this.formStateService.clearFormState();
  }
}
