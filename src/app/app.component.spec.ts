import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardComponent, RankingComponent, RulesComponent, MenuComponent, PlayerComponent } from './components';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BoardComponent,
        RankingComponent,
        RulesComponent,
        MenuComponent,
        PlayerComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  afterEach(() => {
    (router.navigate as jasmine.Spy).calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle new game action without page reload', fakeAsync(() => {
    const menuItems = component.menuItems;
    const newGameItem = menuItems.find(item => item.cssClass === 'new-game');
    expect(newGameItem).toBeTruthy();

    newGameItem?.action();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/'], { onSameUrlNavigation: 'reload' });
  }));
});
