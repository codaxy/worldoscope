import {HtmlElement, Link, Icon, Repeater, DocumentTitle, FlexCol, FlexRow, Heading, Tab, Button} from 'cx/widgets';
import {FirstVisibleChildLayout} from 'cx/ui';

import Controller from './Controller';

export default <cx>
    <DocumentTitle value="Home"/>
    <h1 putInto="header">World Bank Data Reports</h1>
    <div class="page2" controller={Controller}>
        <div class="welcome">
            <FlexRow hspacing="xlarge" align="center">
                <div>
                    <h2>Welcome</h2>
                    <p ws>
                        This application allows you to create beautiful reports
                        by combining The World Bank database with a set of predefined section templates.
                        Use the application to explore thousands of indicators,
                        observe trends, find the best countries or compare your own country with the rest of the world.
                        Don't forget to share your own findings and star the best reports.

                        <Link href="~/about">
                            Read more...
                        </Link>
                    </p>

                    {/*<Button mod="primary" icon="add" class="new-report-button">New Report</Button>*/}

                    <Link href="~/new" baseClass="button" mod="primary" class="new-report-button" ws>
                        <Icon name="add"/>
                        New report
                    </Link>

                    <h3>Browse Reports</h3>

                    <FlexRow>
                        <Tab mod="line-accent" value:bind="$page.tab" tab="popular">Popular</Tab>
                        <Tab mod="line-accent" value:bind="$page.tab" tab="starred">Stars</Tab>
                        <Tab mod="line-accent" value:bind="$page.tab" tab="saved">Saved</Tab>
                    </FlexRow>
                </div>
                <img src="~/assets/img/wbdr.png" visible={() => window.innerWidth >= 1000} style="width: 300px; margin-top: -40px"/>
            </FlexRow>
        </div>
        <div class="report-cards">
            <div visible:expr="{$page.tab} == 'popular'" layout={FirstVisibleChildLayout}>
                <p ws visible:expr="{$page.samples.status}=='loading'">
                    <Icon name="loading"/> Loading...
                </p>
                <FlexRow spacing wrap vpad>
                    <Repeater records:bind="$page.samples.data">
                        <Link class="report-card" href:tpl="~/{$record.id}">
                            <FlexRow align="center">
                                <Heading text:bind="$record.title" level={4} style="flex:1"/>
                                <Icon name="star"/>
                                <span text:bind="$record.starCount"/>
                            </FlexRow>
                            <p text:bind="$record.description" visible:bind="$record.description"/>
                        </Link>
                    </Repeater>
                    <a className="report-card hidden"/>
                    <a className="report-card hidden"/>
                </FlexRow>
            </div>
            <div visible:expr="{$page.tab} == 'starred'" layout={FirstVisibleChildLayout}>
                <p ws visible:expr="{$page.stars.status}=='loading'">
                    <Icon name="loading"/> Loading...
                </p>
                <FlexRow spacing wrap vpad visible:expr="!!{user.uid} && {$page.stars.data.length} > 0">
                    <Repeater records:bind="$page.stars.data">
                        <Link class="report-card" href:tpl="~/{$record.id}">
                            <FlexRow align="center" hspacing>
                                <Icon name="star" style="color:lightblue"/>
                                <Heading text:bind="$record.title" level={4}/>
                            </FlexRow>
                        </Link>
                    </Repeater>
                    <a className="report-card hidden"/>
                    <a className="report-card hidden"/>
                </FlexRow>
                <p ws visible:expr="!{user.uid}">
                    Your stars will appear once you <Link href="~/sign-in">sign in</Link>.
                </p>
                <p>
                    You haven't starred any reports yet.
                </p>
            </div>
            <div visible:expr="{$page.tab} == 'saved'" layout={FirstVisibleChildLayout}>
                <FlexRow spacing wrap vpad visible:expr="!!{user.uid} && {$page.myReports.data.length} > 0">
                    <Repeater records:bind="$page.myReports.data">
                        <Link class="report-card" href:tpl="~/{$record.key}">
                            <FlexRow align="center" hspacing>
                                <Icon name="insert_chart"/>
                                <Heading text:bind="$record.title" level={4}/>
                            </FlexRow>
                            <p text:bind="$record.description" visible:bind="$record.description"/>
                        </Link>
                    </Repeater>
                    <a className="report-card hidden"/>
                    <a className="report-card hidden"/>
                </FlexRow>
                <p ws visible:expr="!{user.uid}">
                    Your reports will appear once you <Link href="~/sign-in">sign in</Link>.
                </p>
                <p>
                    You haven't created any reports yet. Come on, give it a try.
                </p>
            </div>
        </div>
    </div>
</cx>
