import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  addUser(user: User): void {
    const users = this.getUsers();
    user.id = uuidv4();
    users.push(user);
    this.setData('users', users);
  }

  getUsers(): User[] {
    return this.getData('users');
  }

  editUser(user: User): void {
    const users = this.getUsers();
    const updatedUsers = users.map(item => {
      if (item.id === user.id) {
        return user;
      }
      return item;
    });
    this.setData('users', updatedUsers);
  }

  deleteUser(userId: string): void {
    const users = this.getUsers();
    const initialUsersLength = users.length;
    const updatedUsers = users.filter(user => user.id !== userId);
    if (initialUsersLength !== updatedUsers.length) {
      this.setData('users', updatedUsers);
    }
  }

  setData(key: string, data: any[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getData(key: string): User[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearAllStorage(): void {
    localStorage.clear();
  }
}
