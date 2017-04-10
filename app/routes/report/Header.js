import {
    HtmlElement,
    Rescope,
    TextField,
    PureContainer,
    Button,
    Section,
    FlexRow,
    TextArea,
    ValidationGroup,
    Heading,
    Menu,
    Submenu,
    Icon,
    Repeater,
    Switch,
    NumberField,
    Slider,
    LookupField,
    LabeledContainer
} from 'cx/widgets';

import {AnimatedHeight} from 'app/components';

import Controller from './HeaderController';

export default <cx>


    <AnimatedHeight class={{
        section: true,
        edit: {bind: 'header.edit'}
    }}
    >
        <div visible:expr="!{header.edit}">
            <FlexRow align="center" vpad>
                <Heading text:bind="report.title" level={2}/>
                <Button
                    visible:bind="editable"
                    mod="hollow" icon="mode_edit"
                    style="margin-left: auto"
                    class="ambient-color"
                    onClick="editHeader"
                />
            </FlexRow>
            <p text:bind="report.description" visible:bind="report.description"/>
        </div>

        <div visible:bind="header.edit" controller={Controller}>

            <Heading level={2}>Report Settings</Heading>

            <ValidationGroup valid:bind="header.valid">
                <TextField value:bind="header.title" label="Title" style="width: 100%" required mod="block" />
                <TextArea value:bind="header.description" label="Description" style="width: 100%" mod="block" />

                <Heading style="margin-top: 2rem">Section Defaults</Heading>

                    <LookupField
                        label="Topic"
                        value:bind="defaults.topic.id"
                        text:bind="defaults.topic.text"
                        optionTextField="value"
                        onQuery="queryTopics"
                        style="width:100%"
                        fetchAll
                        cacheAll
                        mod="block"
                    />

                    {/*<LookupField*/}
                        {/*label="Indicator"*/}
                        {/*value:bind="defaults.indicator.id"*/}
                        {/*text:bind="defaults.indicator.name"*/}
                        {/*optionTextField="name"*/}
                        {/*onQuery="queryTopicIndicators"*/}
                        {/*style="width:100%"*/}
                        {/*fetchAll*/}
                    {/*/>*/}

                    <LookupField
                        label="Region"
                        value:bind="defaults.region.id"
                        text:bind="defaults.region.name"
                        optionTextField="name"
                        onQuery="queryRegions"
                        style="width:100%"
                        fetchAll
                        cacheAll
                        mod="block"
                    />

                    <LookupField
                        label="Countries"
                        multiple
                        records:bind="defaults.countries"
                        optionIdField="iso2Code"
                        optionTextField="name"
                        onQuery="queryCountries"
                        style="width:100%"
                        fetchAll
                        mod="block"
                    />

                    <LabeledContainer label="Period" mod="block">
                        <FlexRow>

                            <NumberField
                                value:bind="defaults.fromYear"
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
                                    bind: 'defaults.fromYear',
                                    defaultValue: 2000
                                }}
                                to={{
                                    bind: 'defaults.toYear',
                                    defaultValue: 2015
                                }}
                                minValue={1960}
                                maxValue={2020}
                                step={1}
                            />

                            <NumberField
                                value:bind="defaults.toYear"
                                style="width:60px"
                                inputStyle="text-align:center"
                                format="s"
                                increment={1}
                                minValue={2000}
                                maxValue={2020}
                            />
                        </FlexRow>
                    </LabeledContainer>

                <br/>
                <div ws>
                    <Button
                        mod="primary"
                        icon="done"
                        disabled:expr="!{header.valid}"
                        onClick={(e, {store}) => {
                            let {title, description} = store.get('header');
                            let defaults = store.get('defaults');
                            store.delete('header');
                            store.delete('defaults');
                            store.update('report', rep => Object.assign({}, rep, {
                                title,
                                description,
                                defaults: clean(defaults)
                            }));
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={(e, {store}) => {
                            store.delete('header');
                            store.delete('defaults');
                        }}
                        mod="hollow"
                    >
                        Cancel
                    </Button>
                </div>
            </ValidationGroup>
        </div>
    </AnimatedHeight>
</cx>

function clean(data) {
    let result = {};
    for (var key in data)
        if (typeof data[key] != 'undefined')
            result[key] = data[key];
    return result;
}
