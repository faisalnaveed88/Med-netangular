import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Patient,EhrPatientRelation,Provider,PermissionType} from './mtbc.med.net';
// export namespace mtbc.med.net.transaction{
   export class RegisterPatient extends Transaction {
      patient: Patient;
      epr: EhrPatientRelation;
      providerId: string;
   }
   export class Contact extends Transaction {
   }
   export class SearchPatientByPatientInformationHash extends Transaction {
      patientSSNHash: string;
   }
   export class GetiOperatorTokken extends Transaction {
      iOperatorDetails: string;
   }
   export class UpdatePPR extends Transaction {
      pprId: string;
      patient: Patient;
      provider: Provider;
      permission: PermissionType;
   }
   export class UpdatePermissions extends Transaction {
      patientId: string;
      providerId: string;
      permissionType: PermissionType;
   }
// }
