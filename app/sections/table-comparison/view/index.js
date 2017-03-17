import {HtmlElement, Grid} from 'cx/widgets';
import {detectFormat} from 'app/util';

import Controller from './Controller';

export default config => {

    let columns = [{
        header: 'Country',
        field: 'country',
        sortable: true,
    }];

    if (Array.isArray(config.indicators))
        config.indicators.forEach(ind => {
            let format = detectFormat(ind.text);
            columns.push({
                field: `_${ind.id.replace(/\./g, '_')}`,
                header: `${ind.text}`,
                align: 'right',
                sortable: true,
                format: format
            });
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
                />
            </div>
            <p text={config.note} visible={!!config.note}/>
        </cx>
    )
}
