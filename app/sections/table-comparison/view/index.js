import { HtmlElement, Grid } from "cx/widgets";
import { detectFormat } from "app/util";

import Controller from "./Controller";

export default config => {
	let columns = [
		{
			header: "Country",
			field: "country",
			sortable: true
		}
	];

	let defaultSortField = null;

	if (Array.isArray(config.indicators))
		config.indicators.forEach(ind => {
			let format = detectFormat(ind.text);
			let field = `_${ind.id.replace(/\./g, "_")}`;
			columns.push({
				field: field,
				header: `${ind.text}`,
				align: "right",
				sortable: true,
				format: format
			});

			if (!defaultSortField) defaultSortField = field;
		});

	return (
		<cx>
			<div controller={Controller}>
				<Grid
					records:bind="$sectionData.data"
					keyField="country"
					cached
					columns={columns}
					scrollable
					mod="responsive"
					style="height: 50vh"
					defaultSortField={defaultSortField}
					defaultSortDirection="DESC"
				/>
			</div>
			<p text={config.note} visible={!!config.note} />
		</cx>
	);
};
