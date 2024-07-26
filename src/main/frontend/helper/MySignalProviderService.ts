import { NumberSignalChannel } from "@vaadin/hilla-react-signals";
import client_1 from "Frontend/generated/connect-client.default.js";

export class MySignalProviderService {
  static sharedValue() {
    const signalChannel =
      new NumberSignalChannel('MySignalProviderService.sharedValue', client_1);
    return signalChannel.signal;
  }

  static counter() {
    const signalChannel =
      new NumberSignalChannel('MySignalProviderService.counter', client_1);
    return signalChannel.signal;
  }
}
