import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productCategories?: ProductCategory[];
  showCategories?: boolean;
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    let route = this.route.snapshot.url.length;
    this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({ id: c.payload.doc['id'], ...c.payload.doc.data() }))
      )
    ).subscribe(data=> {
      if (route === 0) {
        this.productCategories = data;        
        this.showCategories = true;  
      } else {
        this.showCategories = false;
      }
    });
  }
}