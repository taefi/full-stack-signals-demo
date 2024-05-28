import {SharedCounterService, SignalsHandler} from "Frontend/generated/endpoints";
import { NumberSignalQueue } from "../SharedSignals";
import connectClient from "Frontend/generated/connect-client.default";

export class GeneratedCounterService {

  static async counter() {
    const sharedSignal = await SharedCounterService.counter();
    const queueDescriptor = {
      id: sharedSignal.id,
      subscribe: SignalsHandler.subscribe,
      publish: SignalsHandler.update,
    }
    const valueLog = new NumberSignalQueue(queueDescriptor, connectClient);
    return valueLog.getRoot();
  }
}
