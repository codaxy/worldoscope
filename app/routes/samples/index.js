import {HtmlElement, Rescope, Text, Repeater, FlexRow, Link, Icon, Heading, DocumentTitle} from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <DocumentTitle value="Samples" />
    <Rescope bind="$page">
        <h1 putInto="header">Samples</h1>
        <div controller={Controller}>
            <FlexRow wrap spacing="large" pad>
                <Repeater records:bind="reports">
                    <Link class="report-card" href:tpl="~/{$record.id}">
                        <FlexRow align="center">
                            <Heading text:bind="$record.title" level={4} style="flex:1"/>

                            <Icon name="star"/>
                            <span text:bind="$record.starCount"/>

                        </FlexRow>
                        <p text:bind="$record.description" visible:bind="$record.description"/>
                    </Link>
                </Repeater>
                <a className="report-card hidden" />
                <a className="report-card hidden" />
            </FlexRow>
        </div>
    </Rescope>
</cx>
