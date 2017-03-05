import {Route, PureContainer, HtmlElement, Sandbox} from 'cx/widgets';
import {FirstVisibleChildLayout } from 'cx/ui';

import AppLayout from '../layout';

import Default from './default';
import About from './about';
import Samples from './samples';
import Report from './report';


export default <cx>
    <Sandbox key:bind="url" storage:bind="pages" outerLayout={AppLayout} layout={FirstVisibleChildLayout}>
        <Route route="~/" url:bind="url">
            <Default/>
        </Route>
        <Route route="~/about" url:bind="url">
            <About/>
        </Route>
        <Route route="~/samples" url:bind="url">
            <Samples/>
        </Route>
        <Route route="~/:id" url:bind="url">
            <Report />
        </Route>
        <div class="prose">
            Page not found.
        </div>
    </Sandbox>
</cx>

