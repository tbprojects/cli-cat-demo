import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cat } from '../cat';

@Component({
  selector: 'app-cat',
  template: `
    {{ cat.name | kittize }}
    <button (click)="remove()">X</button>
    <img [src]="cat.src" appZoomImage>
  `,
  styleUrls: ['./cat.component.css']
})
export class CatComponent {
  @Input() cat: Cat;
  @Output() catRemoved = new EventEmitter();

  remove() {
    this.catRemoved.emit(this.cat);
  }
}
