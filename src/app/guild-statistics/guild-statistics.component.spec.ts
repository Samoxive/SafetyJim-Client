import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildStatisticsComponent } from './guild-statistics.component';

describe('GuildStatisticsComponent', () => {
  let component: GuildStatisticsComponent;
  let fixture: ComponentFixture<GuildStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
