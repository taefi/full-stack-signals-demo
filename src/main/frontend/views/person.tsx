import {PersonService} from "Frontend/generated/endpoints.js";
import {VerticalLayout} from "@vaadin/react-components/VerticalLayout";
import {TextField} from "@vaadin/react-components/TextField";
import {
  DatePicker,
  type DatePickerValueChangedEvent,
  NumberField,
  type TextFieldValueChangedEvent
} from "@vaadin/react-components";
import {useComputed, useSignal} from "@vaadin/hilla-react-signals";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";

const personSignal = PersonService.personSignalNotNull();

export const config: ViewConfig = {
  menu: { order: 4, icon: 'vaadin:hands-up' },
  title: 'Person Form',
};

export default function PersonView() {

  const isNameEditing = useSignal(false);
  const isAgeEditing = useSignal(false);

  const age = useComputed(() => {
    const timeDiff = Math.abs(Date.now() - new Date(personSignal.value?.birthDate!).getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  });

  const nameChanged = (e: TextFieldValueChangedEvent) => {
    if (!isNameEditing.value) {
      return
    }
    personSignal.set({
      name: e.detail.value,
      birthDate: personSignal.value!.birthDate,
    });
  };

  const ageChanged = (e: DatePickerValueChangedEvent) => {
    if (!isAgeEditing.value) {
      return
    }
    personSignal.set({
      name: personSignal.value!.name,
      birthDate: e.detail.value ?? '',
    });
  };

  return (
    <VerticalLayout theme="spacing padding">
      <h3>Person</h3>
      <TextField label="Name" value={personSignal.value?.name} onValueChanged={nameChanged} onFocus={() => isNameEditing.value = true} onBlur={() => isNameEditing.value = false}/>
      <DatePicker label="BirthDate" autoOpenDisabled value={personSignal.value?.birthDate} onValueChanged={ageChanged} onFocus={() => isAgeEditing.value = true} onBlur={() => isAgeEditing.value = false}/>
      <NumberField label="Age" value={age + ''} readonly />
      <TextField label="Is adult" value={age.value >= 18 ? 'Yes' : 'No'} readonly/>
      <br/>
      <pre>{JSON.stringify(personSignal)}</pre>
    </VerticalLayout>
  );
}
