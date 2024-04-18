import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../models/user.model';
import { StorageService } from '../../../core/storage.service';
import { FormStateService } from '../../../core/form-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() userData!: User;
  @Output() refreshUsers = new EventEmitter<void>();

  constructor(
    private storageService: StorageService,
    private formStateService: FormStateService,
    private router: Router
  ) {}

  onEdit(): void {
    this.formStateService.setFormState(this.userData, true);
    this.router.navigate(['/']);
  }

  onDelete(): void {
    this.storageService.deleteUser(this.userData.id);
    this.refreshUsers.emit();
    this.formStateService.clearFormState();
  }
}
