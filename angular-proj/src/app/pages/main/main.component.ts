import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SquareComponent } from 'src/app/components/square/square.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  numSquares!: number;
  renderTime: number | null = null;
  fps: number = 0;
  windowSize: { width: number; height: number } = { width: 0, height: 0 };
  frameCount: number = 0;
  lastTime: number = performance.now();
  animationFrameRef: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.numSquares = +params['number_squares'];
      this.handleResize();

      window.addEventListener('resize', this.handleResize.bind(this));
      this.animationFrameRef = requestAnimationFrame(this.animate.bind(this));
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    if (this.animationFrameRef) {
      cancelAnimationFrame(this.animationFrameRef);
    }
  }

  handleResize(): void {
    this.windowSize = { width: window.innerWidth, height: window.innerHeight };
  }

  renderSquares(): SquareComponent[] | null {
    if (this.windowSize.width === 0 || this.windowSize.height === 0) {
      return null;
    }

    const squareSize = Math.min(
      this.windowSize.width / this.numSquares,
      this.windowSize.height / this.numSquares,
    );

    const squares: any[] = [];
    for (let i = 0; i < this.numSquares; i++) {
      for (let j = 0; j < this.numSquares; j++) {
        squares.push({ width: squareSize, height: squareSize });
      }
    }
    return squares;
  }

  animate(): void {
    this.frameCount += 1;
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    if (deltaTime >= 1000) {
      this.fps = (this.frameCount / deltaTime) * 1000;
      this.fps = parseFloat(this.fps.toFixed(2));
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    this.animationFrameRef = requestAnimationFrame(this.animate.bind(this));
  }

  addSquares(): void {
    const startTime = performance.now();
    this.numSquares += 100;
    this.renderTime = null;

    requestAnimationFrame(() => {
      const endTime = performance.now();
      this.renderTime = endTime - startTime;
    });
  }
}
