import {HtmlElement, Link} from 'cx/widgets';

export default <cx>
    <h1 putInto="header">About</h1>
    <div class="page">
        <div class="prose">
            <h2>The App</h2>
            <p ws>
                This application is built using a number of open-source products such as React, Babel and Webpack.
                Widgets and charts are provided by the powerful, commercial front-end framework called Cx.
                Data for reports is fetched using the [World Bank Data API](http://data.worldbank.org/).
                Report definitions are stored using Firebase and Firebase is also used for authentication and hosting.
                The source code is available at GitHub.
            </p>

            <h2>Codaxy</h2>
            <p ws>
                We're a small software company specialized in developing business application front-ends.
                You may already know us if you're familiar with Cx or if you have used one of our themes for
                Sencha Ext JS. We also provide software development services, so if you have an interesting project,
                feel free to contact us.
            </p>
        </div>
    </div>
</cx>
