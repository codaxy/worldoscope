import {
  HtmlElement,
  TextField,
  TextArea,
  LookupField,
  Slider,
  NumberField,
  LabeledContainer,
  FlexRow,
} from 'cx/widgets';

import Controller from './Controller';

import {pin} from '../../pin';

export default (
  <cx>
    <div controller={Controller}>
      <p ws>
        Column graph presents multiple related indicators for a handful of selected countries.
        This is useful to compare countries on multiple things at once.
      </p>

      <LookupField
        label="Topic"
        value:bind="topic.id"
        text:bind="topic.text"
        optionTextField="value"
        onQuery="queryTopics"
        style="width:100%"
        fetchAll
        cacheAll
        required
        mod="block"
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
        label={pin('Countries')}
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

      <FlexRow wrap target="tablet">
        <div style="flex:1; max-width: 300px">
          <LabeledContainer label="Year" mod="block">
            <FlexRow>
              <Slider
                value={{
                  bind: 'year',
                  defaultValue: 2015,
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
