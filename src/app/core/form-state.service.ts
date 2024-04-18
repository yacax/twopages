import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formState = new BehaviorSubject<any | null>(null);
  private isEditing = new BehaviorSubject<boolean>(false);
  public formState$ = this.formState.asObservable();
  public isEditing$ = this.isEditing.asObservable();

  constructor(private storageService: StorageService) {
    this.initFormState();
  }

  initFormState(): void {
    const state = this.storageService.getData('formState');
    if (state) {
      this.formState.next(state);
    } else {
      this.formState.next(null);
    }
    this.setEditingMode(false);
  }

  activateEditMode(): void {
    this.setEditingMode(true);
  }

  setEditingMode(isEditing: boolean): void {
    this.isEditing.next(isEditing);
  }

  setFormState(formState: any, isEditing: boolean = false): void {
    this.formState.next(formState);
    this.isEditing.next(isEditing);
  }

  get isFormEditMode(): boolean {
    return this.isEditing.value;
  }

  saveFormState(formState: any): void {
    const currentState = this.formState.value;
    if (JSON.stringify(currentState) !== JSON.stringify(formState)) {
      this.formState.next(formState);
      this.storageService.setData('formState', formState);
    }
  }

  clearFormState(): void {
    this.formState.next(null);
    this.storageService.removeData('formState');
    this.isEditing.next(false);
  }
}
