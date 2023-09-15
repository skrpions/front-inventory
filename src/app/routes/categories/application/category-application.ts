import { Inject, Injectable } from "@angular/core";
import { CategoryInfrastructure } from "../infrastructure/category-infrastructure";
import { CategoryRepository } from "../domain/repositories/category-repository";
import { CategoryEntity } from "../domain/entities/category-entity";
import { Observable } from "rxjs";

@Injectable()
export class CategoryApplication {

  constructor(@Inject(CategoryInfrastructure) private readonly categoryRepository: CategoryRepository) {}

  list() {
    return this.categoryRepository.list();
  }

  listOne(id:number) {
    return this.categoryRepository.listOne(id);
  }

  add(categoryEntity: Partial<CategoryEntity>) {
    return this.categoryRepository.add(categoryEntity);
  }

  update(id: number, entity: Partial<CategoryEntity>): Observable<CategoryEntity> {
    return this.categoryRepository.update(id, entity);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
