import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
    <ng-content select="name"></ng-content>
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports:[NgTemplateOutlet]

})
export class ListItemComponent {
  @Input() id!: number;
  @Output () deleteItem: EventEmitter<number> = new EventEmitter();
  @Input() name!:string;

  constructor(
  ) {
  }

  delete(id: number) {
    this.deleteItem.emit(id);
  }
}
