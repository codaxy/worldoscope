import {HtmlElement, TextField, TextArea, LookupField} from 'cx/widgets';

import Controller from './Controller';

import {pin} from '../../pin';

export default <cx>
    <div controller={Controller}>
        <p ws>
            The countries are colored based on the indicator value. This is very useful
            for a quick overview of how a selected indicator is spread in different parts of the world.
        </p>

        <TextField value:bind="title" label="Title" style="width: 100%"
            required mod="block"/>

        <LookupField
            label={pin('Region')}
            disabled:bind="pins.region"
            value:bind="region.id"
            text:bind="region.name"
            optionTextField="name"
            onQuery="queryRegions"
            style="width:100%"
            fetchAll
            mod="block"
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
            mod="block"
        />

        <TextArea value:bind="note" label="Note" style="width: 100%"/>
    </div>
</cx>
