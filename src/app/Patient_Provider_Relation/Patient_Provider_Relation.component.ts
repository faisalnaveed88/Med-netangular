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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Patient_Provider_RelationService } from './Patient_Provider_Relation.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-patient_provider_relation',
  templateUrl: './Patient_Provider_Relation.component.html',
  styleUrls: ['./Patient_Provider_Relation.component.css'],
  providers: [Patient_Provider_RelationService]
})
export class Patient_Provider_RelationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  pprId = new FormControl('', Validators.required);
  patient = new FormControl('', Validators.required);
  provider = new FormControl('', Validators.required);
  permission = new FormControl('', Validators.required);

  constructor(public servicePatient_Provider_Relation: Patient_Provider_RelationService, fb: FormBuilder) {
    this.myForm = fb.group({
      pprId: this.pprId,
      patient: this.patient,
      provider: this.provider,
      permission: this.permission
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePatient_Provider_Relation.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'mtbc.med.net.Patient_Provider_Relation',
      'pprId': this.pprId.value,
      'patient': this.patient.value,
      'provider': this.provider.value,
      'permission': this.permission.value
    };

    this.myForm.setValue({
      'pprId': null,
      'patient': null,
      'provider': null,
      'permission': null
    });

    return this.servicePatient_Provider_Relation.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'pprId': null,
        'patient': null,
        'provider': null,
        'permission': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'mtbc.med.net.Patient_Provider_Relation',
      'patient': this.patient.value,
      'provider': this.provider.value,
      'permission': this.permission.value
    };

    return this.servicePatient_Provider_Relation.updateAsset(form.get('pprId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePatient_Provider_Relation.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePatient_Provider_Relation.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'pprId': null,
        'patient': null,
        'provider': null,
        'permission': null
      };

      if (result.pprId) {
        formObject.pprId = result.pprId;
      } else {
        formObject.pprId = null;
      }

      if (result.patient) {
        formObject.patient = result.patient;
      } else {
        formObject.patient = null;
      }

      if (result.provider) {
        formObject.provider = result.provider;
      } else {
        formObject.provider = null;
      }

      if (result.permission) {
        formObject.permission = result.permission;
      } else {
        formObject.permission = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'pprId': null,
      'patient': null,
      'provider': null,
      'permission': null
      });
  }

}
