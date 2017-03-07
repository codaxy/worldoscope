import {HtmlElement, TextField, TextArea, LookupField, Slider, NumberField, LabeledContainer, FlexRow} from 'cx/widgets';

import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

export default <cx>
    <div controller={Controller}>
        <p ws>
            Bar graph presents values of the selected indicator across multiple countries.
            This is useful to compare many countries at once.
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
            />

            <LookupField
                label="Indicator"
                value:bind="indicator.id"
                text:bind="indicator.name"
                optionTextField="name"
                onQuery="queryTopicIndicators"
                style="width:100%"
                fetchAll
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
                        />
                    </FlexRow>
                </LabeledContainer>
            </div>

            <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}} style="flex:1; max-width: 300px">
                <LabeledContainer label="Top">
                    <FlexRow>
                        <Slider
                            value={{
                                bind: 'top',
                                defaultValue: 15
                            }}
                            minValue={5}
                            maxValue={50}
                            step={1}
                            style="flex: 1; width: auto; max-width: 200px"
                        />

                        <NumberField
                            value:bind="top"
                            style="width:60px"
                            inputStyle="text-align:center"
                            format="s"
                            increment={1}
                            minValue={5}
                            maxValue={50}
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
