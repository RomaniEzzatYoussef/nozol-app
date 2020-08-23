import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookAgainPage } from './book-again.page';

describe('BookAgainPage', () => {
  let component: BookAgainPage;
  let fixture: ComponentFixture<BookAgainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAgainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAgainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
