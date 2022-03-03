import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { convertSnaps } from './shared/util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath: string = '/products';
  productsRef: AngularFirestoreCollection<Product>; 

  constructor(private afs: AngularFirestore) {
    this.productsRef = afs.collection(this.dbPath);
  }
  getList(): Observable<Product[]> {
    return this.afs.collection(this.dbPath)
      .get().pipe(
        map(res => convertSnaps<Product>(res))
      )
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.afs.collection(
      this.dbPath,
      ref => ref.where('category', 'array-contains', category)
    )
      .get().pipe(
        map(res => convertSnaps<Product>(res))
      )
  }

  getProductsByKeyWord(keyword: string): Observable<Product[]> {
    return this.afs.collection(
      this.dbPath,
      ref => ref.where('title', '>', keyword).where('title', '<', keyword + '\uf8ff')
    )
      .get().pipe(
        map(res => convertSnaps<Product>(res))
      );
  }

  getProductById(id: string): AngularFirestoreDocument<Product> {
    return this.productsRef.doc(id)
  }

  getProductByProductId(id: number): AngularFirestoreCollection<Product> {   
    return this.afs.collection(this.dbPath, ref => ref.where('id', '==', id));
  }

}
