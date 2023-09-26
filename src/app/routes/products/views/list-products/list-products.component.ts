import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProductApplication } from '../../application/product-application';
import { ProductEntity } from '../../domain/entities/product-entity';
import { FormProductComponent } from '../form-product/form-product.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
  icon_header = 'code';
  title_header = 'titles.projects';
  //messages!: Messages;

  filterValue = '';
  totalRecords = 0;
  durationInSeconds = 3;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'picture', 'name', 'price', 'account', 'category', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly productApplication = inject(ProductApplication);
  public dialog = inject(MatDialog);
  public toastr = inject(ToastrService);
  private utilsSrv = inject(UtilsService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productApplication.list().subscribe({
      next: (rawData: any) => {
        this.processResponse(rawData);
      },
    });
  }

  processResponse(rawData: any) {
    const data: ProductEntity[] = [];

    if(rawData.metadata[0].code === "200") {

      let listProducts = rawData.productResponse.product;

      listProducts.forEach((product: ProductEntity) => {

        // Directly assign the imagebase 64 and category to each product.
        product.picture = 'data:image/png;base64,' + product.picture;

        data.push(product);
      });

      this.dataSource = new MatTableDataSource<ProductEntity>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalRecords = data.length;
    }

  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm(enterAnimationDuration: string, exitAnimationDuration: string, row: any = null!) {
    console.log('row', row);

    const reference = this.dialog.open(FormProductComponent, {
      data: row,
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    reference.afterClosed().subscribe(response => {
      console.log('response received:', response);

      if (!response) return;

      const id = response.id;
      delete response.id;

      const formData = this.createFormDataFromResponse(response);

      if (id) {
        // Update entity
        this.updateProduct(id, formData);
      } else {
         // New entity
        this.addProduct(formData);
      }
    });
  }

  private createFormDataFromResponse(response: any): FormData {

    const formData = new FormData();

    formData.append('name', response.name);
    formData.append('picture', response.picture);
    formData.append('price', response.price);
    formData.append('account', response.account);
    formData.append('categoryId', response.category);

    if (!(response.picture instanceof File)) {
      const picture: any = this.utilsSrv.convertBase64ToFile(response.picture);
      formData.append('picture', picture);
    }

    return formData;
  }

  private updateProduct(id: any, formData: FormData) {
    this.productApplication.update(id, formData).subscribe({
      next: () => {
        this.handleSuccess('Updated');
      },
      error: () => {
        this.handleError('updating');
      },
    });
  }

  private addProduct(formData: FormData) {
    this.productApplication.add(formData).subscribe({
      next: () => {
        this.handleSuccess('Added');
      },
      error: () => {
        this.handleError('adding');
      },
    });
  }

  private handleSuccess(action: string) {
    this._snackBar.open(`✔ Ok, ${action}`, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: this.durationInSeconds * 1000,
      panelClass: ['green-snackbar'],
    });

    this.getAll();
  }

  private handleError(action: string) {
    this._snackBar.open(`❌ Error ${action}`, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar'],
    });
    console.log(`Error ${action}`);
  }


  delete(enterAnimationDuration: string, exitAnimationDuration: string, row: any = null!) {

    const reference = this.dialog.open(ConfirmComponent, {
      data: row,
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    reference.afterClosed().subscribe(response => {

      if (!response) return;

      this.productApplication.delete(row.id).subscribe({
        next: () => {

          // Success
          this._snackBar.open('✔ Ok, Deleted', '', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: this.durationInSeconds * 1000,
            panelClass: ['green-snackbar']
          });

          // Actualiza la fuente de datos
          this.getAll();
        },
      });

    });
  }
}
