import {HtmlElement, Link} from 'cx/widgets';

export default <cx>
    <h1 putInto="header">About</h1>
    <div class="page">
        <div class="prose">
            <h2>The App</h2>
            <p ws>
                This is a demo application for <a href="https://cxjs.io/">Cx.js</a>.
                The application is built using Cx and open-source products such as React, Babel and Webpack.
                Data for reports is fetched from <a href="http://data.worldbank.org/">World Bank Data API</a>.
                <a href="https://firebase.google.com/">Firebase</a> is used to store report definitions and also for authentication and hosting.
                The source code is available at GitHub.
            </p>

            <h2>Codaxy</h2>
            <p ws>
                We're a small software company specialized in developing business application front-ends.
                You may know us if you're already familiar with Cx or if you have used one of
                <a href="https://store.codaxy.com/Themes">our themes for Sencha Ext JS</a>.
                We provide software development services, so feel free to contact us
                if you have an interesting project.
            </p>

            <h2>Cx.js</h2>
            <p ws>
                <a href="https://cxjs.io/">Cx.js</a> is a powerful UI framework designed to streamline development of complex user interfaces.
                Out of the box, Cx includes form elements, form validation, advanced grid control,
                navigational elements, tooltips, overlays, charts, routing, layout support, themes,
                drag & drop support, culture dependent formatting and more.
            </p>
        </div>
    </div>
</cx>
