import { Component, OnInit } from '@angular/core';
import { LayoutMainComponent } from '../../layout/layout-main/layout-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/storage.service';

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
  form: FormGroup;
  startDate = new Date();

  constructor(private storageService: StorageService) {
    this.form = new FormGroup({
      name: new FormControl(''),
      age: new FormControl('', [Validators.min(0), Validators.max(125)]),
      gender: new FormControl(''),
      dob: new FormControl(''),
    });

    this.form
      .get('age')!
      .valueChanges.subscribe(age => this.updateStartDateBasedOnAge(age));
  }

  ngOnInit(): void {
    this.updateStartDateBasedOnAge(this.form.value.age || 20);
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
    this.storageService.addUser(this.form.value);
    console.log(this.storageService.getUsers());
  }
}
