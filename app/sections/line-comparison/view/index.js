import {HtmlElement, Repeater} from 'cx/widgets';
import {Svg} from 'cx/svg';
import {Chart, Gridlines, LineGraph, NumericAxis, Legend} from 'cx/charts';
import {detectFormat} from 'app/util';

import Controller from './Controller';

export default config => {
  let format = config.indicator ? detectFormat(config.indicator.name) : null;

  return (
    <cx>
      <Legend.Scope>
        <Svg style="width:100%;height:40vh" controller={Controller}>
          <Chart
            margin="10 15 30 50"
            axes={{
              x: {
                type: NumericAxis,
                format: 's',
                snapToTicks: 0,
                min: config.fromYear,
                max: config.toYear,
              },
              y: {
                type: NumericAxis,
                vertical: true,
                format: format,
              },
            }}
          >
            <Gridlines />
            <Repeater records:bind="$sectionData.indicators" keyField="id">
              <LineGraph
                data:bind="$record.values"
                colorMap="indicators"
                yField="value"
                xField="year"
                active:bind="$record.active"
                name:bind="$record.name"
                lineStyle="stroke-width: 3px"
              />
            </Repeater>
          </Chart>
        </Svg>
        <Legend />
      </Legend.Scope>
      <p text={config.note} visible={!!config.note} />
    </cx>
  );
};
