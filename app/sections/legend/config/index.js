import {HtmlElement, TextField, TextArea, LookupField, Slider, NumberField, LabeledContainer, FlexRow, Radio, Heading} from 'cx/widgets';

import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

import {pin} from '../../pin';

export default <cx>
    <div controller={Controller}>
        <p ws>
            The countries are colored based on the indicator value. This is very useful
            for a quick overview of how a selected indicator is spread in different parts of the world.
        </p>

        <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}}>
            <TextField value:bind="title" label="Title" style="width: 100%"
                required />

            <LookupField
                label="Region"
                value:bind="region.id"
                text:bind="region.name"
                optionTextField="name"
                onQuery="queryRegions"
                style="width:100%"
                fetchAll
            />

            <LookupField
                label={pin('Countries')}
                disabled:bind="pins.countries"
                multiple
                records:bind="countries"
                optionIdField="iso2Code"
                optionTextField="name"
                onQuery="queryCountries"
                style="width:100%"
                fetchAll
                cacheAll
            />

            <TextArea value:bind="note" label="Note" style="width: 100%" />
        </div>

    </div>
</cx>
