import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOen = this.elRef.nativeElement.contains(event.target) ? !this.isOen : false;
  }
  constructor(private elRef: ElementRef) {}
}