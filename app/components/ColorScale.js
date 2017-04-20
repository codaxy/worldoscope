import { Widget, PureContainer, VDOM } from "cx/ui";
import { parseColor, rgbToHsl, hslToRgb, Format } from "cx/util";

export class ColorScale extends Widget {
	declareData() {
		return super.declareData(...arguments, {
			best: undefined,
			worst: undefined,
			zero: undefined,
			className: { structured: true },
			class: { structured: true },
			style: { structured: true },
			format: undefined
		});
	}

	explore(context, instance) {
		if (!context.colorScales) context.colorScales = {};

		let { data } = instance;

		context.getColorScale = colorMap => {
			var map = context.colorScales[colorMap];
			if (!map)
				map = context.colorScales[colorMap] = new ColorScaleCalculator(
					data
				);
			return map;
		};

		instance.colorScale = context.getColorScale(this.name);

		super.explore(context, instance);
	}

	prepare(context, instance) {
		super.prepare(context, instance);

		instance.shouldUpdate = true;
	}

	render(context, instance, key) {
		let { data, colorScale } = instance;

		if (colorScale.dirty) colorScale.measure();

		let count = 15;
		let step = colorScale.size / count;

		let items = [],
			begin = Math.floor(colorScale.min / step),
			end = Math.round(colorScale.max / step);

		for (let i = begin; i <= end; i++) {
			let v = i * step;
			let c = colorScale.map(v);
			items.push(
				<div
					key={i}
					style={{
						background: c
					}}
				/>
			);
		}

		let { CSS, baseClass } = this;

		return (
			<div key={key} className={data.classNames} style={data.style}>
				<div className={CSS.element(baseClass, "scale")}>
					{items}
				</div>
				<div className={CSS.element(baseClass, "numbers")}>
					<div>
						{Format.value(colorScale.min, data.format)}
					</div>
					<div>
						{Format.value(colorScale.max, data.format)}
					</div>
				</div>
			</div>
		);
	}
}

ColorScale.prototype.name = "default";

export class ColorScaleScope extends PureContainer {
	explore(context, instance) {
		var previous = context.colorScales;
		instance.colorScales = context.colorScales = {};
		super.explore(context, instance);
		context.colorScales = previous;
	}

	prepare(context, instance) {
		var previous = context.colorScales;
		context.colorScales = instance.colorScales;
		super.prepare(context, instance);
		context.colorScales = previous;
	}
}

ColorScale.prototype.pure = false;
ColorScale.prototype.baseClass = "colorscale";
ColorScale.prototype.format = "n;1";

ColorScale.Scope = ColorScaleScope;
Widget.alias("color-scale", ColorScale);

class ColorScaleCalculator {
	constructor(data) {
		this.dirty = true;
		this.min = undefined;
		this.max = undefined;
		this.data = data;
	}

	acknowledge(value) {
		if (typeof value === "number") {
			if (typeof this.min === "undefined" || value < this.min) {
				this.min = value;
				this.dirty = true;
			}

			if (typeof this.max === "undefined" || value > this.max) {
				this.max = value;
				this.dirty = true;
			}
		}
	}

	getHSLA(color) {
		color = parseColor(color) || {
			type: "hsla",
			h: 0,
			s: 100,
			l: 50,
			a: 1
		};
		if (color.type === "rgba") {
			let [h, s, l] = rgbToHsl(color.r, color.g, color.b);
			color = { type: "hsla", h, s, l, a: color.a };
		}
		return color;
	}

	getRGBA(color) {
		color = parseColor(color) || {
			type: "hsla",
			h: 0,
			s: 100,
			l: 50,
			a: 1
		};
		if (color.type === "hsla") {
			let [r, g, b] = hslToRgb(color.h, color.s, color.l);
			color = { type: "rgba", r, g, b, a: color.a };
		}
		return color;
	}

	measure() {
		let { best, worst, zero } = this.data;

		this.best = this.getRGBA(best);
		this.worst = this.getRGBA(worst);
		this.zero = this.getRGBA(zero);
		this.dirty = false;
		this.size = this.min > 0
			? (this.max - this.min) / 2
			: Math.max(Math.abs(this.max), Math.abs(this.min));
		this.offset = this.min > 0 ? this.min : 0;
		this.middle = this.min > 0 ? (this.min + this.max) / 2 : 0;
		//console.log(this.size, this.max, this.min, this.zero, this.best);
	}

	map(value) {
		if (this.dirty) this.measure();

		if (typeof value !== "number") return null;

		let zero = this.zero,
			end = value >= this.middle ? this.best : this.worst,
			factor = Math.abs(value - this.middle) / this.size;

		// let h = zero.h + (end.h - zero.h) * factor,
		//     s = zero.s + (end.s - zero.s) * factor,
		//     l = zero.l + (end.l - zero.l) * factor,
		//     a = zero.a + (end.a - zero.a) * factor;
		//
		// return `hsla(${h.toFixed(2)}, ${s.toFixed(2)}%, ${l.toFixed(2)}%, ${a.toFixed(2)})`;

		let r = zero.r + (end.r - zero.r) * factor,
			g = zero.g + (end.g - zero.g) * factor,
			b = zero.b + (end.b - zero.b) * factor,
			a = zero.a + (end.a - zero.a) * factor;

		return `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${a.toFixed(0)})`;
	}
}
