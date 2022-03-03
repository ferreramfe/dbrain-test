import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../common/cart-item';
import { convertSnaps } from './shared/util';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dbPath: string = '/carts';
  cartItems: CartItem[] = [];
  cartItemId?: string;
  totalQuantity: Subject<number> = new Subject<number>();
  totalPrice: Subject<number> = new Subject<number>();

  cartsRef: AngularFirestoreCollection<CartItem>; 

  constructor(private afs: AngularFirestore) { 
    this.cartsRef = afs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<CartItem> {
    return this.cartsRef;
  }

  getList(): Observable<CartItem[]> {
    return this.afs.collection(this.dbPath)
      .get().pipe(
        map(res => convertSnaps<CartItem>(res))
      )
  }

  addCartItem(cartItem: CartItem): any {
    this.cartsRef.add({ ...cartItem })
    this.cartItems.push(cartItem);
    this.computeCartTotals();
  } 

  deleteItem(id: string, cartItem: CartItem): Observable<any> {
    const res = this.cartItems.find(item => item.productId === cartItem.productId);
    const index = this.cartItems.indexOf(res!, 0);
    if (index > -1) {      
      this.cartItems.splice(index, 1);
    }    
    this.computeCartTotals();
    return from(this.afs.doc(`carts/${id}`).delete());
  }

  getCartItemByProductId(id: string): Observable<CartItem[]> {   
    return this.afs.collection(
      this.dbPath,
      ref => ref.where('productId', '==', id)
      ).get().pipe(
        map(res => convertSnaps<CartItem>(res))
      );
  }

  incrementQuantity(id: string, cartItem: CartItem): Observable<any> {
    const res = this.cartItems.find(item => item.productId === cartItem.productId);
    res!.quantity!++;
    this.computeCartTotals();
    return from(this.afs.doc(`carts/${id}`).update({
      quantity: cartItem.quantity! + 1
    }));
  }

  decrementQuantity(id: string, cartItem: CartItem): Observable<any> {
    const res = this.cartItems.find(item => item.productId === cartItem.productId);
    res!.quantity!--;
    this.computeCartTotals();
    return from(this.afs.doc(`carts/${id}`).update({
      quantity: cartItem.quantity! - 1
    }));
  }

  computeCartTotals() {
    let totalQuantityValue: number = 0;
    let totalPriceValue: number = 0;
    for (let item of this.cartItems) {
      
      totalPriceValue += item.quantity! * item.price!;
      totalQuantityValue += item.quantity!;
    }
    this.totalQuantity.next(totalQuantityValue);
    this.totalPrice.next(totalPriceValue);
  }
}
