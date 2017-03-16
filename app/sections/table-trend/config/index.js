import {HtmlElement, TextField, TextArea, LookupField, Slider, NumberField, LabeledContainer, FlexRow} from 'cx/widgets';

import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';
import {pin} from '../../pin';

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

        <FlexRow wrap target="tablet" hspacing>

            <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}} style="flex:1; max-width: 300px">
                <LookupField
                    label={pin('Region')}
                    disabled:bind="pins.region"
                    value:bind="region.id"
                    text:bind="region.name"
                    optionTextField="name"
                    onQuery="queryRegions"
                    style="width:100%"
                    fetchAll
                />
            </div>

            <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}} style="flex:1; max-width: 300px">
                <LabeledContainer label={pin('Period')}>
                    <FlexRow>

                        <NumberField
                            value:bind="fromYear"
                            style="width:60px"
                            inputStyle="text-align:center"
                            format="s"
                            increment={1}
                            minValue={1960}
                            maxValue={2020}
                            disabled:bind="pins.period"
                        />

                        <Slider
                            style="flex:1; width: auto; max-width: 250px"
                            range
                            from={{
                                bind: 'fromYear',
                                defaultValue: 2005
                            }}
                            to={{
                                bind: 'toYear',
                                defaultValue: 2015
                            }}
                            minValue={1960}
                            maxValue={2020}
                            step={1}
                            disabled:bind="pins.period"
                        />

                        <NumberField
                            value:bind="toYear"
                            style="width:60px"
                            inputStyle="text-align:center"
                            format="s"
                            increment={1}
                            minValue={2000}
                            maxValue={2020}
                            disabled:bind="pins.period"
                        />
                    </FlexRow>
                </LabeledContainer>
            </div>

        </FlexRow>

        <div layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}}>
            <TextField value:bind="title" label="Title" mod="block"
                required />

            <TextArea value:bind="note" label="Note" style="width: 100%" />
        </div>
    </div>
</cx>
