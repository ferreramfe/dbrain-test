import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from "../../common/product";
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  chosenCategory?: string;
  products?: Product[];
  categories?: ProductCategory[];
  searchMode?: boolean;
  cartList?: CartItem[] = [];
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {  
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }    
  }

  handleListProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('categoryName');
    
    if (hasCategory) {
      this.chosenCategory = this.route.snapshot.url[1].path;
      this.productService.getProductsByCategory(this.chosenCategory!).subscribe(
        data => {     
          this.products = data;
        }
      );
    } else {
      this.productService.getList().subscribe(
        data => {     
          this.products = data;        
        }
      );
    } 
    
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.getProductsByKeyWord(keyword).subscribe(
      data => {     
        this.products = data;        
      }
    );
  }

  addToCart(product: Product, refId: string) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;
    this.cartService.getList().subscribe(
      data => {
        this.cartList = data;
      }
    )

    if (this.cartList!.length > 0) {
      existingCartItem = this.cartList!.find( tempCartItem => tempCartItem.productId === refId )!;
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    
    if (alreadyExistsInCart) {
      this.cartService.incrementQuantity(existingCartItem.refId!, existingCartItem)
    } else {
      const cartItem = new CartItem(product);
      this.cartService.addCartItem(cartItem);
    }
  }
}