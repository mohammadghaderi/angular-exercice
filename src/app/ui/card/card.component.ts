import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CardType } from 'src/app/model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [ NgFor, ListItemComponent,CommonModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  styles:[
    `
     .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
      .bg-light-blue {
        background-color: rgba(0, 0, 255, 0.1);
      }
    `
  ]

})
export class CardComponent implements OnInit {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() deleteItem = new EventEmitter();
  @Input('listTemplate') listTemplate!:TemplateRef<any>;
  CardType = CardType;

  constructor() {
  }
  

  ngOnInit(): void {}
}
