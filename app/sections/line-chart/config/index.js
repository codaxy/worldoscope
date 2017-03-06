import { HtmlElement, TextField, LookupField } from 'cx/widgets';
import { LabelsTopLayout } from 'cx/ui';

import Controller from './Controller';

export default <cx>
    <div controller={Controller}>
    <p ws>
        Line charts show historical trends of a selected indicator for a handful set of selected countries.
        It's useful to display data for longer time periods or compare two or more countries.
    </p>
    <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
        <TextField value:bind="$sectionData.form.title" label="Title" style="width: 100%"
            required autoFocus/>
    </div>

        <div layout={{type: LabelsTopLayout, mod: 'stretch' }}>
            <LookupField
                label="Topic"
                value:bind="params.topic.id"
                text:bind="params.topic.text"
                optionTextField="value"
                onQuery="queryTopics"
                style="width:100%"
                fetchAll
                cacheAll
                required
            />
        </div>

    <div layout={{type: LabelsTopLayout, mod: 'stretch' }}>
        <LookupField
            label="Indicator"
            value:bind="params.indicator.id"
            text:bind="params.indicator.name"
            optionTextField="name"
            onQuery="queryTopicIndicators"
            style="width:100%"
            fetchAll
            required
        />
    </div>
    </div>
</cx>
