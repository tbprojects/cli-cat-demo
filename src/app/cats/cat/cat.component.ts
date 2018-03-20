import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cat } from '../cat';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent {
  @Input() cat: Cat;
  @Input() index: number;
  @Output() catRemoved = new EventEmitter();

  constructor() { }

  remove() {
    this.catRemoved.emit(this.cat);
  }
}
