import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BoardComponent, RankingComponent, RulesComponent, MenuComponent, PlayerComponent } from './components';
import { GameStateService } from './services/game-state.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let gameStateService: jasmine.SpyObj<GameStateService>;

  beforeEach(fakeAsync(() => {
    gameStateService = jasmine.createSpyObj('GameStateService', ['reset']);

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
        { provide: GameStateService, useValue: gameStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle new game action without page reload', fakeAsync(() => {
    const menuItems = component.menuItems;
    const newGameItem = menuItems.find(item => item.cssClass === 'new-game');
    expect(newGameItem).toBeTruthy();

    newGameItem?.action();
    tick();

    expect(gameStateService.reset).toHaveBeenCalled();
  }));
});
