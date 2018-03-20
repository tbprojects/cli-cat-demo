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
    this.loadCats();
  }

  loadCats(): void {
    this.catService.getCats().subscribe(this.catsLoaded.bind(this), this.errorOccurred);
  }

  addCat(cat: Cat): void {
    this.catService.addCat(cat).subscribe(this.catSaved.bind(this), this.errorOccurred);
  }

  removeCat(cat: Cat): void {
    this.catService.removeCat(cat.id).subscribe(this.catRemoved.bind(this), this.errorOccurred);
  }

  private catsLoaded(cats: Cat[]): void {
    this.cats = cats;
  }

  private catSaved(cat: Cat): void {
    this.cats.push(cat);
  }

  private catRemoved(cat: Cat): void {
    const catIndex = this.cats.findIndex((c) => c.id === cat.id);
    this.cats.splice(catIndex, 1);
  }

  private errorOccurred(error: HttpErrorResponse): void {
    window.alert(error.message);
  }
}
