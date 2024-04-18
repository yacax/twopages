import { Component, OnInit } from '@angular/core';
import { LayoutMainComponent } from '../../layout/layout-main/layout-main.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/storage.service';
import { FormStateService } from '../../core/form-state.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    LayoutMainComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
})
export class OverviewComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: [null],
    name: [''],
    age: ['', [Validators.min(0), Validators.max(125)]],
    gender: [''],
    dob: [''],
  });

  startDate = new Date();
  isFormEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.subscribeToFormChanges();
  }

  private subscribeToFormChanges() {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => {
        this.formStateService.saveFormState(value);
        this.updateStartDateBasedOnAge(value.age || 20);
      });
  }

  ngOnInit(): void {
    this.formStateService.isEditing$.subscribe(newValueIsEditing => {
      this.isFormEditMode = newValueIsEditing;
    });

    this.formStateService.formState$.subscribe(state => {
      if (state) {
        this.form.patchValue(state);
        this.updateStartDateBasedOnAge(this.form.value.age || 20);
      } else {
        this.form.reset();
      }
    });
  }

  updateStartDateBasedOnAge(age: number) {
    if (typeof age === 'number' && age >= 0) {
      const year = new Date().getFullYear() - age;
      this.startDate = new Date(year, 0, 1);
    } else {
      this.startDate = new Date();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.saveData();
    this.formStateService.clearFormState();
    this.form.reset();
    this.router.navigate(['/about']);
  }

  private saveData(): void {
    const data = this.form.value;
    if (this.isFormEditMode) {
      this.storageService.editUser(data);
    } else {
      this.storageService.addUser(data);
    }
  }
}
