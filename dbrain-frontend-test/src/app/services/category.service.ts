import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where } from "@firebase/firestore";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath: string = '/categories';

  categoriesRef: AngularFirestoreCollection<ProductCategory>; 
  
  constructor(private afs: AngularFirestore) { 
    this.categoriesRef = afs.collection(this.dbPath);
  }

  getCategories(): AngularFirestoreCollection<ProductCategory> {
    return this.categoriesRef;
  }
}
