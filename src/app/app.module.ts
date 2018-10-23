/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { PatientGlobalKeyComponent } from './PatientGlobalKey/PatientGlobalKey.component';
import { EhrPatientRelationComponent } from './EhrPatientRelation/EhrPatientRelation.component';
import { Patient_Provider_RelationComponent } from './Patient_Provider_Relation/Patient_Provider_Relation.component';

import { PatientComponent } from './Patient/Patient.component';
import { ProviderComponent } from './Provider/Provider.component';

import { RegisterPatientComponent } from './RegisterPatient/RegisterPatient.component';
import { ContactComponent } from './Contact/Contact.component';
import { SearchPatientByPatientInformationHashComponent } from './SearchPatientByPatientInformationHash/SearchPatientByPatientInformationHash.component';
import { GetiOperatorTokkenComponent } from './GetiOperatorTokken/GetiOperatorTokken.component';
import { UpdatePPRComponent } from './UpdatePPR/UpdatePPR.component';
import { UpdatePermissionsComponent } from './UpdatePermissions/UpdatePermissions.component';
import { RestService} from './services/rest.service';
import { HttpClientModule } from '@angular/common/http'; 
  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientGlobalKeyComponent,
    EhrPatientRelationComponent,
    Patient_Provider_RelationComponent,
    PatientComponent,
    ProviderComponent,
    RegisterPatientComponent,
    ContactComponent,
    SearchPatientByPatientInformationHashComponent,
    GetiOperatorTokkenComponent,
    UpdatePPRComponent,
    UpdatePermissionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
