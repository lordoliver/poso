import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items', () => {
    const menuElement = fixture.nativeElement;
    const link = menuElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe('Test Item');
    expect(link.classList.contains('test-class')).toBeTrue();
  });

  it('should prevent default and execute action on click', () => {
    const actionSpy = jasmine.createSpy('action');
    component.menuItems = [
      { name: 'Test Item', cssClass: 'test-class', action: actionSpy }
    ];
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    link.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalled();
  });
});
