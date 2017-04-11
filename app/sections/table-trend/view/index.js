import {HtmlElement, Grid} from 'cx/widgets';
import {detectFormat} from 'app/util';
import {Chart, LineGraph, NumericAxis} from 'cx/charts';
import {Svg} from 'cx/svg';

import Controller from './Controller';

export default config => {
  let format = config.indicator ? detectFormat(config.indicator.name) : null;

  let columns = [
    {
      header: 'Country',
      field: 'country',
      sortable: true,
    },
  ];

  let defaultSortField = null;

  for (let y = config.fromYear; y <= config.toYear; y++) {
    columns.push({
      field: `${y}`,
      header: `${y}`,
      align: 'right',
      sortable: true,
      format: format,
    });
    defaultSortField = `${y}`;
  }

  columns.push({
    header: 'Trend',
    style: 'line-height:0',
    align: 'center',
    items: (
      <cx>
        <Svg style="width:80px;height:24px">
          <Chart
            axes={{
              x: {type: NumericAxis, hidden: true, snapToTicks: 0},
              y: {
                type: NumericAxis,
                vertical: true,
                hidden: true,
                min: 0,
              },
            }}
          >
            <LineGraph data:bind="$record.trend" colorIndex={5} />
          </Chart>
        </Svg>
      </cx>
    ),
  });

  return (
    <cx>
      <div controller={Controller}>
        <Grid
          records:bind="$sectionData.data"
          idField="country"
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
