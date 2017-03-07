import { HtmlElement, Rescope, Text, Repeater, FlexRow, Link, Icon, Heading } from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <Rescope bind="$page">
        <h1 putInto="header">Samples</h1>
        <div controller={Controller}>
            <FlexRow wrap spacing="large" pad>
                <Repeater records:bind="reports">
                    <Link class="report-card" href:tpl="~/{$record.key}">
                        <FlexRow align="center" hspacing>
                            <Icon name="insert_chart" />
                            <Heading text:bind="$record.title" level={4}/>
                        </FlexRow>
                        <p text:bind="$record.description" visible:bind="$record.description" />
                    </Link>
                </Repeater>
            </FlexRow>
        </div>
    </Rescope>
</cx>
