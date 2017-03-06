import {
    HtmlElement,
    Rescope,
    TextField,
    PureContainer,
    Button,
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

import Controller from './Controller';
import Header from './Header';
import Section from './Section';

import {AnimatedHeight} from 'app/components';

export default <cx>

    <div controller={Controller}>

        <PureContainer putInto="header">
            <h1 />
            <Button
                mod="hollow"
                icon="save"
                style="margin-left: auto"
                onClick="saveReport"
                disabled:expr="{$page.report.autoSave}"
            />
            <Button mod="hollow" icon="star_border" onClick="starReport" visible:expr="{$page.starred} === false"/>
            <Button mod="hollow" icon="star" onClick="unstarReport" visible:expr="{$page.starred} === true"/>
        </PureContainer>

        <div visible:expr="{$page.status} == 'loading'" class="loading">
            <Icon name="loading"/> Loading
        </div>

        <div class="page" visible:expr="!{$page.status}">
            <Rescope bind="$page" visible:expr="{report} != null">
                <Header />

                <Repeater records:bind="report.sections" recordAlias="$section">
                    <Section />
                </Repeater>

                <FlexRow putInto="footer" class="footer" align="center">
                    <Menu horizontal>
                        <Submenu>
                            <a href="#" ws><Icon name="add"/> Add Section</a>
                            <Menu putInto="dropdown">
                                <a href="#" onClick="addMap"><Icon name="map"/> Map</a>
                                <a href="#" onClick="addLineGraph"><Icon name="show_chart"/> Line Graph</a>
                                <a href="#" onClick="addBarGraph"><Icon name="format_align_left"/> Bar Graph</a>
                                <a href="#" onClick="addColumnGraph"><Icon name="insert_chart"/> Column Graph</a>
                                <a href="#" onClick="addTable"><Icon name="grid_on"/> Table</a>
                            </Menu>
                        </Submenu>
                    </Menu>
                    <Switch
                        value:bind="report.autoSave"
                        style="margin-left: auto"
                        disabled:expr="!{report.id}"
                    >
                        Auto Save
                    </Switch>
                </FlexRow>
            </Rescope>
        </div>
    </div>
</cx>
