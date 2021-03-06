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
				Line charts with multiple indicators present historical trends for a list of selected indicators in a
				single country.
				Use this chart type to compare trends of two or more related indicators.
			</p>

			<TextField
				value:bind="title"
				label="Title"
				style="width: 100%"
				mod="block"
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
				label="Indicators"
				records:bind="indicators"
				optionTextField="name"
				onQuery="queryTopicIndicators"
				style="width:100%"
				fetchAll
				multiple
				required
				mod="block"
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
				mod="block"
			/>

			<LookupField
				label="Country"
				value:bind="country.id"
				text:bind="country.name"
				optionIdField="iso2Code"
				optionTextField="name"
				onQuery="queryCountries"
				mod="block"
				fetchAll
				required
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
						from:bind="fromYear"
						to:bind="toYear"
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
