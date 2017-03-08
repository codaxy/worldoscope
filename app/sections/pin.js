import {Label, Button} from 'cx/widgets';

export const pin = (text, field) => {
    field = field || text.toLowerCase();
    return <cx>
        <Label ws>
            {text}
            <Button
                tooltip="Track and use the value defined at the report level."
                icon="find_replace"
                mod={["hollow", "small"]}
                pressed:bind={`pins.${field}`}
                onClick={(e, {store}) => {
                    e.preventDefault();
                    e.stopPropagation();
                    store.toggle(`pins.${field}`)
                }}
            />
        </Label>
    </cx>;
}