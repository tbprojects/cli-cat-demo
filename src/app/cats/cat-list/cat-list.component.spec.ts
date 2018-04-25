import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CatListComponent } from './cat-list.component';
import { Cat } from '../cat';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-cat',
  template: 'mocked cat'
})
export class CatMockComponent {
  @Input() cat: Cat;
  @Output() catRemoved = new EventEmitter();
}

export class CatMockService {
  getCats(): Observable<Cat[]> {
    return of([
      {id: 1, src: 'kitty-1.jpg', name: 'kitty-1'},
      {id: 2, src: 'kitty-2.jpg', name: 'kitty-2'}
    ]);
  }

  addCat(cat: Cat): Observable<Cat> {
    return of({id: 1, src: 'kitty-1.jpg', name: 'kitty-1'});
  }

  removeCat(id: number): Observable<Cat> {
    return of({id: 1, src: 'kitty-1.jpg', name: 'kitty-1'});
  }
}

class Page {
  constructor(private fixture: ComponentFixture<CatListComponent>) {}

  fillInput(input: DebugElement, value: string) {
    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('input'));
  }

  submitForm() {
    this.submitButton.nativeElement.click();
    this.fixture.detectChanges();
  }

  get srcInput(): DebugElement {
    return this.fixture.debugElement.query(By.css('input[name="src"]'));
  }

  get nameInput(): DebugElement {
    return this.fixture.debugElement.query(By.css('input[name="name"]'));
  }

  get submitButton(): DebugElement {
    return this.fixture.debugElement.query(By.css('form button'));
  }

  get catNodes(): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css('app-cat'));
  }
}

describe('CatListComponent', () => {
  let component: CatListComponent;
  let fixture: ComponentFixture<CatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatListComponent, CatMockComponent],
      providers: [{provide: CatService, useClass: CatMockService}],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 cats', () => {
    const catNodes = fixture.debugElement.queryAll(By.css('app-cat'));
    expect(catNodes.length).toEqual(2);
  });

  it('should render form headline', () => {
    const formHeadline = fixture.debugElement.query(By.css('h2'));
    expect(formHeadline.nativeElement.textContent)
      .toEqual('Add your kitty');
  });

  describe('when cat is added', () => {
    let catService;
    let page: Page;

    beforeEach(() => {
      catService = TestBed.get(CatService);
      spyOn(catService, 'addCat').and.callThrough();

      page = new Page(fixture);
      page.fillInput(page.srcInput, 'http://localhost/kitten.png');
      page.fillInput(page.nameInput, 'mruczek');
      page.submitForm();
    });

    it('should render 3 cats', () => {
      expect(page.catNodes.length).toEqual(3);
    });

    it('should call addCat on CatService', () => {
      const expectedCat = {src: 'http://localhost/kitten.png', name: 'mruczek'}
      expect(catService.addCat).toHaveBeenCalledWith(expectedCat);
    });
  });

  describe('when cat is removed', () => {
    beforeEach(() => {
      const catComponent = fixture.debugElement.query(By.css('app-cat'));
      catComponent.triggerEventHandler('catRemoved', catComponent.componentInstance.cat);
      fixture.detectChanges();
    });

    it('should render 1 cat', () => {
      const catNodes = fixture.debugElement.queryAll(By.css('app-cat'));
      expect(catNodes.length).toEqual(1);
    });
  });
});
