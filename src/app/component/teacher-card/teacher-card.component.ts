import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeHttpService, randTeacher } from 'src/app/data-access/fake-http.service';
import { TeacherStore } from 'src/app/data-access/teacher.store';
import { CardType } from 'src/app/model/card.model';
import { Teacher } from 'src/app/model/teacher.model';
import { CardComponent } from 'src/app/ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers | async"
    customClass="bg-light-red"
    (deleteItem)="deleteTeacher($event)"
  >
  <img
    class="cardHeader"
    src="assets/img/teacher.png"
    width="200px"
    alt="teacher icon"
  />
  <button
    class="cardAction border border-blue-500 bg-blue-300 p-2 rounded-sm"
    (click)="addNewTeacher()"
  >
    Add
  </button>
  </app-card>`,
  standalone: true,
  imports: [CardComponent,AsyncPipe],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class TeacherCardComponent implements OnInit {
  teachers:Observable< Teacher[]> = this.store.teachers$;
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher())
  }

  deleteTeacher(id:number): void {
    this.store.deleteOne(id);
  }
}
