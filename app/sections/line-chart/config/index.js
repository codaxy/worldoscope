import {HtmlElement, TextField, LookupField, NumberField, Slider, LabeledContainer, FlexRow} from 'cx/widgets';
import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

export default <cx>
    <div controller={Controller}>
        <p ws>
            Line charts present historical trends of a selected indicator for a handful set of selected countries.
            Use line charts to display data for longer time periods or to compare two or more countries.
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
                autoFocus
            />

            <LookupField
                label="Indicator"
                value:bind="indicator.id"
                text:bind="indicator.name"
                optionTextField="name"
                onQuery="queryTopicIndicators"
                style="width:100%"
                fetchAll
                required
            />

            <TextField value:bind="title" label="Title" style="width: 100%"
                required />

            <LookupField
                label="Countries"
                multiple
                records:bind="countries"
                optionTextField="name"
                onQuery="queryCountries"
                style="width:100%"
                fetchAll
                cacheAll
            />

        </div>


        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
            <LabeledContainer label="Period">
                <FlexRow>

                    <NumberField
                        value:bind="fromYear"
                        style="width:60px"
                        inputStyle="text-align:center"
                        format="s"
                        increment={1}
                        minValue={1960}
                        maxValue={2020}
                    />

                    <Slider
                        style="flex:1; width: auto; max-width: 250px"
                        range
                        from={{
                            bind: 'fromYear',
                            defaultValue: 2000
                        }}
                        to={{
                            bind: 'toYear',
                            defaultValue: 2015
                        }}
                        minValue={1960}
                        maxValue={2020}
                        step={1}
                    />

                    <NumberField
                        value:bind="toYear"
                        style="width:60px"
                        inputStyle="text-align:center"
                        format="s"
                        increment={1}
                        minValue={2000}
                        maxValue={2020}
                    />
                </FlexRow>
            </LabeledContainer>
        </div>

    </div>
</cx>
