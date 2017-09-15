// catalyst noise fragment shader
#ifdef GL_ES
precision mediump float;
#endif

varying vec4 vColor;
varying vec2 vTexCoord;
uniform vec2 uResolution;
uniform int uIndex1;
uniform int uIndex2;
uniform float uOffset1;
uniform float uOffset2;
uniform float uTimer;
uniform sampler2D uImage0;
uniform sampler2D uImage1;
uniform sampler2D uImage2;

void main(void) {
	vec4 color = texture2D(uImage0, vTexCoord);
	vec4 noise1 = texture2D(uImage1, gl_FragCoord.xy / 128.0 - vTexCoord + uOffset1);
	vec4 noise2 = texture2D(uImage2, gl_FragCoord.xy / 128.0 - vTexCoord + uOffset2);
	if (color.a == 0.0) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
	} else {
		float noiseValue1 = uIndex1 == 0 ? noise1.r : (uIndex1 == 1 ? noise1.g : noise1.b);
		float noiseValue2 = uIndex2 == 0 ? noise2.r : (uIndex2 == 1 ? noise2.g : noise2.b);
		gl_FragColor = color * vec4((vColor.rgb + 0.25 - sqrt(noiseValue1 * (1.0 - uTimer) + noiseValue2 * uTimer) * 0.5), vColor.a);
	}
}
