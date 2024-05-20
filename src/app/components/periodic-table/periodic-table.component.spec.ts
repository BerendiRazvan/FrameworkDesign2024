import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecialHeaderComponent} from './special-header.component';
import {LanguageService} from "../../services/language/language.service";
import {CountryService} from "../../services/country/country.service";
import {ButtonWithIconComponent} from "../button-with-icon/button-with-icon.component";

describe('SpecialHeaderComponent', () => {
  let component: SpecialHeaderComponent;
  let fixture: ComponentFixture<SpecialHeaderComponent>;
  let languageServiceTest: any;
  let countryServiceTest: any;
  languageServiceTest = {}
  countryServiceTest = {}


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialHeaderComponent,ButtonWithIconComponent],
      providers: [{provide: LanguageService, useValue: languageServiceTest},
        {provide: CountryService, useValue: countryServiceTest}]
    });
    fixture = TestBed.createComponent(SpecialHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
