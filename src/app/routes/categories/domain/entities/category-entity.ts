interface CategoryEssentials {
  metadata: Metadaum[]
  categoryResponse: CategoryResponse
}

interface Metadaum {
  date: string
  code: string
  type: string
}

interface CategoryResponse {
  category: Category[]
}

interface Category {
  id: number
  name: string
  description: string
}

export type CategoryEntity = Required<Category>;
//export type CategoryEntity = Required<CategoryEssentials>;

/* export type CategoryProperties = Required<CategoryEssentials> & Partial<CategoryOptionals>;
export type CategoryUpdate = Partial<CategoryEssentials>;

export class CategoryEntity {
  public name!: string;
  public image!: string;
  public attack!: number;
  public defense!: number;
  private readonly id!: string;
  public hp!: number;
  public idAuthor!: number;
  public type!: string;


  constructor(properties: CategoryProperties) {
    Object.assign(this, properties);
  }

  properties(): CategoryProperties {
    return {
      name: this.name,
      image: this.image,
      attack: this.attack,
      defense: this.defense,
      id: this.id,
      hp: this.hp,
      idAuthor: this.idAuthor,
      type: this.type,
    };
  }

  update(properties: CategoryUpdate) {
    Object.assign(this, properties);
  }
}
 */
