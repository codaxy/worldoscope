import {HtmlElement, Link, Icon, Repeater} from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <h1 putInto="header">World Bank Data Reports</h1>
    <div class="page" controller={Controller}>
        <div class="prose">
            <h2>Welcome</h2>
            <p ws>
                This app allows you to create beautiful reports
                based on a set of predefined section templates and
                a vast historical data-set provided by The World Bank.
                Explore thousands of indicators, observe trends in the period of the last
                50 years, compare your country with the neighbourhood and
                share your findings simply by sharing the url.
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
            <p visible:expr="!{user.uid}">
                <i style="color:gray">
                    You can star reports once you sign in.
                </i>
            </p>
            <Repeater records:bind="$page.stars" visible:expr="!!{user.uid}">
                <Link href:tpl="~/{$record.id}" baseClass="button" mod="hollow" text:bind="$record.title"/><br/>
            </Repeater>
        </div>
    </div>
</cx>
