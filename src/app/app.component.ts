import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ProductData: any[] = [];
  errorOccurred = false;
  errorMessage = '';

  constructor(private productApi: ProductService) {}

  ngOnInit(): void {
    this.productApi.getProducts().subscribe(
      (response: any) => {
        this.ProductData = response.products;
      },
      (error) => {
        this.errorOccurred = true;
        this.errorMessage = error;
      }
    );
  }

  deleteProduct(id: string): void {
    this.productApi.deleteProduct(id).subscribe(
      (response: any) => {
        console.log(response);
        // Optionally, you can remove the deleted product from ProductData
        this.ProductData = this.ProductData.filter(prod => prod.id !== id);
      },
      (error) => {
        this.errorOccurred = true;
        this.errorMessage = error;
      }
    );
  }
}
