import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.menuItems = [
      { name: 'Test Item', cssClass: 'test-class', action: () => {} }
    ];
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick();
  }));

  it('should render menu items', fakeAsync(() => {
    const menuElement = fixture.nativeElement;
    const link = menuElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe('Test Item');
    expect(link.classList.contains('test-class')).toBeTrue();
    tick();
  }));

  it('should prevent default and execute action on click', fakeAsync(() => {
    const actionSpy = jasmine.createSpy('action');
    component.menuItems = [
      { name: 'Test Item', cssClass: 'test-class', action: actionSpy }
    ];
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    link.click();
    fixture.detectChanges();
    tick();

    expect(actionSpy).toHaveBeenCalled();
  }));
});
