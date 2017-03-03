import { HtmlElement, Rescope, Text, Repeater, FlexRow, Link, Icon } from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <Rescope bind="$page">
        <h1 putInto="header">Samples</h1>
        <div class="prose" controller={Controller}>
            <FlexRow wrap spacing="large">
                <Repeater records:bind="reports">
                    <Link class="report-card" href:tpl="~/{$record.key}">
                        <Icon name="menu" />
                        <h4 text:bind="$record.title"/>
                        <p>Tra la la</p>
                    </Link>
                </Repeater>
            </FlexRow>
        </div>
    </Rescope>
</cx>
