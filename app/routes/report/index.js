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
    Switch,
    DropZone
} from 'cx/widgets';
import {ColorMap} from 'cx/charts';
import {LabelsTopLayout} from 'cx/ui';

import Controller from './Controller';
import Header from './Header';
import Section from './Section';

import {AnimatedHeight, HashRestore} from 'app/components';

function moveElement(array, sourceIndex, targetIndex) {
    if (targetIndex == sourceIndex)
        return array;

    let el = array[sourceIndex];
    let res = [...array];
    if (sourceIndex < targetIndex) {
        for (let i = sourceIndex; i + 1 < targetIndex; i++)
            res[i] = res[i + 1];
        targetIndex--;
    }
    else {
        for (let i = sourceIndex; i > targetIndex; i--)
            res[i] = res[i - 1];
    }
    res[targetIndex] = el;
    return res;
}

export default <cx>

    <div controller={Controller}>

        <PureContainer putInto="header">
            <h1 />
            <Button
                mod="hollow"
                icon="save"
                style="margin-left: auto"
                onClick="saveReport"
                disabled:expr="{$page.report.autoSave} && {$page.report.id}"
                visible:bind="$page.editable"
            />
            <Button
                mod="hollow"
                icon:expr="{$page.report.public} ? 'lock_open' : 'lock'"
                onClick="toggleLock"
                visible:expr="{$page.editable} && {$page.report.id}"
                tooltip:expr="{$page.report.public} ? 'This report is listed in the samples gallery.' : 'This report is not listed in the samples gallery.'"
            />

            <Button mod="hollow" icon="star_border" onClick="starReport" visible:expr="{$page.starred} === false"/>
            <Button mod="hollow" icon="star" onClick="unstarReport" visible:expr="{$page.starred} === true"/>

            <Button mod="hollow" icon="content_copy" onClick="copyReport" tooltip="Copy this report into a new one..." visible:expr="!!{$page.report.id}" />
        </PureContainer>

        <div visible:expr="{$page.status} == 'loading'" class="loading">
            <Icon name="loading"/> Loading
        </div>

        <div class="page" visible:expr="!{$page.status}">
            <Rescope bind="$page" visible:expr="{report} != null">
                <Header />

                <ColorMap />

                <HashRestore />

                <DropZone
                    mod="block"
                    onDropTest={e=>e.source.data.type == 'section'}
                    onDrop={(e, {store}) => {
                        store.update('report.sections', moveElement, e.source.data.index, 0);
                    }}
                    matchHeight
                    matchMargin
                    inflate={800}
                />
                <Repeater records:bind="report.sections" recordAlias="$section" idField="id">
                    <Section />
                    <DropZone
                        mod="block"
                        onDropTest={e=>e.source.data.type == 'section'}
                        onDrop={(e, {store}) => {
                            store.update('report.sections', moveElement, e.source.data.index, store.get('$index') + 1);
                        }}
                        matchHeight
                        matchMargin
                        inflate={800}
                    />
                </Repeater>

                <FlexRow putInto="footer" class="footer" align="center">
                    <Button
                        mod="hollow"
                        icon="vertical_align_top"
                        tooltip="Back to Top"
                        onClick={() => {
                            (document.scrollingElement || document.documentElement).scrollTop = 0;
                        }}
                    />
                    <Menu
                        horizontal
                        visible:bind="editable"
                    >
                        <Submenu>
                            <a href="#" ws><Icon name="add"/> Add Section</a>
                            <Menu putInto="dropdown">
                                <a href="#" onClick="addLegend"><Icon name="map"/> Map - Legend</a>
                                <a href="#" onClick="addMap"><Icon name="map"/> Map - Heatmap</a>
                                <a href="#" onClick="addLineGraph"><Icon name="show_chart"/> Line Graph</a>
                                <a href="#" onClick="addBarGraph"><Icon name="format_align_left"/> Bar Graph</a>
                                <a href="#" onClick="addColumnGraph"><Icon name="insert_chart"/> Column Graph</a>
                                <a href="#" onClick="addTable"><Icon name="grid_on"/> Table - Indicator Trend</a>
                                <a href="#" onClick="addTableComparison"><Icon name="grid_on"/> Table - Multiple Indicators</a>
                            </Menu>
                        </Submenu>
                    </Menu>
                    <Switch
                        value:bind="report.autoSave"
                        style="margin-left: auto"
                        disabled:expr="!{report.id}"
                        visible:bind="editable"
                    >
                        Auto Save
                    </Switch>
                    <Button
                        mod="hollow"
                        icon="delete"
                        disabled:expr="!{report.id}"
                        visible:bind="editable"
                        tooltip="Delete this report"
                        confirm="Are you sure that you want to delete this report?"
                        onClick="deleteReport"
                    />
                </FlexRow>
            </Rescope>
        </div>
    </div>
</cx>
