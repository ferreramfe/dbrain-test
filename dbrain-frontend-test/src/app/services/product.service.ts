import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from "@firebase/firestore";

import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private fireStore: Firestore 
  ) {}

  getProductList(): Observable<Product[]> {
    const products = collection(this.fireStore, 'products')
    return collectionData(products)
  }
}
