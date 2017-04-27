import {
	HtmlElement,
	Rescope,
	Button,
	FlexRow,
	ValidationGroup,
	Heading,
	Icon,
	Sandbox,
	ContentResolver,
	DragSource,
	DragHandle,
	Menu,
	Submenu,
	IsolatedScope
} from "cx/widgets";

import {AnimatedHeight} from "app/components";
import sectionTypes from "../../sections";

export default (
	<cx>
		<Sandbox
			key:bind="$section.id"
			storage:bind="sections"
			recordAlias="$sectionData"
		>
			<DragSource
				id:bind="$section.id"
				class={{
					section: true,
					edit: {bind: "$sectionData.form"}
				}}
				data={{
					index: {bind: "$index"},
					type: "section"
				}}
				hideOnDrag
				handled
			>
				<AnimatedHeight loaded:expr="!{$sectionData.loading}">
					<IsolatedScope bind={["$section", "$sectionData"]}>
						<div visible:expr="!{$sectionData.form}">
							<FlexRow align="center" style="margin-bottom: 10px">
								<Heading level={3}>
									<a
										href:tpl="#{$section.id}"
										text:expr="{$sectionData.title} || {$section.title} || ''"
									/>
								</Heading>
								<DragHandle
									style="cursor:move;"
									visible:bind="editable"
								>
									<div tooltip="Drag &amp; drop to reorder sections">
										<Icon name="more_horiz"/>
									</div>
								</DragHandle>

								<Menu
									visible:bind="editable"
									horizontal
									class="ambient-color"
									style="margin-left: auto;display:flex;align-items:center"
								>
									<Button
										mod="hollow"
										class="ambient-color"
										icon="mode_edit"
										onClick={(e, {store}) => {
											let config = store.get("$section");
											store.set("$sectionData.form", config);
										}}
									/>
									<Submenu placement="down-left">
										<a><Icon name="more_vert"/></a>
										<Menu putInto="dropdown">
											<a href="#" onClick="duplicateSection">Duplicate</a>
											<a href="#" onClick="deleteSection">Delete</a>
										</Menu>
									</Submenu>
								</Menu>
							</FlexRow>
							<ContentResolver
								params:bind="$section"
								onResolve={section => {
									let sectionType = sectionTypes[section.type];
									return sectionType && sectionType.view(section);
								}}
							/>
						</div>

						<div visible:bind="$sectionData.form">
							<ValidationGroup valid:bind="$sectionData.formValid">
								<Rescope bind="$sectionData.form">
									<ContentResolver
										params:bind="$root.$section"
										onResolve={section => {
											let sectionType = sectionTypes[section.type];
											return sectionType && sectionType.config;
										}}
									/>
								</Rescope>
							</ValidationGroup>
							<br />
							<FlexRow hspacing>
								<Button
									mod="primary"
									icon="done"
									disabled:expr="!{$sectionData.formValid}"
									onClick={(e, {store}) => {
										let form = store.get("$sectionData.form");
										store.delete("$sectionData.form");
										store.delete("$sectionData.isNew");
										store.set("$section", form);
									}}
								>
									Save
								</Button>
								<Button
									mod="hollow"
									onClick={(e, {store}) => {
										store.delete("$sectionData.form");
										let isNew = store.get("$sectionData.isNew");
										store.delete("$sectionData.isNew");
										if (isNew) {
											let s = store.get("$section");
											store.update("report.sections", sections =>
												sections.filter(x => x != s)
											);
										}
									}}
								>
									Cancel
								</Button>

								<Button
									mod="hollow"
									icon="delete"
									style="margin-left: auto"
									confirm="Are you sure that you want to delete this section?"
									onClick={(e, {store}) => {
										let s = store.get("$section");
										store.update("report.sections", sections =>
											sections.filter(x => x != s)
										);
									}}
								/>
							</FlexRow>
						</div>
					</IsolatedScope>
				</AnimatedHeight>
			</DragSource>
		</Sandbox>
	</cx>
);
