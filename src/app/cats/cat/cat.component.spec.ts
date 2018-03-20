import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CatComponent } from './cat.component';

describe('CatComponent', () => {
  let component: CatComponent;
  let fixture: ComponentFixture<CatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatComponent);
    component = fixture.componentInstance;
    component.cat = {id: 1, src: '/'};
    component.index = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cat index', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph.nativeElement.textContent).toContain('Cat #1');
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

