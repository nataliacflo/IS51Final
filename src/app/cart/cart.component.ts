import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { IUser } from '../login/login.component';
import { Local } from 'protractor/built/driverProviders';
import { LocalStorageService } from '../localStorageService';

export interface IBike {
  id?: number;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;

}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Array<IBike> = [];
  nameParams = '';
  localStorageService: LocalStorageService<IBike>;
  currentUser: IUser;

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.localStorageService = new LocalStorageService('carts');
  }

  async ngOnInit() {
    const savedBikes = JSON.parse(localStorage.getItem('carts'));
    if (savedBikes && savedBikes.length > 0) {
      this.carts = savedBikes;
    } else {
      this.carts = await this.loadBikeFromFile();
    }

  }

  async loadBikeFromFile() {
    const bikes = await this.http.get('assets/inventory.json').toPromise();
    return bikes.json();
  }

  addItem(item: string) {
    switch (item) {
      case 'model one':
        this.carts.unshift({
          'id': 1,
          'image': '../../assets/bike1.jpeg',
          'description': 'Bike Model 1',
          'price': 5000,
          'quantity': 0
        });
        break;
      case 'model two':
        this.carts.unshift({
          'id': 2,
          'image': '../../assets/bike2.jpeg',
          'description': 'Bike Model 2',
          'price': 4000,
          'quantity': 0
        });
        break;
      case 'model three':
        this.carts.unshift({
          'id': 3,
          'image': '../../assets/bike3.jpeg',
          'description': 'Bike Model 3',
          'price': 3000,
          'quantity': 0
        });
        break;
    }
  }

  saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(index: number) {
    this.carts.splice(index, 1);
    this.saveToLocalStorage('carts', this.carts);
  }

  save(key: string, data: Array<IBike>) {
    this.saveToLocalStorage(key, data);
    this.toastService.showToast('success', 2000, 'Saved Successfully!');
  }





}



