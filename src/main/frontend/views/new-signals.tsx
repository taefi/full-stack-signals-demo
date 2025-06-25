import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import {sharedStringSignal} from "../temp/NewSharedValueService";
import {Button} from "@vaadin/react-components/Button.js";
import {useSignal} from "@vaadin/hilla-react-signals-new";

export const config: ViewConfig = {
    menu: { order: 0, icon: 'vaadin:handshake' },
    title: 'New Signals',
};

const stringSignal = sharedStringSignal({defaultValue: "-1"});

export default function NewSignalsView() {

    return (
        <div>
            <h1>New Signals</h1>
            <p>String value signal: {stringSignal.value}</p>
            <Button onClick={() => stringSignal.value = `${parseInt(stringSignal.value) + 1}`}>Increase!</Button>
        </div>
    );
}
