import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

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
