import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryEntity } from '../../domain/entities/category-entity';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { CategoryApplication } from '../../application/category-application';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

export type Messages = {
  confirm: string;
  insert: string;
  update: string;
  delete: string;
};
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  icon_header = 'code';
  title_header = 'titles.projects';
  messages!: Messages;

  filterValue = '';
  totalRecords = 0;
  durationInSeconds = 3;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly categoryApplication = inject(CategoryApplication);
  public dialog = inject(MatDialog);
  public toastr = inject(ToastrService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.categoryApplication.list().subscribe({
      next: (rawData: any) => {
        this.processResponse(rawData);
      },
    });
  }

  processResponse(rawData: any) {
    const data: CategoryEntity[] = [];

    if(rawData.metadata[0].code === "00") {

      let listCategories = rawData.categoryResponse.category;

      listCategories.forEach((category: CategoryEntity) => {
        data.push(category);
      });
      console.log('data', data);

      this.dataSource = new MatTableDataSource<CategoryEntity>(data); // Asignar los datos al atributo 'data'
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

    const reference = this.dialog.open(FormCategoryComponent, {
      data: row,
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    reference.afterClosed().subscribe(response => {
      if (!response) return;

      const id = response.id;
      delete response.id;

      if (id) {
        // Update entity
        this.categoryApplication.update(id, response).subscribe({
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

        });
      } else {

        // New entity
        this.categoryApplication.add(response).subscribe({
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
            this._snackBar.open('❌ Error updating', '', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: this.durationInSeconds * 1000,
              panelClass: ['red-snackbar']
            });
          }
        });
      }
    });
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

      this.categoryApplication.delete(row.id).subscribe({
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

    /* this.utilsSvc.confirm(confirmMessage).subscribe(response => {
      if (response) {
        this.application.delete(id).subscribe({
          next: () => {
            this.changePage(objectPaginationWithCurrentPage);
            this.toast.success(this.translate.instant(this.messages.delete));
          },
        });
      }
    }); */
  }

  /* delete(id: number, record = '') {

    this.categoryApplication.delete(id).subscribe({
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
  } */
}
