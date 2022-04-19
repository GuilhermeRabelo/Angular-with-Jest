import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from './service/home.service';

class MockHomeService {
  getTracks(): Promise<any> { return null as any; }
}

describe.skip('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeService: HomeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        MatFormFieldModule,
        MatIconModule, 
        MatInputModule, 
        ReactiveFormsModule, 
        FormsModule, 
        HttpClientTestingModule, 
        BrowserAnimationsModule
      ],
      providers: [
        { provide: HomeService, useClass: MockHomeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    homeService = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do the request to get the tracks', () => {
    // const mockResponse = {
    //   items: [
    //     {name: "In the End"}
    //   ]
    // };

    const mockFilterRequest = {
      limit: 10,
      offset: 0,
      q: 'Gorillaz',
      type: 'track'
    }

    jest.spyOn(homeService, 'getTracks');
    
    const button = fixture.nativeElement.querySelector('.btn');
    component.searchInput.setValue('Gorillaz');
    button.click();

    fixture.detectChanges();

    setTimeout(() => {
      const listing = fixture.nativeElement.querySelector('.tracks-list');
      // const trackItem = fixture.debugElement.query(By.directive(MockComponent(TrackItemComponent)));
      expect(homeService.getTracks).toHaveBeenCalledTimes(1);
      expect(homeService.getTracks).toHaveBeenCalledWith(mockFilterRequest);
      expect(listing).toBeTruthy();
    }, 3000);

  });
});
