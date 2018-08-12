import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  teamArray: Array<any> = [];
  figureWidth: number;
  figureHeight: number;
  unitImageSize = {
    x: 60,
    y: 60
  };
  ImageCoordinatesX = {
    focus: 0 * this.unitImageSize.x,
    centerHover: 1 * this.unitImageSize.x,
    center: 2 * this.unitImageSize.x,
    toRight: 3 * this.unitImageSize.x,
    toTopRight: 4 * this.unitImageSize.x,
    toTop: 5 * this.unitImageSize.x,
    toLeftTop: 6 * this.unitImageSize.x,
    toRightBottom: 7 * this.unitImageSize.x,
    toDown: 8 * this.unitImageSize.x,
    toLeftDown: 9 * this.unitImageSize.x,
    toLeft: 10 * this.unitImageSize.x
  };
  teamSize = 111;
  memberNames = [
    'Abhishek'
  ];

  @ViewChild('figure') figure: ElementRef;

  constructor(private eleRef: ElementRef) { }

  ngOnInit() {
    this.initLoad();
  }

  ngAfterViewInit() {
    this.figureWidth = this.figure.nativeElement.clientWidth;
    this.figureHeight = this.figure.nativeElement.clientHeight;
  }

  initLoad() {
    const x = 0;
    let y = this.unitImageSize.y;

    for (let i = 0; i < this.teamSize; i++) {
      y = y - this.unitImageSize.y;
      this.teamArray.push({name: this.memberNames[i] || 'Demo name', background: x + 'px ' + y + 'px'});
    }
  }

  getCords(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    this.eleRef.nativeElement.querySelectorAll('figure').forEach((figure: HTMLElement, index: number) => {

      // Elements lying straight on axis

      // Elements at x axis
      if ((figure.getBoundingClientRect().top <= mouseY) && (mouseY <= (figure.getBoundingClientRect().top + this.figureHeight))) {
        // console.log('elements matching x axis');
        if (((figure.getBoundingClientRect().left) <= mouseX ) && (mouseX <= (figure.getBoundingClientRect().left + this.figureWidth))) {
          // console.log('center element');
          // Show tooltip
          // figure.nextElementSibling.classList.remove('hide');

          figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.centerHover.toString()}px -${index * this.unitImageSize.y}px`);
          return;
        }
        if (mouseX >= figure.getBoundingClientRect().left) {
          // console.log('at left side of x axis');
          figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toRight.toString()}px -${index * this.unitImageSize.y}px`);
          return;
        } else {
          // console.log('at right side of x axis');
          figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toLeft.toString()}px -${index * this.unitImageSize.y}px`);
          return;
        }
      }

      // Elements at y axis
      if (((figure.getBoundingClientRect().left) <= mouseX ) && (mouseX <= (figure.getBoundingClientRect().left + this.figureWidth))) {
        // console.log('element matching Y axis');
        if (mouseY >= figure.getBoundingClientRect().top) {
          // console.log('at top side of y axis');
          figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toDown.toString()}px -${index * this.unitImageSize.y}px`);
          return;
        } else {
          // console.log('at down side of y axis');
          figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toTop.toString()}px -${index * this.unitImageSize.y}px`);
          return;
        }
      }

      // Elements lying in quadrants

      // 1st Quad elements
      if ((figure.getBoundingClientRect().left + this.figureWidth ) > mouseX &&
        (figure.getBoundingClientRect().top + this.figureHeight) < mouseY) {
        figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toLeftDown.toString()}px -${index * this.unitImageSize.y}px`);
        return;
      }

      // 2nd Quad elements
      if ((figure.getBoundingClientRect().left + this.figureWidth ) < mouseX &&
      (figure.getBoundingClientRect().top + this.figureHeight) < mouseY) {
        figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toRightBottom.toString()}px -${index * this.unitImageSize.y}px`);
        return;
      }

      // 3rd Quad elements
      if ((figure.getBoundingClientRect().left + this.figureWidth ) < mouseX &&
      (figure.getBoundingClientRect().top + this.figureHeight) > mouseY) {
        figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toTopRight.toString()}px -${index * this.unitImageSize.y}px`);
        return;
      }

      // 4th Quad elements
      if ((figure.getBoundingClientRect().left + this.figureWidth ) > mouseX &&
      (figure.getBoundingClientRect().top + this.figureHeight) > mouseY) {
        figure.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toLeftTop.toString()}px -${index * this.unitImageSize.y}px`);
        return;
      }

    });
  }

  onclickImage(index: number, figure: HTMLElement) {
    figure.
      setAttribute
      ('style', `background-position: -${this.ImageCoordinatesX.focus.toString()}px -${index * this.unitImageSize.y}px`);

      this.eleRef.nativeElement.querySelectorAll('figure').forEach((figure2: HTMLElement, index2: number) => {
        if (index2 === index) {
          return;
        }
        figure2.
          setAttribute
          ('style', `background-position: -${this.ImageCoordinatesX.toDown.toString()}px -${index2 * this.unitImageSize.y}px`);
      });
  }

}
