import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductApplication } from 'src/app/routes/products/application/product-application';
import { ProductEntity } from 'src/app/routes/products/domain/entities/product-entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  icon_header = 'dashboard';
  title_header = 'Dashboard';

  chartBar: any;
  chartDoughnut: any;

  private readonly productApplication = inject(ProductApplication);

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productApplication.list().subscribe({
      next: (rawData: any) => {
        this.processResponse(rawData);
      },
    });
  }

  processResponse(rawData: any) {

    const nameProducts : string[] = [];
    const account: number[] = [];

    if(rawData.metadata[0].code === "200") {

      let listProducts = rawData.productResponse.product;

      listProducts.forEach((product: ProductEntity) => {

        nameProducts.push(product.name);
        account.push(product.account);
      });

      this.graphBar(nameProducts, account);
      this.graphDoughnut(nameProducts, account);
    }

  }

  graphBar(nameProducts: string[], account: number[]) {
    this.chartBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels: nameProducts,
        datasets: [
          {
            label: 'Products',
            data: account
          }
        ]
      }
    });
  }

  graphDoughnut(nameProducts: string[], account: number[]) {
    this.chartDoughnut = new Chart('canvas-doughnut', {
      type: 'doughnut',
      data: {
        labels: nameProducts,
        datasets: [
          {
            label: 'Products',
            data: account
          }
        ]
      }
    });
  }

}
