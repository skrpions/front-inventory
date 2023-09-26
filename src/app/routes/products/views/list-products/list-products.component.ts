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
    console.log('RawData', rawData);

    if(rawData.metadata[0].code === "200") {

      let listProducts = rawData.productResponse.product;

      listProducts.forEach((product: ProductEntity) => {

        // Directly assign the imagebase 64 and category to each product.
        product.picture = 'data:image/png;base64,' + product.picture;
        product.category = product.category.name;

        data.push(product);
      });
      console.log('data', data);

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

      console.log('response received: ', response);

      if (!response) return;

      const id = response.id;
      delete response.id;

      const formData = new FormData();

      formData.append('picture', response.picture, response.picture.name);
      formData.append('name', response.name);
      formData.append('price', response.price);
      formData.append('account', response.account);
      formData.append('categoryId', response.category);


      if (id) {
        // Update entity
        /* this.productApplication.update(id, response).subscribe({
          next: () => {

            // Success
            this._snackBar.open('✔ Ok, Updated', '', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: this.durationInSeconds * 1000,
              panelClass: ['green-snackbar']
            });

            // Actualiza la fuente de datos
            this.getAll();

          },error: (err) => {
            // Manejo de errores
            this._snackBar.open('❌ Error updating', '', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: this.durationInSeconds * 1000,
              panelClass: ['red-snackbar']
            });
          }

        }); */
      } else {

        // New entity
        this.productApplication.add(formData).subscribe({
          next: () => {

            // Success
            this._snackBar.open('✔ Ok, Added', '', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: this.durationInSeconds * 1000,
              panelClass: ['green-snackbar']
            });

            // Actualiza la fuente de datos
            this.getAll();

          },error: (err) => {
            // Manejo de errores
            this._snackBar.open('❌ Error adding', '', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: this.durationInSeconds * 1000,
              panelClass: ['red-snackbar']
            });
            console.log('Error: ', err);

          }
        });
      }
    });
  }

  delete(enterAnimationDuration: string, exitAnimationDuration: string, row: any = null!) {

   /*  const reference = this.dialog.open(ConfirmComponent, {
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

    }); */
  }
}
