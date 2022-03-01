import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where } from "@firebase/firestore";

import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fireStore: Firestore ) { }

  getCategoryList(): Observable<ProductCategory[]> {
    const categories = collection(this.fireStore, 'categories')
    return collectionData(categories, { idField: 'id' })
  }
}
