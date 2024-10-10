import { ValueSignal as ValueSignal_1, ListSignal as ListSignal_1 } from "@vaadin/hilla-react-signals";
import type Person_1 from "../generated/com/github/taefi/data/Person.js";
import client_1 from "../generated/connect-client.default.js";
function personListSignal_1(): ListSignal_1<Person_1> {
    return new ListSignal_1<Person_1> ( { client: client_1, endpoint: "PersonService", method: "personListSignal" });
}
function personSignal_1(isAdult: boolean): ValueSignal_1<Person_1 | undefined> {
    return new ValueSignal_1(undefined, { client: client_1, endpoint: "PersonService", method: "personSignal", params: { isAdult } });
}
export { personListSignal_1 as personListSignal, personSignal_1 as personSignal };
