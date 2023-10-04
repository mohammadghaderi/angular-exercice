import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeHttpService, randStudent } from 'src/app/data-access/fake-http.service';
import { StudentStore } from 'src/app/data-access/student.store';
import { CardType } from 'src/app/model/card.model';
import { Student } from 'src/app/model/student.model';
import { CardComponent } from 'src/app/ui/card/card.component';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students$ | async"
    customClass="bg-light-green"
    (deleteItem)="deleteStudent($event)"

  >
  <img
    class="cardHeader"
    src="assets/img/student.webp"
    width="200px"
    alt="student icon"
  />
  <button
    class="cardAction border border-blue-500 bg-blue-300 p-2 rounded-sm"
    (click)="addNewStudent()"
  >
    Add
  </button>
  </app-card>`,
  standalone: true,
  imports: [CardComponent,AsyncPipe],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StudentCardComponent implements OnInit {
  students$: Observable< Student[]> = this.store.students$;
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  addNewStudent(): void {
    this.store.addOne(randStudent())
  }
  deleteStudent(id:number): void {
    this.store.deleteOne(id);
  }
}
