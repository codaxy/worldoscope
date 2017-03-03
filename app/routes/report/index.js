import { HtmlElement, Rescope, TextField, PureContainer, Button, Section, FlexRow } from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <PureContainer putInto="header">
        <h1></h1>
        <Button mod="hollow" icon="save" style="margin-left: auto" />
    </PureContainer>

    <div controller={Controller} class="report">
        <Rescope bind="$page" visible:expr="{report} != null">
            <FlexRow>
                <h2 text:bind="report.title"/>
                <Button mod="hollow" icon="mode_edit" style="margin-left: auto" />
            </FlexRow>


            <TextField value:bind="report.title" />
        </Rescope>
    </div>
</cx>
