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
    Repeater
} from 'cx/widgets';
import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';

export default <cx>
    <PureContainer putInto="header">
        <h1></h1>
        <Button mod="hollow" icon="save" style="margin-left: auto"/>
    </PureContainer>

    <div controller={Controller} class="report">
        <Rescope bind="$page" visible:expr="{report} != null">
            <div class={{
                section: true,
                edit: { bind: 'report.header.edit' }
            }}
            >
                <div visible:expr="!{report.header.edit}">
                    <FlexRow align="center" vpad>
                        <Heading text:bind="report.title" level={2}/>
                        <Button
                            mod="hollow" icon="mode_edit" style="margin-left: auto"
                            onClick={(e, {store}) => {
                                let {title, description} = store.get('report');
                                store.set('report.header', {
                                    title, description, edit: true
                                })
                            }}
                        />
                    </FlexRow>
                    <p text:bind="report.description" visible:bind="report.description"/>
                </div>


                <div visible:bind="report.header.edit">
                    <ValidationGroup
                        layout={{type: LabelsTopLayout, vertical: true, mod: 'stretch'}}
                        valid:bind="report.header.valid"
                    >
                        <TextField value:bind="report.header.title" label="Title" style="width: 100%" required/>
                        <TextArea value:bind="report.header.description" label="Description" style="width: 100%"/>
                        <div ws>
                            <Button
                                mod="primary"
                                icon="done"
                                disabled:expr="!{report.header.valid}"
                                onClick={(e, {store}) => {
                                    let {title, description} = store.get('report.header');
                                    store.delete('report.header');
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
                                    store.delete('report.header');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </ValidationGroup>
                </div>
            </div>

            <Repeater records:bind="report.sections" recordAlias="$section">
                <div class={{
                    section: true,
                    edit: { bind: '$section.form' }
                }}
                >
                    <div visible:expr="!{$section.form}">
                        <FlexRow align="center" vpad>
                            <Heading text:bind="$section.config.title" level={3}/>
                            <Button
                                mod="hollow" icon="mode_edit" style="margin-left: auto"
                                onClick={(e, {store}) => {
                                    let config = store.get('$section.config') || {};
                                    store.set('$section.form', config);
                                }}
                            />
                        </FlexRow>
                    </div>


                    <div visible:bind="$section.form">
                        <ValidationGroup valid:bind="$section.form.valid">
                            <div layout={{ type: LabelsTopLayout, mod: 'stretch' }}>
                                <TextField value:bind="$section.form.title" label="Title" style="width: 100%" required/>
                            </div>
                        </ValidationGroup>
                        <br/>
                        <FlexRow hspacing>
                            <Button
                                mod="primary"
                                icon="done"
                                disabled:expr="!{$section.form.valid}"
                                onClick={(e, {store}) => {
                                    let form = store.get('$section.form');
                                    store.delete('$section.form');
                                    store.set('$section.config', form);
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={(e, {store}) => {
                                    store.delete('$section.form');
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                mod="danger"
                                style="margin-left: auto"
                                confirm="Are you sure that you want to delete this section?"
                                onClick={(e, {store}) => {
                                    let s = store.get('$section');
                                    store.update('report.sections', sections => sections.filter(x => x != s));
                                }}
                            >
                                Delete
                            </Button>
                        </FlexRow>
                    </div>

                </div>
            </Repeater>
        </Rescope>

        <FlexRow putInto="footer" class="footer">
            <Menu horizontal>
                <Submenu>
                    <a href="#" ws><Icon name="add"/> Add Section</a>
                    <Menu putInto="dropdown">
                        <a href="#" onClick="addMap"><Icon name="map"/> Map</a>
                        <a href="#" onClick="addMap"><Icon name="show_chart"/> Line Graph</a>
                        <a href="#" onClick="addMap"><Icon name="format_align_left"/> Bar Graph</a>
                        <a href="#" onClick="addMap"><Icon name="insert_chart"/> Column Graph</a>
                        <a href="#" onClick="addTable"><Icon name="grid_on"/> Table</a>
                    </Menu>
                </Submenu>
            </Menu>
        </FlexRow>
    </div>
</cx>
