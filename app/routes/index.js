import { Route, PureContainer, HtmlElement } from 'cx/widgets';
import { FirstVisibleChildLayout } from 'cx/ui';

import AppLayout from '../layout';

import Default from './default';
import About from './about';
import Samples from './samples';
import Report from './report';


export default <cx>
    <PureContainer outerLayout={AppLayout} layout={FirstVisibleChildLayout}>
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
    </PureContainer>
</cx>

