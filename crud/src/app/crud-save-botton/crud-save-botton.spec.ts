import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSaveBotton } from './crud-save-botton';

describe('CrudSaveBotton', () => {
  let component: CrudSaveBotton;
  let fixture: ComponentFixture<CrudSaveBotton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSaveBotton],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudSaveBotton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
