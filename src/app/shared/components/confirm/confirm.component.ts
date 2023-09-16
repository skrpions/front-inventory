import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryEntity } from 'src/app/routes/categories/domain/entities/category-entity';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  icon_header = 'notification_important';
  title_header = 'Elimination';

  messages: string[] = []; // ['¿Está seguro de eliminar el registro?', 'Juan Perez'];
  question: string = '¿Está seguro de eliminar el registro?'; // '¿Está seguro de eliminar el registro?';
  name = ''; // 'Juan Perez';

  private data: CategoryEntity = inject(MAT_DIALOG_DATA);

  ngAfterContentInit(): void {
    console.log('row', this.data);

    this.name = this.data.name;
  }

}
