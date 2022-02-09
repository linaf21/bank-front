import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { DocumentType } from 'src/app/domain/document-type';
import { DocumentTypeService } from 'src/app/service/document-type.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  custId: number = 0;
  customer!: Customer;
  documentTypes!: DocumentType[];

  showMsg: boolean = false;
  messages: string[] = [""];

  constructor(public activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public documentTypeService: DocumentTypeService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.paramMap.get('custId');
    this.custId = Number(params);
    this.customerService.findById(this.custId).subscribe(data => {
      this.customer = data;
      console.table(this.customer);
    });

    this.findAllDocumentType();
  }

  findAllDocumentType(): void {
    this.documentTypeService.findAll().subscribe(data => {
      this.documentTypes = data;
    })
  }

  update(): void {
    this.messages = [""];
    this.customerService.update(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se modificó con éxito";
    }, error => {
      this.showMsg = true;
      this.messages = error.error.erorr;
    });
  }

  delete(): void {
    this.messages = [""];
    this.customerService.delete(this.customer.custId).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se borró con éxito";
    }, error => {
      this.showMsg = true;
      this.messages = error.error.erorr;
    });
  }

}
