import {VDOM} from 'cx/ui';
import {tooltipMouseMove, tooltipMouseLeave} from 'cx/widgets';
import {BoundedObject, Rect} from 'cx/svg';

import {countries} from 'api/geo/countries';
import {regions} from 'api/geo/regions';

export class Map extends BoundedObject {
  declareData() {
    super.declareData(...arguments, {
      records: undefined,
      region: undefined,
      tooltip: {structured: true},
    });
  }

  explore(context, instance) {
    let {data} = instance;
    if (
      Array.isArray(data.records) &&
      this.nameField &&
      this.colorMap &&
      context.getColorMap
    ) {
      let colorMap = context.getColorMap(this.colorMap);
      instance.colorMap = colorMap;
      data.records.forEach(c => {
        colorMap.acknowledge(c[this.nameField]);
      });
    }
    super.explore(context, instance);
  }

  prepare(context, instance) {
    let {data, colorMap} = instance;

    if (
      Array.isArray(data.records) &&
      this.valueField &&
      this.colorScale &&
      context.getColorScale
    ) {
      let colorScale = context.getColorScale(this.colorScale);
      instance.colorScale = colorScale;
      data.records.forEach(c => {
        colorScale.acknowledge(c[this.valueField]);
      });
    }

    if (
      Array.isArray(data.records) && this.nameField && context.addLegendEntry
    ) {
      data.records.forEach(c => {
        context.addLegendEntry(this.legend, {
          name: c[this.nameField],
          colorIndex: colorMap ? colorMap.map(c[this.nameField]) : null,
        });
      });
    }

    super.prepare(context, instance);
  }

  render(context, instance, key) {
    let {data, colorScale, colorMap} = instance;
    let {bounds} = data;

    let info = {};

    if (Array.isArray(data.records)) {
      data.records.forEach(d => {
        info[d[this.idField]] = d;
      });
    }

    let mb = Rect.convert('0 2000 1000 0');

    let region = regions.find(r => r.id == data.region);
    let countryList = countries;

    let activeIds = false;

    if (region) {
      activeIds = {};
      region.countries.forEach(a => activeIds[a] = true);
      //countryList = countryList.filter(c => ids[c.id]);
      mb = Rect.convert(region.bounds);
    }

    let scale = Math.min(
      bounds.width() / mb.width(),
      bounds.height() / mb.height(),
    );

    let dx = (bounds.l + bounds.r) / 2 / scale - (mb.l + mb.r) / 2,
      dy = (bounds.t + bounds.b) / 2 / scale - (mb.t + mb.b) / 2;

    let paths = countryList.map(c => {
      let d = info[c.id], style;
      let colorIndex = null;
      if (d) {
        if (this.colorField && d[this.colorField]) {
          style = {
            fill: d[this.colorField],
          };
        } else if (colorScale) {
          style = {
            fill: colorScale.map(d[this.valueField]),
          };
        } else if (colorMap) {
          colorIndex = colorMap.map(d[this.nameField]);
        }
      }
      let className = this.CSS.element(this.baseClass, 'country', {
        inactive: activeIds && !activeIds[c.id],
        [`color-${colorIndex}`]: colorIndex != null,
        [`unstyled`]: colorIndex == null,
      });
      return (
        <path
          key={c.id}
          data-id={c.id}
          d={c.d}
          style={style}
          className={className}
          onMouseMove={e => {
            tooltipMouseMove(e, instance, this.tooltip, {
              target: this.el,
              data: {
                $country: c,
                $record: d,
              },
            });
          }}
        />
      );
    });

    return (
      <g
        key={key}
        ref={el => {
          this.el = el;
        }}
        className={data.classNames}
        onMouseLeave={e => {
          tooltipMouseLeave(e, instance, this.tooltip, {target: this.el});
        }}
        style={{
          transform: `scale(${scale}) translate(${dx}px, ${dy}px) `,
        }}
      >
        {paths}
      </g>
    );
  }
}

Map.prototype.baseClass = 'map';
Map.prototype.anchors = '0 1 1 0';
Map.prototype.idField = 'id';
Map.prototype.colorField = false;
Map.prototype.colorScale = false;
Map.prototype.valueField = false;
Map.prototype.legend = 'legend';
