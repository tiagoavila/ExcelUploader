import { Component } from '@angular/core';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'XlsxFileRead';
  file: File | undefined;
  arrayBuffer: any;
  filelist: any;

  addfile($event: any) {

    // Lib Documentation: https://docs.sheetjs.com/docs/demos/frontend/angular

    this.file = $event.target.files[0];
    let fileReader = new FileReader();

    if (!this.file || this.file.size > 50000) //Size is in bytes
      return;

    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      const wb = XLSX.read(fileReader.result);
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { raw: true }));

      // this.arrayBuffer = fileReader.result;     
      // let data = new Uint8Array(this.arrayBuffer);
      // let arr = new Array();
      // for (let i = 0; i != data.length; ++i) {
      //   arr[i] = String.fromCharCode(data[i]);
      // }

      // let bstr = arr.join("");
      // let workbook = XLSX.read(bstr, { type: "binary" });
      // let first_sheet_name = workbook.SheetNames[0];
      // let worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      //let arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    }
  }

}
