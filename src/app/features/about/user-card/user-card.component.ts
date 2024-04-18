import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() userData!: User;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<User>();
}
