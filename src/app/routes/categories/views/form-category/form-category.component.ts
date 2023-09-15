import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryEntity } from '../../domain/entities/category-entity';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  icon_header = '';
  title_header = '';
  reactiveForm!: FormGroup;

  private fb = inject(FormBuilder);
  private data: CategoryEntity = inject(MAT_DIALOG_DATA);
  private reference = inject(MatDialogRef);

  ngOnInit(): void {

    this.icon_header = this.data ? 'edit' : 'add';
    this.title_header = this.data ? 'Edit' : 'New';

    this.initForm();
  }

  private initForm(): void {
    this.reactiveForm = this.fb.nonNullable.group({
      id: this.data?.id,
      name: [this.data?.name, [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
      description: [this.data?.description, [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
    });
  }

  get nameField() {
    return this.reactiveForm.get('name');
  }

  get descriptionField() {
    return this.reactiveForm.get('description');
  }

  save() {
    if (this.reactiveForm.invalid) return this.reactiveForm.markAllAsTouched(); // Activate all errors

    const record: CategoryEntity = this.reactiveForm.value;
    this.reference.close(record);
  }
}
