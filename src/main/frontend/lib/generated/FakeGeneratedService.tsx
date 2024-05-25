import {CounterService, HelloWorldService} from "Frontend/generated/endpoints";
import { EntryType, EventLog, ValueSignal } from "../SharedSignals";

export type Position = [number, number];

export interface Todo {
  label: string,
  done: boolean;
}

export class FakeGeneratedService {

  static async counter() {
    /*const queue = {
      subscribe: CounterService.subscribeCounter,
      publish: CounterService.updateCounter,
    };*/
    const signalMetaData = await CounterService.counter();
    const valueLog = new EventLog<ValueSignal<number>>(/*queue,*/ signalMetaData, {
      delay: true,
      initialValue: 0
    }, EntryType.VALUE);
    return valueLog.getRoot();
  }  
}
