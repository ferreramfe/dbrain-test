import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productCategories?: ProductCategory[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.categoryService.getCategoryList().subscribe(
      res => {
        this.productCategories = res;
      }
    )
  }

}
