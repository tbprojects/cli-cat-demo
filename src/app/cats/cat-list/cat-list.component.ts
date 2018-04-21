import { Component, OnInit } from '@angular/core';
import { Cat } from '../cat';
import { CatService } from '../cat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {
  cats: Cat[] = [];

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.catService.getCats()
      .subscribe((cats) => this.cats = cats);
  }

  addCat(cat: Cat): void {
    this.catService.addCat(cat)
      .subscribe((cat) => this.cats.push(cat));
  }

  removeCat(cat: Cat): void {
    this.catService.removeCat(cat.id)
      .subscribe((cat) => {
        const catIndex = this.cats.findIndex((c) => c.id === cat.id);
        this.cats.splice(catIndex, 1);
      });
  }
}
