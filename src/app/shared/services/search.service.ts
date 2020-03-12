import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/shared/models/Category';
import { debounceTime, map, switchMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  category: Category = {category_name: ''};
  categories = [];

  constructor() { }

  search(terms: any) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap((filterType, filterValue) => this.filterTable(filterType, filterValue));
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;

    if (!value) {
      return this.categories;
    } else {
      const filtered = this.categories.filter(category => {
        if (category[filterType] !== null) {
          return category[filterType].toLowerCase().includes(value.toLowerCase());
        }
      });
      console.log(filtered);
      this.categories = filtered;
    }
  }
}
