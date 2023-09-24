import { Inject, Injectable } from "@angular/core";
import { ProductInfrastructure } from "../infrastructure/product-infrastructure";
import { ProductRepository } from "../domain/repositories/product-repository";
import { ProductEntity } from "../domain/entities/product-entity";

@Injectable()
export class ProductApplication {

  constructor(@Inject(ProductInfrastructure) private readonly productRepository: ProductRepository) {}

  list() {
    return this.productRepository.list();
  }

  add(productEntity: Partial<ProductEntity>) {
    return this.productRepository.add(productEntity);
  }
}
