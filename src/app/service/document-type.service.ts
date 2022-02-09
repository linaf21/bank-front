import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentType } from '../domain/document-type';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  url: string = `${environment.apiUrl}/api/v1/document-types`

  constructor(public httpClient: HttpClient) { }

  findAll(): Observable<DocumentType[]>{
    return this.httpClient.get<DocumentType[]>(this.url);
  }

  findById(id:number): Observable<DocumentType>{
    return this.httpClient.get<DocumentType>(`${this.url}/${id}`);
  }
}
