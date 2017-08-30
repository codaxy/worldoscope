import { Route, PureContainer, HtmlElement, Sandbox } from "cx/widgets";
import { FirstVisibleChildLayout } from "cx/ui";

import AppLayout from "../layout";
import { AsyncContent } from "app/components/AsyncContent";

import Default from "./default";
import About from "./about";
import SignIn from "./sign-in";

export default (
	<cx>
		<Sandbox
			key:bind="url"
			storage:bind="pages"
			outerLayout={AppLayout}
			layout={FirstVisibleChildLayout}
		>
			<Route route="~/sign-in" url:bind="url">
				<SignIn />
			</Route>
			<Route route="~/" url:bind="url">
				<Default />
			</Route>
			<Route route="~/about" url:bind="url">
				<About />
			</Route>
			<Route route="~/:id" url:bind="url">
				<AsyncContent
					onLoadContent={() =>
						System.import(/* webpackChunkName: "report" */ "./report").then(x => x.default)}
				/>
			</Route>
			<div class="prose">
				Page not found.
			</div>
		</Sandbox>
	</cx>
);
