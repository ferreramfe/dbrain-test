import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductsByCategoryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
