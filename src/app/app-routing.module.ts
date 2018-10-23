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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'PatientGlobalKey', component: PatientGlobalKeyComponent },
  { path: 'EhrPatientRelation', component: EhrPatientRelationComponent },
  { path: 'Patient_Provider_Relation', component: Patient_Provider_RelationComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Provider', component: ProviderComponent },
  { path: 'RegisterPatient', component: RegisterPatientComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'SearchPatientByPatientInformationHash', component: SearchPatientByPatientInformationHashComponent },
  { path: 'GetiOperatorTokken', component: GetiOperatorTokkenComponent },
  { path: 'UpdatePPR', component: UpdatePPRComponent },
  { path: 'UpdatePermissions', component: UpdatePermissionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
