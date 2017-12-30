import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildHomeComponent } from './guild-home.component';

describe('GuildHomeComponent', () => {
  let component: GuildHomeComponent;
  let fixture: ComponentFixture<GuildHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
