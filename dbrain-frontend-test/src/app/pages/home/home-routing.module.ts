import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from '../../components/cart-details/cart-details.component';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';

const routes: Routes = [
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:categoryName', component: ProductListComponent },
  { path: '', component: ProductListComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
