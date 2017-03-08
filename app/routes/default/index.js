import {HtmlElement, Link, Icon, Repeater} from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <h1 putInto="header">World Bank Data Reports</h1>
    <div class="page" controller={Controller}>
        <div class="prose">
            <h2>Welcome</h2>
            <p ws>
                This app allows you to create beautiful reports
                based on a set of predefined section templates and data from
                a vast historical database provided by The World Bank.
                Explore thousands of indicators, observe trends in the last
                50 years or compare your country with the neighbourhood.
                Share your own findings and nominate the best reports for the gallery by giving a star.
            </p>

            <p>
                What would you like to do?
            </p>

            <Link href="~/samples" baseClass="button" mod="hollow">
                See sample reports
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
