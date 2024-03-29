import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ProductEntity } from "../domain/entities/product-entity";

@Injectable()
export class ProductInfrastructure {

  constructor(private readonly http: HttpClient) {}

  list(): Observable<ProductEntity[]> {
    return this.http.get<ProductEntity[]>(`${environment.apiPath}/products`);
  }

  listByName(name: string): Observable<ProductEntity[]> {
    return this.http.get<ProductEntity[]>(`${environment.apiPath}/products/filter/${name}`);
  }

  add(entity: Partial<ProductEntity>): Observable<ProductEntity> {
    return this.http.post<ProductEntity>(`${environment.apiPath}/products`, entity);
  }

  update(id: string, entity: ProductEntity): Observable<ProductEntity> {
    return this.http.put<ProductEntity>(`${environment.apiPath}/products/${id}`, entity);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<ProductEntity>(`${environment.apiPath}/products/${id}`);
  }

  // More
  exportToExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiPath}/products/export/excel`, {
      responseType: 'blob'
    });
  }
}
