import { Directive, OnInit, ElementRef, Inject, Input, Renderer2, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {
 
 @Input() color: string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2){
    console.log(this.element.nativeElement);
  }
  
  
   ngOnInit(): void {
     //  this.element.nativeElement.style.backgroundColor = this.color;
       this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.color);

    }

  @HostListener('mouseenter') onMouseEnter() {
           this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'green');

  }

  @HostListener('mouseleave') onMouseleave() {
           this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'white');

  }


}


