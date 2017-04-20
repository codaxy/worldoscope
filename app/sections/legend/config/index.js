import { HtmlElement, TextField, TextArea, LookupField } from "cx/widgets";

import Controller from "./Controller";

import { pin } from "../../pin";

export default (
	<cx>
		<div controller={Controller}>
			<p ws>
				The legend shows geographical location of the selected countries.
			</p>

			<TextField
				value:bind="title"
				label="Title"
				style="width: 100%"
				required
				mod="block"
				autoFocus
			/>

			<LookupField
				label={pin("Region")}
				disabled:bind="pins.region"
				value:bind="region.id"
				text:bind="region.name"
				optionTextField="name"
				onQuery="queryRegions"
				style="width:100%"
				fetchAll
				mod="block"
			/>

			<LookupField
				label={pin("Countries")}
				disabled:bind="pins.countries"
				multiple
				records:bind="countries"
				optionIdField="iso2Code"
				optionTextField="name"
				onQuery="queryCountries"
				style="width:100%"
				fetchAll
				cacheAll
				mod="block"
			/>

			<TextArea value:bind="note" label="Note" style="width: 100%" />
		</div>
	</cx>
);
