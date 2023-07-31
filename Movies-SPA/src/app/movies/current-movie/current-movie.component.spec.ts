import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMovieComponent } from './current-movie.component';

describe('CurrentMovieComponent', () => {
  let component: CurrentMovieComponent;
  let fixture: ComponentFixture<CurrentMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentMovieComponent]
    });
    fixture = TestBed.createComponent(CurrentMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
