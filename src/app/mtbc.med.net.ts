import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace mtbc.med.net{
   export enum PermissionType {
      READ,
      WRITE,
      READ_WRITE,
      NONE,
   }
   export class Patient extends Participant {
      patientId: string;
      patientSSNHash: string;
      patientInfoHash: string;
      patientUrl: string;
   }
   export class Provider extends Participant {
      providerId: string;
   }
   export class PatientGlobalKey extends Asset {
      patientGlobalkeyId: string;
      ehrList: string[];
      ehrUrls: string[];
   }
   export class EhrPatientRelation extends Asset {
      eprId: string;
      patientId: string;
   }
   export class Patient_Provider_Relation extends Asset {
      pprId: string;
      patient: Patient;
      provider: Provider;
      permission: PermissionType;
   }
// }
