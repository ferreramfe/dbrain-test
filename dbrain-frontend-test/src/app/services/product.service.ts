import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where, getDocs } from "@firebase/firestore";

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
    return collectionData(products, { idField: 'id' })
  }

  async getProductListByCategoryId(id: number): Promise<Observable<Product[]>> {
    const products = collection(this.fireStore, 'products')
    const q = query(products, where('categoryId', '==', id))
    const querySnapshot = await getDocs(q); 
    let res: any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      res.push({ ...doc.data(), id: doc.id })
    });
    console.log(res);
    return res as Observable<Product[]>;
  }
}
