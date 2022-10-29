import { Component, Input, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {}

  clickToScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data' + barcodeData);
     }).catch(err => {
      alert('Error' + err);
     });
  }

}
