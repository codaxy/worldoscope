import {HtmlElement, Repeater} from 'cx/widgets';
import {Svg} from 'cx/svg';
import {Chart, Gridlines, NumericAxis, CategoryAxis, Legend, ColorMap, Column} from 'cx/charts';

import Controller from './Controller';
import {detectFormat} from 'app/util';

export default config => {
    let format = Array.isArray(config.indicators) && config.indicators.length > 0 ? detectFormat(config.indicators[0].text) : null;
    return (
        <cx>
            <Legend.Scope>
                <Legend />
                <Svg
                    style={`width:100%; height:600px`}
                    controller={Controller}
                >
                    <Chart
                        margin="10 15 150 50"
                        axes={{
                            x: {
                                type: CategoryAxis,
                                labelRotation: -45,
                                labelDy: '0.4em',
                                labelAnchor: "end",
                                labelWrap: true,
                                labelOffset: 20,
                                labelLineCountDyFactor: -0.5,
                                labelMaxLineLength: 30
                            },
                            y: {type: NumericAxis, vertical: true, format: format}
                        }}
                    >
                        <Gridlines xAxis={false}/>

                        <Repeater records:bind="$sectionData.indicators">
                            <Repeater records:bind="$record.values" recordAlias="$value">
                                <Column
                                    x:bind="$value.indicator.value"
                                    y:bind="$value.value"
                                    name:bind="$value.country.value"
                                    autoSize
                                    colorMap="countries"
                                    size={0.7}
                                    active:bind="$record.active"
                                />
                            </Repeater>
                        </Repeater>
                    </Chart>
                </Svg>
            </Legend.Scope>
            <p text={config.note} visible={!!config.note} />
        </cx>
    )
}
