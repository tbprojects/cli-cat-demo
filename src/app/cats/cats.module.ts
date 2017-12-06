import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsRoutingModule } from './cats-routing.module';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatComponent } from './cat/cat.component';
import { CatService } from './cat.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CatsRoutingModule,
    HttpClientModule
  ],
  declarations: [CatListComponent, CatComponent],
  providers: [CatService]
})
export class CatsModule { }
