import { Injectable } from '@angular/core';
import { Firestore, collectionData, collectionGroup, getDocs, doc, docData } from '@angular/fire/firestore';
import { collection, Query, query, where } from "@firebase/firestore";

import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fireStore: Firestore) {}

  getProductList(): Observable<Product[]> {
    const products = collection(this.fireStore, 'products')
    return this.getCollectionData(products)
  }

  getProductListByCategory(category: string): Observable<Product[]> {   
    const products = collection(this.fireStore, 'products');
    const q = query(products, where("category", "==", category));
    return this.getCollectionData(q);
  }

  getProductListByName(keyword: string): Observable<Product[]> {  
    const products = collection(this.fireStore, 'products');
    const q = query(products, where('title', '>', keyword), where('title', '<', keyword + '\uf8ff'));
    return this.getCollectionData(q);
  }

  getProductById(id: string): Observable<Product>{
    const productsRef = doc(this.fireStore, `products/${id}`);  
    return docData(productsRef, { idField: 'id' }) as Observable<Product>;
  }

  getCollectionData(query: Query): Observable<Product[]> {
    return collectionData(query, { idField: 'id' });
  }
}
