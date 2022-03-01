import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from "../../common/product";
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  chosenCategory?: string;
  products?: Product[];
  categories?: ProductCategory[];
  currentCategoryId?: number;
  searchMode?: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {  
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    }) 
  }

  listProducts() {
    // const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('categoryName');
    if (hasCategory) {         
      this.chosenCategory = this.route.snapshot.url[1].path;
      this.productService.getProductListByCategory(this.chosenCategory!).subscribe(
        res => {
          this.products = res;
        }
      );
    } else {
      this.productService.getProductList().subscribe(
        res => {
          this.products = res;
        }
      )
    } 
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.getProductListByName(keyword).subscribe(
      res => {
        console.log(res);
        this.products = res;
      }
    );
  }
}