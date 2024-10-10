import {PersonService} from "Frontend/generated/endpoints.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {TextField} from "@vaadin/react-components/TextField";
import {NumberField, type TextFieldValueChangedEvent} from "@vaadin/react-components";
import {useSignal, ValueSignal} from "@vaadin/hilla-react-signals";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import {Button} from "@vaadin/react-components/Button.js";

const personSignal = PersonService.personSignal(false, {defaultValue: {name: '', age: 0}});
const loremIpsumSignal = PersonService.loremIpsumSignal({defaultValue: ''});

export const config: ViewConfig = {
  menu: { order: 4, icon: 'vaadin:hands-up' },
  title: 'Person Form',
};

const LOREM_IPSUM_WORDS = [
  "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "Duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum"
];
let idx = 1;

export default function PersonView() {

  const isNameEditing = useSignal(false);
  const isAgeEditing = useSignal(false);

  const nameChanged = (e: TextFieldValueChangedEvent) => {
    if (!isNameEditing.value) {
      return
    }
    personSignal.set({
      name: e.detail.value,
      age: personSignal.value!.age,
    });
  };

  const ageChanged = (e: TextFieldValueChangedEvent) => {
    if (!isAgeEditing.value) {
      return
    }
    personSignal.set({
      name: personSignal.value!.name,
      age: parseInt(e.detail.value ?? '0'),
    });
  };

  return (
    <VerticalLayout theme="spacing padding">
      <h3>Person</h3>
      <TextField label="Name" value={personSignal.value?.name} onValueChanged={nameChanged} onFocus={() => isNameEditing.value = true} onBlur={() => isNameEditing.value = false}/>
      <NumberField label="Age" value={personSignal.value?.age + ''} onValueChanged={ageChanged} onFocus={() => isAgeEditing.value = true} onBlur={() => isAgeEditing.value = false}/>
      <TextField label="Is adult" value={personSignal.value?.age! >= 18 ? 'Yes' : 'No'} readonly/>
      <br/>
      <pre>{JSON.stringify(personSignal)}</pre>
      <br/>
      <p>{JSON.stringify(loremIpsumSignal)}</p>
      <Button onClick={() => loremIpsumSignal.update((curr) => `${curr} ${LOREM_IPSUM_WORDS[idx++]}`)} disabled={idx >= LOREM_IPSUM_WORDS.length}>Complete Lorem Ipsum</Button>
      <Button onClick={() => { loremIpsumSignal.set('Lorem'); idx = 1}}>clear</Button>
    </VerticalLayout>
  );
}
