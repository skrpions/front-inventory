import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryEntity } from '../../domain/entities/category-entity';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { CategoryApplication } from '../../application/category-application';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit{
  icon_header = 'code';
  title_header = 'titles.projects';

  filterValue = '';
  totalRecords = 0;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly categoryApplication = inject(CategoryApplication);
  public dialog = inject(MatDialog)

  constructor() {}

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
      this.totalRecords = data.length;
    }

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.paginator.pageSize = 5; // Configura el tamaño de página que desees
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
            console.log('Actualizado:', response);

            // Actualiza la fuente de datos con el nuevo registro
            this.getAll();
            console.log('Actualizado');

            //this.toastr.success('Updated', 'Ok!');
            //this.dataSource.data = [...this.dataSource.data];

            //this.toast.success(this.translate.instant(this.messages.update));
          },
        });
      } else {

        // Agregaré un id manualmente para que no de error al insertar
        response.id = this.dataSource.data.length + 1;

        // New entity
        this.categoryApplication.add(response).subscribe({
          next: () => {

            // Actualiza la fuente de datos con el nuevo registro
            this.getAll();
            console.log('Agregado');
            //this.toastr.success('Added', 'Ok!');
            //this.dataSource.data = [...this.dataSource.data];

            //this.toast.success(this.translate.instant(this.messages.insert));
          },
        });
      }
    });
  }

  delete(id: number, record = '') {

    this.categoryApplication.delete(id).subscribe({
      next: () => {

        // Actualiza la fuente de datos con el nuevo registro
        this.getAll();
        console.log('Eliminado');

        //this.dataSource.data = [...this.dataSource.data];
        //this.toastr.success('Deleted', 'Ok!');
        //this.toast.success(this.translate.instant(this.messages.delete));
      },
    });
  }
}
