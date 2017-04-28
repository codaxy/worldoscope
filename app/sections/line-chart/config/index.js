import {
	HtmlElement,
	TextField,
	TextArea,
	LookupField,
	NumberField,
	Slider,
	LabeledContainer,
	FlexRow
} from "cx/widgets";

import Controller from "./Controller";

import { pin } from "../../pin";

export default (
	<cx>
		<div controller={Controller}>
			<p ws>
				Line charts present historical trends of a selected indicator for a set of selected countries.
				Use line charts to display data for longer time periods or to compare two or more countries.
			</p>

			<TextField
				value:bind="title"
				label="Title"
				style="width: 100%"
				required
				autoFocus
			/>

			<LookupField
				label="Topic"
				value:bind="topic.id"
				text:bind="topic.text"
				optionTextField="value"
				onQuery="queryTopics"
				mod="block"
				fetchAll
				cacheAll
				required
			/>

			<LookupField
				label="Indicator"
				value:bind="indicator.id"
				text:bind="indicator.name"
				optionTextField="name"
				onQuery="queryTopicIndicators"
				mod="block"
				fetchAll
				required
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
				cacheAll
			/>

			<LookupField
				label={pin("Countries")}
				disabled:bind="pins.countries"
				multiple
				records:bind="countries"
				optionIdField="iso2Code"
				optionTextField="name"
				onQuery="queryCountries"
				mod="block"
				fetchAll
			/>

			<LabeledContainer label={pin("Period")} mod="block">
				<FlexRow>

					<NumberField
						value:bind="fromYear"
						style="width:60px"
						inputStyle="text-align:center"
						format="s"
						increment={1}
						minValue={1960}
						maxValue={2020}
						disabled:bind="pins.period"
						reactOn="enter blur"
					/>

					<Slider
						style="flex:1; width: auto; max-width: 250px"
						range
						from={{
							bind: "fromYear",
							defaultValue: 2000
						}}
						to={{
							bind: "toYear",
							defaultValue: 2015
						}}
						minValue={1960}
						maxValue={2020}
						step={1}
						disabled:bind="pins.period"
					/>

					<NumberField
						value:bind="toYear"
						style="width:60px"
						inputStyle="text-align:center"
						format="s"
						increment={1}
						minValue={2000}
						maxValue={2020}
						disabled:bind="pins.period"
						reactOn="enter blur"
					/>
				</FlexRow>
			</LabeledContainer>

			<TextArea value:bind="note" label="Note" mod="block" />
		</div>
	</cx>
);
