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
    Sandbox,
    ContentResolver
} from 'cx/widgets';
import {LabelsTopLayout} from 'cx/ui';
import {AnimatedHeight} from 'app/components';
import sectionTypes from '../../sections';

export default <cx>
    <Sandbox key:bind="$section.id" storage:bind="sections" recordAlias="$sectionData">
        <div id:bind="$section.id"
            class={{
                section: true,
                edit: {bind: '$sectionData.form'}
            }}
        >
            <AnimatedHeight>

                <div visible:expr="!{$sectionData.form}">
                    <FlexRow align="center" style="margin-bottom: 10px">
                        <Heading level={3}>
                            <a href:tpl="#{$section.id}" text:bind="$section.title"></a>
                        </Heading>
                        <Button
                            mod="hollow"
                            icon="mode_edit"
                            style="margin-left: auto;"
                            onClick={(e, {store}) => {
                                let config = store.get('$section');
                                store.set('$sectionData.form', config);
                            }}
                        />
                    </FlexRow>
                    <ContentResolver
                        params:bind="$section"
                        onResolve={section => {
                            let sectionType = sectionTypes[section.type];
                            return sectionType && sectionType.view(section);
                        }}
                    />
                </div>

                <div visible:bind="$sectionData.form">
                    <ValidationGroup valid:bind="$sectionData.formValid">
                        <Rescope bind="$sectionData.form">
                            <ContentResolver
                                params:bind="$root.$section"
                                onResolve={section => {
                                    let sectionType = sectionTypes[section.type];
                                    return sectionType && sectionType.config;
                                }}
                            />
                        </Rescope>
                    </ValidationGroup>
                    <br/>
                    <FlexRow hspacing>
                        <Button
                            mod="primary"
                            icon="done"
                            disabled:expr="!{$sectionData.formValid}"
                            onClick={(e, {store}) => {
                                let form = store.get('$sectionData.form');
                                store.delete('$sectionData.form');
                                store.set('$section', form);
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={(e, {store}) => {
                                store.delete('$sectionData.form');
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

            </AnimatedHeight>
        </div>
    </Sandbox>
</cx>
