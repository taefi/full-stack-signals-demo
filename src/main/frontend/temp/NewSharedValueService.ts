import client_1 from "Frontend/generated/connect-client.default.js";
import { SignalMethodOptions as SignalMethodOptions_1, ValueSignal as ValueSignal_1 } from "@vaadin/hilla-react-signals-new";
import {StringModel as StringModel_1} from "@vaadin/hilla-lit-form/Models.js";

function sharedStringSignal_1(options?: SignalMethodOptions_1<string>): ValueSignal_1<string> { return new ValueSignal_1(options?.defaultValue ?? StringModel_1.createEmptyValue(), {
    client: client_1,
    endpoint: "NewSharedValueService",
    method: "sharedStringSignal"
}); }

export { sharedStringSignal_1 as sharedStringSignal };