import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObUnknownRouteModule } from '@oblique/oblique';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [{ path: '', redirectTo: 'upload', pathMatch: 'full' }, { path: 'upload', component: UploadComponent }, { path: '**', redirectTo: 'unknown-route' }];

@NgModule({
  imports: [RouterModule.forRoot(routes), ObUnknownRouteModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
