import { ListSignal as ListSignal_1 } from "@vaadin/hilla-react-signals";
import type Message_1 from "Frontend/generated/com/github/taefi/services/ChatService/Message.js";
import client_1 from "../generated/connect-client.default.js";
function chatChannelSignal_1(): ListSignal_1<Message_1> {
    return new ListSignal_1<Message_1> ( { client: client_1, endpoint: "ChatService", method: "chatChannelSignal" });
}
export { chatChannelSignal_1 as chatChannelSignal };
