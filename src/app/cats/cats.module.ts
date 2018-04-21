import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsRoutingModule } from './cats-routing.module';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatComponent } from './cat/cat.component';
import { CatService } from './cat.service';
import { HttpClientModule } from '@angular/common/http';
import { ZoomImageDirective } from './zoom-image.directive';
import { FormsModule } from '@angular/forms';
import { KittizePipe } from './kittize.pipe';

@NgModule({
  imports: [
    CommonModule,
    CatsRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [CatListComponent, CatComponent, ZoomImageDirective, KittizePipe],
  providers: [CatService]
})
export class CatsModule { }
