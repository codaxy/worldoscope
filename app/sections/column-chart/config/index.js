import {HtmlElement, TextField, TextArea, LookupField, Slider, NumberField, LabeledContainer, FlexRow} from 'cx/widgets';

import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

import {pin} from '../../pin';

export default <cx>
    <div controller={Controller}>
        <p ws>
            Column graph presents multiple related indicators for a handful of selected countries.
            This is useful to compare countries on multiple things at once.
        </p>
        <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}}>
            <LookupField
                label="Topic"
                value:bind="topic.id"
                text:bind="topic.text"
                optionTextField="value"
                onQuery="queryTopics"
                style="width:100%"
                fetchAll
                cacheAll
                required
            />

            <LookupField
                label="Indicators"
                records:bind="indicators"
                optionTextField="name"
                onQuery="queryTopicIndicators"
                style="width:100%"
                fetchAll
                multiple
                required
            />

            <LookupField
                label={pin('Countries')}
                disabled:bind="pins.countries"
                multiple
                records:bind="countries"
                optionTextField="name"
                onQuery="queryCountries"
                style="width:100%"
                fetchAll
                cacheAll
            />
        </div>

        <FlexRow wrap target="tablet">
            <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}} style="flex:1; max-width: 300px">
                <LabeledContainer label="Year">
                    <FlexRow>
                        <Slider
                            value={{
                                bind: 'year',
                                defaultValue: 2015
                            }}
                            minValue={1960}
                            maxValue={2020}
                            step={1}
                            style="flex: 1; width: auto; max-width: 200px"
                        />

                        <NumberField
                            value:bind="year"
                            style="width:60px"
                            inputStyle="text-align:center"
                            format="s"
                            increment={1}
                            minValue={1960}
                            maxValue={2020}
                            required
                        />
                    </FlexRow>
                </LabeledContainer>
            </div>
        </FlexRow>

        <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}}>
            <TextField value:bind="title" label="Title" style="width: 100%"
                required />
        </div>
    </div>
</cx>
