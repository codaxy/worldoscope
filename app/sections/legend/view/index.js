import {HtmlElement, FlexRow} from 'cx/widgets';
import {Svg, Rectangle} from 'cx/svg';
import {Legend} from 'cx/charts';
import {Map} from 'app/components';

import Controller from './Controller';

export default config => {

    return <cx>
        <Legend.Scope>
            <Svg
                style="width:100%;height:50vh"
                controller={Controller}
            >
                <Rectangle fill="#1e395d">
                    <Map
                        records:bind="$section.countries"
                        valueField="value"
                        nameField="text"
                        colorMap="countries"
                        region={config.region && config.region.id}
                        tooltip={{
                            text:{ bind: "$country.name" },
                            trackMouse: true
                        }}
                    />
                </Rectangle>
            </Svg>
            <Legend />
        </Legend.Scope>
    </cx>
}
