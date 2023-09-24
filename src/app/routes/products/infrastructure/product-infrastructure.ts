import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ProductEntity } from "../domain/entities/product-entity";

@Injectable()
export class ProductInfrastructure {

  constructor(private readonly http: HttpClient) {}

  list(): Observable<ProductEntity[]> {
    return this.http.get<ProductEntity[]>(`${environment.apiPath}products`);
  }

  add(entity: Partial<ProductEntity>): Observable<ProductEntity> {
    return this.http.post<ProductEntity>(`${environment.apiPath}products`, entity);
  }
}
