import { Component, OnInit } from '@angular/core';
import { Titan } from '../titan';
import { TitanService } from '../titan.service';

@Component({
  selector: 'app-titans',
  templateUrl: './titans.component.html',
  styleUrls: ['./titans.component.css']
})
export class TitansComponent implements OnInit {
  titans: Titan[];

  constructor(private titanService: TitanService) { }

  ngOnInit() {
    this.getTitans();
  }

  getTitans(): void {
    this.titanService.getTitans()
    .subscribe(titans => this.titans = titans);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.titanService.addTitan({ name } as Titan)
      .subscribe(titan => {
        this.titans.push(titan);
      });
  }

  delete(titan: Titan): void {
    this.titans = this.titans.filter(t => t !== titan);
    this.titanService.deleteTitan(titan).subscribe();
  }

}
