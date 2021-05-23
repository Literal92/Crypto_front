import { Component } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Product } from './product';
import { SelectItem } from 'primeng/api';
import { ProductService } from './productservice';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[];

  products: Product[] = [];

  sortOptions: SelectItem[];

  sortOrder: number = -1;

  sortField: string;
  realTimeDataSubscription$: Subscription;
  
  constructor(private productService: ProductService, private primengConfig: PrimeNGConfig) { }

  
  ngOnInit(): void {
    this.realTimeDataSubscription$ = timer(0, 30000)
    .pipe(switchMap(_ => this.productService.getCrypto()))
    .subscribe(data => {
      this.products = data;
    });
    this.items = [
      {
        label: 'Crypto',
        icon: 'pi pi-fw pi-chart-bar',
      }
    ];
  }
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
