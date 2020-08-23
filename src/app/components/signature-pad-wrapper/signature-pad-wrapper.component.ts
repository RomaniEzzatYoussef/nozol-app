import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-signature-pad-wrapper',
  templateUrl: './signature-pad-wrapper.component.html',
  styleUrls: ['./signature-pad-wrapper.component.scss'],
})
export class SignaturePadWrapperComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

    onCancel() {
      this.modalController.dismiss(null, 'cancel');
    }
}
