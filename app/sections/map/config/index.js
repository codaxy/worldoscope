import {HtmlElement, TextField, TextArea, LookupField, Slider, NumberField, LabeledContainer, FlexRow, Radio, Heading} from 'cx/widgets';

import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

export default <cx>
    <div controller={Controller}>
        <p ws>
            The countries are colored based on the indicator value. This is very useful
            for a quick overview of how a selected indicator is spread in different parts of the world.
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
                label="Indicator"
                value:bind="indicator.id"
                text:bind="indicator.name"
                optionTextField="name"
                onQuery="queryTopicIndicators"
                style="width:100%"
                fetchAll
                required
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

            <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}} style="flex:1; max-width: 300px">
                <LookupField
                    label="Region"
                    value:bind="region.id"
                    text:bind="region.name"
                    optionTextField="name"
                    onQuery="queryRegions"
                    style="width:100%"
                    fetchAll
                />
            </div>

        </FlexRow>

        <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}}>
            <TextField value:bind="title" label="Title" style="width: 100%"
                required />
        </div>
    </div>
</cx>
