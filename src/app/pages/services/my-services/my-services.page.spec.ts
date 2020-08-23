import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyServicesPage } from './my-services.page';

describe('MyServicesPage', () => {
  let component: MyServicesPage;
  let fixture: ComponentFixture<MyServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
