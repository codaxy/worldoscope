import {HtmlElement, Link, Icon, Repeater, DocumentTitle, FlexCol, FlexRow, Heading} from 'cx/widgets';

import Controller from './Controller';

export default <cx>
    <DocumentTitle value="Home"/>
    <h1 putInto="header">World Bank Data Reports</h1>
    <div class="page" controller={Controller}>
        <div class="prose">
            <h2>Welcome</h2>
            <FlexRow hspacing="xlarge" align="start">
                <div>
                    <p ws>
                        This application allows you to create beautiful reports
                        by combining The World Bank database with a set of predefined section templates.
                        Use the application to explore thousands of indicators,
                        observe trends, find the best countries or compare your own country with the rest of the world.
                        Don't forget to share your own findings and star the best reports.
                    </p>
                    <FlexCol align="start">
                        <Link href="~/samples" class="link-button">
                            See sample reports
                        </Link>
                        <Link href="~/new" class="link-button">
                            Create a new report
                        </Link>
                        <Link href="~/my-reports" class="link-button">
                            Manage my reports
                        </Link>
                        <Link href="~/about" class="link-button">
                            Read more about the app
                        </Link>
                    </FlexCol>
                </div>
                <img src="~/assets/img/wbdr.png" visible={() => window.innerWidth >= 1000} style="width: 300px"/>
            </FlexRow>
        </div>
    </div>
    <FlexRow spacing wrap vpad>
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
</cx>
