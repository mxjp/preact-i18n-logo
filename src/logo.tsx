import { render, emit, Vec } from "veco";
import * as Color from "color";

const { rgb } = Color;

const accent = rgb(103, 58, 184);
const dark = rgb(25, 25, 25);
const tiles = accent.darken(0);

const dotsOffset = new Vec(1, 6);
const dotsFill = accent;
const dots2Fill = rgb(50, 50, 50);

function ngon(center: Vec, radius: number, n: number, fill: Color, angle = 0) {
	let d = "";
	for (let i = 0; i < n; i++) {
		d += (i === 0 ? "M" : "L") + new Vec(
			center.x + Math.sin(Math.PI * 2 * (angle + i / n)) * radius,
			center.y + Math.cos(Math.PI * 2 * (angle + i / n)) * radius
		).toString();
	}
	d += "Z";
	return <path d={d} fill={fill} />;
}

function logo(options: { cx?: number, cy?: number, scale: number }) {
	return <svg
		viewBox={`0 0 200 200`}
		x={options.cx === undefined ? "" : options.cx - 100 * options.scale}
		y={options.cy === undefined ? "" : options.cy - 100 * options.scale}
		width={200 * options.scale}
		height={200 * options.scale}
	>
		{ngon(new Vec(100, 100), 95, 6, accent)}
		{ngon(new Vec(100, 100), 90, 6, dark)}

		{([
			[new Vec(79, 85), 22],
			[new Vec(111, 67), 10],
			[new Vec(130, 71), 5],
			[new Vec(97, 122), 15],
			[new Vec(120, 95), 16],
		] as [Vec, number][]).map(([point, r]) => {
			return <circle cx={dotsOffset.x + point.x} cy={dotsOffset.y + point.y} r={r} fill={dotsFill} />;
		})}

		{([
			[new Vec(92, 53), 6],
			[new Vec(105, 48), 4],
			[new Vec(127, 56), 3],
			[new Vec(140, 81), 3],
			[new Vec(135, 115), 2],
			[new Vec(70, 118), 5],
			[new Vec(125, 123), 4],
			[new Vec(75, 131), 2],
			[new Vec(60, 108), 2],
			[new Vec(59, 117), 1],
			[new Vec(65, 128), 1],
		] as [Vec, number][]).map(([point, r]) => {
			return <circle cx={dotsOffset.x + point.x} cy={dotsOffset.y + point.y} r={r} fill={dots2Fill} />;
		})}
	</svg>;
}

function splash(options: { cx?: number, cy?: number, scale: number }) {
	const tileDistance = 87;
	function tile(u: number, v: number, fade: number) {
		return ngon(new Vec(
			500 + Math.sin(Math.PI / 6) * tileDistance * u + Math.sin(Math.PI / 6 * 5) * tileDistance * v,
			150 + Math.cos(Math.PI / 6) * tileDistance * u + Math.cos(Math.PI / 6 * 5) * tileDistance * v
		), 95 / 2, 6, tiles.alpha(1 - fade * .7));
	}
	return <svg
		viewBox={`0 0 1000 300`}
		x={options.cx === undefined ? "" : options.cx - 500 * options.scale}
		y={options.cy === undefined ? "" : options.cy - 150 * options.scale}
		width={1000 * options.scale}
		height={300 * options.scale}
	>
		{/* <rect x="0" y="0" width="1000" height="300" fill="white" /> */}

		{tile(-5, -4, 1)}
		{tile(-4, -4, .8)}
		{tile(-4, -3, .6)}
		{tile(-3, -2, .4)}
		{tile(-2, -3, .4)}
		{tile(-2, -2, .2)}
		{tile(-1, -1, 0)}
		{tile(-1, 0, 0)}
		{logo({ cx: 500, cy: 150, scale: 0.5 })}
		{tile(1, 0, 0)}
		{tile(1, 1, .2)}
		{tile(1, 2, .4)}
		{tile(2, 2, .4)}
		{tile(3, 3, .6)}
		{tile(3, 4, .8)}
		{tile(4, 3, .8)}
		{tile(5, 4, 1)}
	</svg>;
}

function wallpaper(width: number) {
	return <svg viewBox={`0 0 ${width} ${width / 16 * 9}`}>
		<svg viewBox="0 0 1600 900" width={width} height={width / 16 * 9}>
			<rect x="0" y="0" width="1600" height="900" fill={accent.darken(.75)} />
			{splash({ cx: 800, cy: 450, scale: 1 })}
		</svg>
	</svg>;
}

emit(logo({ scale: 1 }));
emit(splash({ scale: 1 }), "logo-splash");
emit(wallpaper(1920), "logo-wallpaper-1920");
emit(wallpaper(2560), "logo-wallpaper-2560");
emit(wallpaper(5120), "logo-wallpaper-5120");
