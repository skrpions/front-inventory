import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductEntity } from '../../domain/entities/product-entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryApplication } from 'src/app/routes/categories/application/category-application';
import { CategoryEntity } from 'src/app/routes/categories/domain/entities/category-entity';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent {
  icon_header = '';
  title_header = '';
  reactiveForm!: FormGroup;
  photoToShow = '';
  listCategories: CategoryEntity[] = [];

  private fb = inject(FormBuilder);
  private data: ProductEntity = inject(MAT_DIALOG_DATA);
  private reference = inject(MatDialogRef);

  private readonly categoryApplication = inject(CategoryApplication);

  ngOnInit(): void {

    this.icon_header = this.data ? 'edit' : 'add';
    this.title_header = this.data ? 'Edit' : 'New';

    this.getAllCategories();
    this.initForm();
  }

  private initForm(): void {
    this.reactiveForm = this.fb.nonNullable.group({
      id: this.data?.id,
      name: [this.data?.name, [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
      price: [this.data?.price, [Validators.required, Validators.min(0)]],
      account: [this.data?.account, [Validators.required, Validators.min(0)]],
      category: [this.data?.category, [Validators.required]],
    });

    // Se agrega un control "picture" solo si no hay datos en la variable "data".
    // De lo contrari o, se agrega el control sin ninguna validación específica.
    if (this.data) {
      this.reactiveForm.addControl('picture', new FormControl());
      this.photoToShow = this.data.picture ? this.data.picture : '';
    } else {
      this.reactiveForm.addControl('picture', new FormControl(null, Validators.required));
    }

    this.reactiveForm.valueChanges.subscribe(() => {
      console.log(this.reactiveForm.value);
    });


  }

  get nameField() {
    return this.reactiveForm.get('name');
  }

  get priceField() {
    return this.reactiveForm.get('price');
  }

  get accountField() {
    return this.reactiveForm.get('account');
  }

  get categoryField() {
    return this.reactiveForm.get('category');
  }

  getAllCategories() {
    this.categoryApplication.list().subscribe({
      next: (rawData: any) => {
        this.processResponse(rawData);
      },
    });
  }

  processResponse(rawData: any) {

    if(rawData.metadata[0].code === "200") {
      this.listCategories = rawData.categoryResponse.category;
    }

  }

  save() {
    if (this.reactiveForm.invalid) return this.reactiveForm.markAllAsTouched(); // Activate all errors

    const record: ProductEntity = this.reactiveForm.value;
    this.reference.close(record);
  }
}
