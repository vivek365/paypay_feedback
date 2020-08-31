import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [MainComponent]
})
export class MainModule { }
