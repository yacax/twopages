import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  addUser(user: User): void {
    const users = this.getData('users') || [];
    users.push(user);
    this.setData('users', users);
  }

  getUsers(): User[] {
    return this.getData('users');
  }

  deleteUser(name: string): void {
    const users = this.getData('users') || [];
    const updatedUsers = users.filter(user => user.name !== name);
    this.setData('users', updatedUsers);
  }

  setData(key: string, data: User[]): void {
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

  clearAll(): void {
    localStorage.clear();
  }
}
