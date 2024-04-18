import { Component, OnInit } from '@angular/core';
import { LayoutMainComponent } from '../../layout/layout-main/layout-main.component';
import { StorageService } from '../../core/storage.service';
import { UserCardComponent } from '../about/user-card/user-card.component';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [LayoutMainComponent, UserCardComponent, CommonModule],
})
export class AboutComponent implements OnInit {
  users: User[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.storageService.getData('users') || [];
  }
}
