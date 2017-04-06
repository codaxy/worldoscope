import {HtmlElement, Link, DocumentTitle, FlexRow} from 'cx/widgets';

let hsid = process.env.HS_ID || false;

export default <cx>
    <DocumentTitle value="About"/>
    <h1 putInto="header">About</h1>
    <div class="page">
        <div class="prose">
            <FlexRow hspacing="xlarge" align="center">
                <div>
                    <h2>The App</h2>
                    <p ws>
                        This is a CxJS demo application and it illustrates usage of the
                        framework, its widgets and charts.
                        Data needed for reports is fetched directly from The World Bank API endpoint.
                        Besides CxJS, the application is built on top of modern web technologies such as React, Babel
                        and Webpack.
                        Google Firebase is used to store report definitions, authentication and hosting.
                        Circle CI is used for continuous deployment.
                    </p>

                    <p ws>
                        <a href="https://cxjs.io/">CxJS</a> -
                        <a href="http://data.worldbank.org/">The World Bank Data API</a> -
                        <a href="https://facebook.github.io/react/">React</a> -
                        <a href="https://babeljs.io/">Babel</a> -
                        <a href="https://webpack.js.org//">webpack</a> -
                        <a href="https://firebase.google.com/">Firebase</a> -
                        <a href="https://circleci.com/">Circle CI</a>
                    </p>
                </div>
                <img src="~/assets/img/preview.png" visible={() => window.innerWidth >= 1000} style="width: 250px"/>
            </FlexRow>

            <h2>CxJS</h2>
            <p ws>
                CxJS is a commercial UI framework designed to
                streamline development of complex user interfaces.
                Out of the box, Cx includes form elements, form validation, advanced grid control,
                navigation elements, tooltips, overlays, charts, routing, layout support, themes,
                drag & drop support, culture dependent formatting and more. If you're building an application
                that needs some of these features, you should definitely check out Cx.
                It's free for non-commercial purposes.
            </p>

            <p ws>
                <a href="https://cxjs.io/">Website</a> -
                <a href="https://cxjs.io/examples">Examples</a> -
                <a href="https://cxjs.io/themes">Themes</a> -
                <a href="https://cxjs.io/docs">Documentation</a>
            </p>



            <FlexRow hspacing="xlarge" align="center">
                <div>
                    <h2>Codaxy</h2>
                    <p ws>
                        We're a small software company specialized in development of modern business application
                        front-ends.
                        You may know us if you're already familiar with Cx or if you have used one of
                        <a href="https://store.codaxy.com/Themes">our themes for Sencha Ext JS</a>.
                        We provide software development services, feel free to contact us
                        if you have an interesting project.
                    </p>

                    <p ws>
                        <a href="https://www.codaxy.com/">Website</a> -
                        <a href="https://www.codaxy.com/#contact">Contact</a> -
                        <a href="https://twitter.com/codaxy">Twitter</a> -
                        <a href="https://blog.codaxy.com">Blog</a> -
                        <a href="https://store.codaxy.com">Store</a>
                    </p>
                </div>
                <img src="~/assets/img/codaxy-logo.svg" visible={() => window.innerWidth >= 1000}
                    style="width: 150px; margin: 0 50px"/>
            </FlexRow>


        </div>
        <script
            visible={!!hsid}
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src={`//js.hs-scripts.com/${hsid}.js`} />
    </div>
</cx>
