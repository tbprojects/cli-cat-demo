import { Directive, ElementRef, HostListener } from '@angular/core';

interface ZoomAttrs {
  position: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

@Directive({
  selector: 'img[appZoomImage]'
})
export class ZoomImageDirective {
  private zoomed = false;
  private originalStyle: ZoomAttrs;

  constructor(private el: ElementRef) {
    el.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('click') toggleZoom() {
    this.zoomed = !this.zoomed;
    if (this.zoomed) {
      this.originalStyle = this.style;
      this.style = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh'
      };
    } else {
      this.style = this.originalStyle;
    }
  }

  private get style(): ZoomAttrs {
    const style = this.el.nativeElement.style;
    return {
      position: style.position,
      top: style.top,
      left: style.left,
      width: style.width,
      height: style.height
    };
  }

  private set style(value: ZoomAttrs) {
    Object.assign(this.el.nativeElement.style, value);
  }
}
