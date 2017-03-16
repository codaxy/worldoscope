import {HtmlElement, Grid} from 'cx/widgets';
import {detectFormat} from 'app/util';


import Controller from './Controller';

export default config => {
    let format = config.indicator ? detectFormat(config.indicator.name) : null;

    let columns = [{
        header: 'Country',
        field: 'country',
        sortable: true,
    }];

    for (let y = config.fromYear; y <= config.toYear; y++)
        columns.push({
            field: `${y}`,
            header: `${y}`,
            align: 'right',
            sortable: true,
            format: format
        })


    return (
        <cx>
            <div controller={Controller}>
                <Grid
                    records:bind="$sectionData.data"
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
