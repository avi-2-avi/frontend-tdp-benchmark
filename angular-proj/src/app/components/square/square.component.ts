import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getRandomColor, getRandomInterval } from '../../helpers';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent implements OnInit, OnDestroy {
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  color: string = '#FFFFFF';
  private intervalId: any;

  private changeColor(): void {
    this.color = getRandomColor();
  }

  ngOnInit(): void {
    this.changeColor();
    this.intervalId = setInterval(() => {
      this.changeColor();
    }, getRandomInterval());
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
