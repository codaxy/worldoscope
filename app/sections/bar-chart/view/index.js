import {HtmlElement, Repeater} from 'cx/widgets';
import {Svg} from 'cx/svg';
import {Chart, Gridlines, NumericAxis, CategoryAxis, Legend, ColorMap, BarGraph} from 'cx/charts';

import Controller from './Controller';
import { detectFormat } from 'app/util';

export default config => {
    let format = config.indicator ? detectFormat(config.indicator.name) : null;
    let top = config.top || 30;
    return (
        <cx>
            <Legend.Scope>
                <Svg
                    style={`width:100%; height:${50 +top * 20}px`}
                    controller={Controller}
                >
                    <Chart
                        margin="10 20 30 130"
                        axes={{
                            x: { type: NumericAxis, snapToTicks: 0, format: format },
                            y: { type: CategoryAxis, vertical: true, inverted: true, labelWrap: true, labelMaxLineLength: 20 }
                        }}
                    >
                        <Gridlines yAxis={false} />
                        <BarGraph
                            xField="value"
                            yField="country"
                            colorIndex={5}
                            data:bind="$sectionData.values"
                        />

                    </Chart>
                </Svg>
                <Legend />
            </Legend.Scope>
        </cx>
    )
}
