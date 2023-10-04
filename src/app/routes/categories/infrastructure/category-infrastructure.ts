import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryEntity } from "../domain/entities/category-entity";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

@Injectable()
export class CategoryInfrastructure {

  constructor(private readonly http: HttpClient) {}

  list(): Observable<CategoryEntity[]> {
    return this.http.get<CategoryEntity[]>(`${environment.apiPath}/categories`);
  }

  listOne(id: string): Observable<CategoryEntity | undefined> {
    return this.http.get<CategoryEntity>(`${environment.apiPath}/categories/${id}`);
  }

  add(entity: Partial<CategoryEntity>): Observable<CategoryEntity> {
    return this.http.post<CategoryEntity>(`${environment.apiPath}/categories`, entity);
  }

  update(id: string, entity: CategoryEntity): Observable<CategoryEntity> {
    return this.http.put<CategoryEntity>(`${environment.apiPath}/categories/${id}`, entity);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<CategoryEntity>(`${environment.apiPath}/categories/${id}`);
  }

  // More
  exportToExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiPath}/categories/export/excel`, {
      responseType: 'blob'
    });
  }
}
