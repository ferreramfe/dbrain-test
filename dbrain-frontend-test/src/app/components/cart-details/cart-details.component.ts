import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
    this.cartService.computeCartTotals();
    this.handleAmount();
  }

  listCartDetails() {
    this.cartService.getList().subscribe(
      data => {
        this.cartItems = data;
      }
    );
  }

  handleAmount() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );
  }

  incrementQuantity(refId: string, cartItem: CartItem) {    
    this.cartService.incrementQuantity(refId, cartItem);
    this.listCartDetails();
  }

  decrementQuantity(refId: string, cartItem: CartItem) {
    if (cartItem.quantity === 1) {
      this.removeItem(refId, cartItem)
    } else {
      this.cartService.decrementQuantity(refId, cartItem);
    }
    this.listCartDetails();
  }

  removeItem(refId: string, cartItem: CartItem) {
    this.cartService.deleteItem(refId, cartItem).subscribe();
    this.listCartDetails();
  }
}
