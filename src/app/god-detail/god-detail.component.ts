import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { God }         from '../god';
import { GodService }  from '../god.service';
 
@Component({
  selector: 'app-god-detail',
  templateUrl: './god-detail.component.html',
  styleUrls: [ './god-detail.component.css' ]
})
export class GodDetailComponent implements OnInit {
  @Input() god: God;
 
  constructor(
    private route: ActivatedRoute,
    private godService: GodService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getGod();
  }
 
  getNativeWindow() {
    return window;
  }
  getGod(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.godService.getGod(id)
      .subscribe(god => this.god = god);
  }
  getTheWikiPedia(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.godService.getGod(id);
    console.log(this.god.name);
    window.open('https://www.wikipedia.org/wiki/' + this.god.name);
    //https://de.wikipedia.org/wiki/
  }
 
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.godService.updateGod(this.god)
      .subscribe(() => this.goBack());
  }
}