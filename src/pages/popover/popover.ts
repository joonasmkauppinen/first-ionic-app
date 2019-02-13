import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  items = [
    'edit',
    'delete'
  ];

  constructor(public viewController: ViewController) {}

  close(itemValue: string) {
    this.viewController.dismiss(itemValue)
    .catch(err => console.log(err));
  }

}
