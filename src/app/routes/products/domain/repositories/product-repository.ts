import { Observable } from "rxjs";
import { ProductEntity } from "../entities/product-entity";

export interface ProductRepository {
  list(): Observable<ProductEntity[]>;
  add(productEntity: Partial<ProductEntity>): Observable<ProductEntity>;
  update(id: number, productEntity: Partial<ProductEntity>): Observable<ProductEntity>;
  delete(id: number): Observable<ProductEntity>;
}
