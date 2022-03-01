import { NgModule } from '@angular/core';
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryListComponent,
    SearchComponent,
    ProductDetailComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
