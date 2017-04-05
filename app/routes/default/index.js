import {HtmlElement, Link, Icon, Repeater, DocumentTitle, FlexCol, FlexRow, Heading, Tab, Button} from 'cx/widgets';

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
                        <Icon name="add" />
                        New report
                    </Link>

                    <h3>Browse Reports</h3>

                    <FlexRow>
                        <Tab mod="line-accent" value:bind="$page.tab" tab="popular">Popular</Tab>
                        <Tab mod="line-accent" value:bind="$page.tab" tab="starred">Stars</Tab>
                        <Tab mod="line-accent" value:bind="$page.tab" tab="saved">Saved</Tab>
                    </FlexRow>
                </div>
                <img src="~/assets/img/wbdr.png" visible={() => window.innerWidth >= 1000} style="width: 300px"/>
            </FlexRow>
        </div>
        <div class="d">
            <br/>
            <FlexRow spacing wrap>
                <Repeater records:bind="$page.stars" visible:expr="!!{user.uid}">
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

        </div>
    </div>
</cx>
