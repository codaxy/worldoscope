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
    Switch
} from 'cx/widgets';
import {LabelsTopLayout} from 'cx/ui';
import {AnimatedHeight} from 'app/components';

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
                    mod="hollow" icon="mode_edit" style="margin-left: auto"
                    onClick={(e, {store}) => {
                        let {title, description} = store.get('report');
                        store.set('header', {
                            title, description, edit: true
                        })
                    }}
                />
            </FlexRow>
            <p text:bind="report.description" visible:bind="report.description"/>
        </div>

        <div visible:bind="header.edit">
            <ValidationGroup
                layout={{type: LabelsTopLayout, vertical: true, mod: 'stretch'}}
                valid:bind="header.valid"
            >
                <TextField value:bind="header.title" label="Title" style="width: 100%" required/>
                <TextArea value:bind="header.description" label="Description" style="width: 100%"/>
                <div ws>
                    <Button
                        mod="primary"
                        icon="done"
                        disabled:expr="!{header.valid}"
                        onClick={(e, {store}) => {
                            let {title, description} = store.get('header');
                            store.delete('header');
                            store.update('report', rep => Object.assign({}, rep, {
                                title,
                                description
                            }));
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={(e, {store}) => {
                            store.delete('header');
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </ValidationGroup>
        </div>
    </AnimatedHeight>
</cx>
