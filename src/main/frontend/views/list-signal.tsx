import {
  computed, effect, type ListSignal, ReadonlySignal,
  type Signal,
  signal,
  useComputed,
  useSignal, type ValueSignal
} from "@vaadin/hilla-react-signals";
import {useEffect} from "react";
import {
  Checkbox,
  HorizontalLayout, Icon,
  IntegerField,
  type IntegerFieldValueChangedEvent,
  type TextFieldValueChangedEvent
} from "@vaadin/react-components";
import {TextField} from "@vaadin/react-components/TextField";
import {Button} from "@vaadin/react-components/Button.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";

import type Person from "Frontend/generated/com/github/taefi/data/Person.js";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import Spinner from "Frontend/views/_spinner.js";
import {PersonService} from "Frontend/generated/endpoints.js";

export const config: ViewConfig = {
  menu: { order: 5.5, icon: 'vaadin:bullets' },
  title: 'Person List Signal',
};

function getNumber(value: string) {
    return value === undefined || value === '' ? 0 : parseInt(value);
}

function PersonEditor({rowNum, item, onRemove}: { rowNum: number, item: ValueSignal<Person>, onRemove: (signal: ValueSignal<Person>) => void }) {

  const editing = useSignal(false);
  const rendering = useSignal(true);
  useEffect(() => {
    setTimeout(() => rendering.value = false, 500);
  }, [rendering.value]);

  return rendering.value ? <Spinner /> : (
    <HorizontalLayout theme='spacing' style={{ alignItems: 'BASELINE' }}>
      <h4>{rowNum} -</h4>
      <TextField label='Name'
                 value={item.value.name}
                 onValueChanged={(e) => item.value = {name: e.detail.value, age: item.value.age}}
                 readonly={!editing.value} />
      <TextField label='Age'
                 value={item.value.age.toString()}
                 onValueChanged={(e) => item.value = {name: item.value.name, age: getNumber(e.detail.value)}}
                 readonly={!editing.value} />
      <Button theme="icon" disabled={editing.value} onClick={() => editing.value = true}><Icon icon="vaadin:pencil" /></Button>
      <Button theme="icon" hidden={!editing.value}
              onClick={() => editing.value = false }><Icon icon="lumo:checkmark" /></Button>
      <Button theme="icon error" hidden={editing.value} onClick={() => { editing.value = false; onRemove(item);}}><Icon icon="vaadin:trash" /></Button>
    </HorizontalLayout>
  );
}

function setPersonName(e: TextFieldValueChangedEvent, name: Signal<string>) { name.value = e.detail.value; }
function getPersonName(name: Signal<string>) { return name.value; }
function setPersonAge(e: IntegerFieldValueChangedEvent, age: Signal<number>) { age.value = getNumber(e.detail.value); }
function getPersonAge(age: Signal<number>) { return age.value; }

const personList: ListSignal<Person> = PersonService.personListSignal();

export default function PersonListSignal() {

  const rendering = useSignal(true);
  useEffect(() => {
    setTimeout(() => rendering.value = false, 500);
  }, [rendering.value]);

  const name = useSignal('');
  const age = useSignal(0);

  return (
    <VerticalLayout theme="padding">
      <HorizontalLayout theme="spacing padding" style={{alignItems: 'BASELINE'}}>
        <h3>Person list:</h3>
        {rendering.value ? <Spinner/> : null}
      </HorizontalLayout>
      {personList.value.length === 0 ? <HorizontalLayout theme="padding"><span style={{color: 'grey'}}>No one registered yet... Start adding people!</span></HorizontalLayout>
        : personList.value.map((item, index) =>
          <PersonEditor rowNum={index + 1} item={item} onRemove={(signal) => personList.remove(signal)} key={item.id} />)
      }
      <HorizontalLayout theme="spacing padding" style={{ alignItems: 'BASELINE' }}>
        <TextField label='Name:' value={getPersonName(name)} placeholder="What's your name?" onValueChanged={(e => setPersonName(e, name))} />
        <IntegerField label='Age:' value={getPersonAge(age).toString()} placeholder="How old are you?" onValueChanged={(e => setPersonAge(e, age))} />
        <Button onClick={() => {
          personList.insertLast({name: getPersonName(name), age: getPersonAge(age)});
          name.value = '';
          age.value = 0;
        }}>Add</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
