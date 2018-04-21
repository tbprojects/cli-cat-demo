import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CatComponent } from './cat.component';
import { Pipe } from '@angular/core';

@Pipe({name: 'kittize'})
class KittizeMockPipe {
  transform(value: string) { return value; }
}

describe('CatComponent', () => {
  let component: CatComponent;
  let fixture: ComponentFixture<CatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatComponent, KittizeMockPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatComponent);
    component = fixture.componentInstance;
    component.cat = {id: 1, src: '/', name: 'mruczek'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cat index', () => {
    expect(fixture.nativeElement.textContent).toContain('mruczek');
  });

  describe('when remove button is clicked', () => {
    beforeEach(() => {
      spyOn(component.catRemoved, 'emit');
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', {});
    });

    it('should emit catRemoved event', () => {
      expect(component.catRemoved.emit).toHaveBeenCalledWith(component.cat);
    });
  });
});

