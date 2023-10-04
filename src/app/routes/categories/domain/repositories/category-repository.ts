import { Observable } from "rxjs";
import { CategoryEntity } from "../entities/category-entity";

export interface CategoryRepository {
  list(): Observable<CategoryEntity[]>;
  listOne(id: number): Observable<CategoryEntity>;
  add(categoryEntity: Partial<CategoryEntity>): Observable<CategoryEntity>;
  update(id: number, categoryEntity: Partial<CategoryEntity>): Observable<CategoryEntity>;
  delete(id: number): Observable<CategoryEntity>;
  exportToExcel(): Observable<Blob>;
}
