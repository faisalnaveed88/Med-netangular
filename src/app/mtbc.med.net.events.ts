import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace mtbc.med.net.events{
   export class patientInformation extends Event {
      patientinfo: string;
      listOfRegisteredEHR: string;
   }
   export class iOperatorTokken extends Event {
      tokken: string;
   }
// }
