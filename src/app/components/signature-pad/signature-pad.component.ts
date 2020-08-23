import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SignaturePad} from "angular2-signaturepad/signature-pad";

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent {
  @ViewChild('signatureCanvas') public signaturePad : SignaturePad;
  signatureImage: string;
  isSignature = false;
  @Input() showPreview = false;


  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 360,
    'canvasHeight': 200
  };

  constructor() {
  }


  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.isSignature = true;
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  ionViewDidEnter() {
    this.signaturePad.clear();
    this.canvasResize();
  }

}
