import {HtmlElement, Link, Icon, Repeater} from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <h1 putInto="header">World Bank Data Explorer</h1>
    <div class="page" controller={Controller}>
        <div class="prose">
            <h2>Welcome</h2>
            <p ws>
                The World Bank provides historical data
                for almost all countries across thousands of indicators.
                This app allows you to create beautiful reports
                based on this vast data-set and predefined section templates.
                Compare your country with the neighbourhood and share the report with the world.
            </p>

            <p>
                What would you like to do?
            </p>

            <Link href="~/samples" baseClass="button" mod="hollow">
                See some of the sample reports
            </Link>
            <br/>
            <Link href="~/new" baseClass="button" mod="hollow">
                Create a new report
            </Link>
            <br/>
            <Link href="~/my-reports" baseClass="button" mod="hollow">
                Manage my reports
            </Link>
            <br/>
            <Link href="~/about" baseClass="button" mod="hollow">
                Read more about the app
            </Link>

            <p>
                Starred reports:
            </p>
            <i
                style="color:gray"
                visible:expr="!{user.uid}"
            >
                You can star reports only if you sign in.
            </i>
            <Repeater records:bind="$page.stars" visible:expr="!!{user.uid}">
                <Link href:tpl="~/{$record.id}" baseClass="button" mod="hollow" text:bind="$record.title" /><br/>
            </Repeater>
        </div>
    </div>
</cx>
