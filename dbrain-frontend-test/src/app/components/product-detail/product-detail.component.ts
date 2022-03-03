import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetail();
    });
  }

  handleProductDetail() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductByProductId(productId).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({ id: c.payload.doc['id'], ...c.payload.doc.data() }))
      )
    ).subscribe(data=> {
      this.product = data[0];
    })
  }

  addToCart() {
    const cartItem: CartItem = new CartItem(this.product);
    this.cartService.addCartItem(cartItem);
  }
}
