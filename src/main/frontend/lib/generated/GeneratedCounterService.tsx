import { SharedCounterService } from "Frontend/generated/endpoints";
import { NumberSignalQ } from "../SharedSignals";

export class GeneratedCounterService {

  static async counter() {
    const signalMetaData = await SharedCounterService.counter();
    const valueLog = new NumberSignalQ(signalMetaData);
    return valueLog.getRoot();
  }
}
