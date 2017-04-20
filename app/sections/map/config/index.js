import {
	HtmlElement,
	TextField,
	TextArea,
	LookupField,
	Slider,
	NumberField,
	LabeledContainer,
	FlexRow,
	Switch
} from "cx/widgets";

import Controller from "./Controller";
import { pin } from "../../pin";

let colorSchemes = [
	{
		id: "default",
		text: "Default"
	},
	{
		id: "inverted",
		text: "Inverted"
	}
];

export default (
	<cx>
		<div controller={Controller}>
			<p ws>
				The countries are colored based on the indicator value. This is very useful
				for a quick overview of how a selected indicator is spread in different parts of the world.
			</p>

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

			<FlexRow wrap target="tablet" hspacing>

				<div style="flex:1; max-width: 300px">
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
				</div>

				<div style="flex:1; max-width: 300px">
					<LabeledContainer label="Year" mod="block">
						<FlexRow>
							<Slider
								value={{
									bind: "year",
									defaultValue: 2015
								}}
								minValue={1960}
								maxValue={2020}
								step={1}
								style="flex: 1; width: auto; max-width: 200px"
							/>

							<NumberField
								value:bind="year"
								style="width:60px"
								inputStyle="text-align:center"
								format="s"
								increment={1}
								minValue={1960}
								maxValue={2020}
								required
							/>
						</FlexRow>
					</LabeledContainer>
				</div>
				<div style="flex:1; max-width: 300px">
					<LookupField
						value:bind="colorScheme"
						mod="block"
						label="Color Scheme"
						style="width: 100%"
						options={colorSchemes}
						required
					/>
				</div>
			</FlexRow>

			<TextField
				value:bind="title"
				label="Title"
				style="width: 100%"
				required
				mod="block"
			/>

			<TextArea
				value:bind="note"
				label="Note"
				style="width: 100%"
				mod="block"
			/>

		</div>
	</cx>
);
