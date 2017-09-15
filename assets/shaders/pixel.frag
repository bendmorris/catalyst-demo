#version 120

varying vec2 vTexCoord;
uniform sampler2D uImage0;
uniform vec2 uResolution;

const int COLOR_VALUES = 8;
const int SCALE = 3;

vec3 posterize(vec3 c) {
	return round(c * COLOR_VALUES) / COLOR_VALUES;
}

void main () {
	vec4 color = texture2D(uImage0, vec2(
		round(vTexCoord.x * uResolution.x / SCALE) * SCALE / uResolution.x,
		round(vTexCoord.y * uResolution.y / SCALE) * SCALE / uResolution.y
	));
	gl_FragColor = vec4(posterize(color.rgb), 1.0);
}
