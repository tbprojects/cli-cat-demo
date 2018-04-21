import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    beforeEach(() => {
      catService = TestBed.get(CatService);
      spyOn(catService, 'addCat').and.callThrough();

      const srcInput = fixture.debugElement.query(By.css('input[name="src"]'));
      srcInput.nativeElement.value = 'http://localhost/kitten.png';
      srcInput.nativeElement.dispatchEvent(new Event('input'));

      const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
      nameInput.nativeElement.value = 'mruczek';
      nameInput.nativeElement.dispatchEvent(new Event('input'));

      const button = fixture.debugElement.query(By.css('form button'));
      button.nativeElement.click();

      fixture.detectChanges();
    });

    it('should render 3 cats', () => {
      const catNodes = fixture.debugElement.queryAll(By.css('app-cat'));
      expect(catNodes.length).toEqual(3);
    });

    it('should call addCat on CatService', () => {
      expect(catService.addCat)
        .toHaveBeenCalledWith({src: 'http://localhost/kitten.png', name: 'mruczek'});
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
