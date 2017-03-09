import {HtmlElement, FlexRow} from 'cx/widgets';
import {Svg, Rectangle} from 'cx/svg';
import {Map, ColorScale, ColorScaleScope} from 'app/components';
import {detectFormat} from 'app/util';

import Controller from './Controller';

export default config => {
    let format = config.indicator ? detectFormat(config.indicator.name) : null;
    return <cx>
        <ColorScaleScope>
            <Svg
                style="width:100%;height:50vh"
                controller={Controller}
            >
                <Rectangle fill="#1e395d">
                    <Map
                        records:bind="$sectionData.values"
                        valueField="value"
                        colorScale="default"
                        region={config.region && config.region.id}
                        tooltip={{
                            text: "Tooltip",
                            title: {bind: '$section.indicator.name'},
                            trackMouse: true
                        }}
                    />
                </Rectangle>
            </Svg>
            <FlexRow justify="center">
                <ColorScale
                    best="#00B237"
                    worst="#B20300"
                    zero="#FFFFFF"
                    style="flex: 1; max-width: 300px"
                    format={format}
                />
            </FlexRow>
        </ColorScaleScope>
    </cx>
}
