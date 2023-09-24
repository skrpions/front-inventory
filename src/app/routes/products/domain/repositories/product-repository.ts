import { Observable } from "rxjs";
import { ProductEntity } from "../entities/product-entity";

export interface ProductRepository {
  list(): Observable<ProductEntity[]>;
  add(productEntity: Partial<ProductEntity>): Observable<ProductEntity>;
}
