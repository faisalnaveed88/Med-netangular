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
import { PatientGlobalKeyService } from './PatientGlobalKey.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-patientglobalkey',
  templateUrl: './PatientGlobalKey.component.html',
  styleUrls: ['./PatientGlobalKey.component.css'],
  providers: [PatientGlobalKeyService]
})
export class PatientGlobalKeyComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  patientGlobalkeyId = new FormControl('', Validators.required);
  ehrList = new FormControl('', Validators.required);
  ehrUrls = new FormControl('', Validators.required);

  constructor(public servicePatientGlobalKey: PatientGlobalKeyService, fb: FormBuilder) {
    this.myForm = fb.group({
      patientGlobalkeyId: this.patientGlobalkeyId,
      ehrList: this.ehrList,
      ehrUrls: this.ehrUrls
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePatientGlobalKey.getAll()
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
      $class: 'mtbc.med.net.PatientGlobalKey',
      'patientGlobalkeyId': this.patientGlobalkeyId.value,
      'ehrList': this.ehrList.value,
      'ehrUrls': this.ehrUrls.value
    };

    this.myForm.setValue({
      'patientGlobalkeyId': null,
      'ehrList': null,
      'ehrUrls': null
    });

    return this.servicePatientGlobalKey.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'patientGlobalkeyId': null,
        'ehrList': null,
        'ehrUrls': null
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
      $class: 'mtbc.med.net.PatientGlobalKey',
      'ehrList': this.ehrList.value,
      'ehrUrls': this.ehrUrls.value
    };

    return this.servicePatientGlobalKey.updateAsset(form.get('patientGlobalkeyId').value, this.asset)
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

    return this.servicePatientGlobalKey.deleteAsset(this.currentId)
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

    return this.servicePatientGlobalKey.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'patientGlobalkeyId': null,
        'ehrList': null,
        'ehrUrls': null
      };

      if (result.patientGlobalkeyId) {
        formObject.patientGlobalkeyId = result.patientGlobalkeyId;
      } else {
        formObject.patientGlobalkeyId = null;
      }

      if (result.ehrList) {
        formObject.ehrList = result.ehrList;
      } else {
        formObject.ehrList = null;
      }

      if (result.ehrUrls) {
        formObject.ehrUrls = result.ehrUrls;
      } else {
        formObject.ehrUrls = null;
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
      'patientGlobalkeyId': null,
      'ehrList': null,
      'ehrUrls': null
      });
  }

}
