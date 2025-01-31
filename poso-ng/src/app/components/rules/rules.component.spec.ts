import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulesComponent } from './rules.component';

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display rules title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toBe('Spielregeln');
  });

  it('should contain rules paragraphs', () => {
    const paragraphs = fixture.nativeElement.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should contain email link', () => {
    const emailLink = fixture.nativeElement.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute('href')).toBe('mailto:info@alax.de');
  });
});
