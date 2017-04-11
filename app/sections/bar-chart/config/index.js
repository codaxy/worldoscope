import {
  HtmlElement,
  TextField,
  TextArea,
  LookupField,
  Slider,
  NumberField,
  LabeledContainer,
  FlexRow,
  Radio,
  Switch,
} from 'cx/widgets';

import Controller from './Controller';
import {pin} from '../../pin';

export default (
  <cx>
    <div controller={Controller}>
      <p ws>
        Bar graph presents values of the selected indicator across multiple countries.
        This is useful to compare many countries at once.
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
        label="Indicator"
        value:bind="indicator.id"
        text:bind="indicator.name"
        optionTextField="name"
        onQuery="queryTopicIndicators"
        style="width:100%"
        fetchAll
        required
        mod="block"
      />

      <FlexRow wrap target="tablet">

        <div style="flex:1; max-width: 300px">
          <LookupField
            label={pin('Region')}
            disabled:bind="pins.region"
            value:bind="region.id"
            text:bind="region.name"
            optionTextField="name"
            onQuery="queryRegions"
            style="width: 100%"
            fetchAll
            mod="block"
          />
        </div>

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

        <div style="flex:1; max-width: 300px">
          <LabeledContainer label="Top" mod="block">
            <FlexRow>
              <Slider
                value={{
                  bind: 'top',
                  defaultValue: 15,
                }}
                minValue={5}
                maxValue={50}
                step={1}
                style="flex: 1; width: auto; max-width: 200px"
              />

              <NumberField
                value:bind="top"
                style="width:60px"
                inputStyle="text-align:center"
                format="s"
                increment={1}
                minValue={5}
                maxValue={50}
                required
              />
            </FlexRow>
          </LabeledContainer>
        </div>
      </FlexRow>

      <Switch label="Order" mod="block" value:bind="invert">
        Invert (show low values first)
      </Switch>

      <TextField value:bind="title" label="Title" mod="block" required />

      <TextArea
        value:bind="note"
        label="Note"
        style="width: 100%"
        mod="block"
      />
    </div>
  </cx>
);
