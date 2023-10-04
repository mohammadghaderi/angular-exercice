import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityStore } from 'src/app/data-access/city.store';
import { FakeHttpService, randomCity } from 'src/app/data-access/fake-http.service';
import { CardType } from 'src/app/model/card.model';
import { City } from 'src/app/model/city.model';
import { CardComponent } from 'src/app/ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
  <ng-template 
  #cityTemplate let-city>
{{city.name}}
</ng-template>
  <app-card
    [list]="cities$ | async"
    customClass="bg-light-blue"
    (deleteItem)="deleteCity($event)"
    [listTemplate]="cityTemplate"
  >
  <img
    class="cardHeader"
    src="assets/img/city.png"
    width="200px"
    alt="city icon"
  />
  <button
    class="cardAction border border-blue-500 bg-blue-300 p-2 rounded-sm"
    (click)="addNewCity()"
  >
    Add
  </button>
  </app-card>`,
  standalone: true,
  imports: [CardComponent,AsyncPipe],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CityCardComponent implements OnInit {
  cities$: Observable< City[]> = this.store.cities$;
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }
  addNewCity(): void {
    this.store.addOne(randomCity())
  }
  deleteCity(id:number): void {
    this.store.deleteOne(id);
  }
}
