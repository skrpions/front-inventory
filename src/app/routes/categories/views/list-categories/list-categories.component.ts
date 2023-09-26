import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryEntity } from '../../domain/entities/category-entity';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { CategoryApplication } from '../../application/category-application';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { UtilsService } from 'src/app/shared/services/utils.service';

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


  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly categoryApplication = inject(CategoryApplication);
  public dialog = inject(MatDialog);
  public toastr = inject(ToastrService);
  private utilSrv = inject(UtilsService);


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

    if(rawData.metadata[0].code === "200") {

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

    const reference = this.dialog.open(FormCategoryComponent, {
      data: row,
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    reference.afterClosed().subscribe(response => {

      if (!response) return;

      const id: number = response.id;
      delete response.id;

      if (id) {
        // Update entity
        this.updateCategory(id, response);
      } else {
         // New entity
        this.addCategory(response);
      }
    });
  }

  private updateCategory(id: number, response: any) {
    this.categoryApplication.update(id, response).subscribe({
      next: () => {
        this.utilSrv.handleSuccess('Updated');
        this.getAll();
      },
      error: () => {
        this.utilSrv.handleError('updating');
      }
    });
  }

  private addCategory(response: any) {
    this.categoryApplication.add(response).subscribe({
      next: () => {
        this.utilSrv.handleSuccess('Added');
        this.getAll();
      },
      error: () => {
        this.utilSrv.handleError('adding');
      },
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

          this.utilSrv.handleSuccess('Deleted');
          this.getAll();
        },
      });

    });

  }

}
