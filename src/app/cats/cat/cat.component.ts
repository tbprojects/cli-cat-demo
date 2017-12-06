import { Component, Input, OnInit } from '@angular/core';
import { Cat } from '../cat';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
  @Input() cat: Cat;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
