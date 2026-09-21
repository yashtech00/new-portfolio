"use client";

import React, { useEffect, useRef } from "react";

export type EffectMode = "dark" | "light";

export type HalftoneFlowProps = {
  mode?: EffectMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  opacity?: number;
  speed?: number;
  gridSize?: number;
  className?: string;
  style?: React.CSSProperties;
};

// Warm Editorial Palette Constants
// Cream base: #fcf9f3
// Ink / Dark flow: #0b1c2c
// Primary flow (Teal): #0e8f8b
// Secondary flow (Strong Teal): #006a67
const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_intensity;
  uniform float u_grid_size;
  uniform float u_opacity;
  uniform float u_hue;
  uniform float u_saturation;
  uniform float u_brightness;
  uniform int u_is_dark;

  mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
  }

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    vec2 flow_uv = p;
    float time = u_time * 0.65;

    // Generative domain-warping flow simulation
    for (float i = 1.0; i < 4.0; i++) {
      flow_uv *= rot(time * 0.12);
      flow_uv.x += sin(flow_uv.y * 1.8 * i + time) * 0.45;
      flow_uv.y += cos(flow_uv.x * 1.4 * i - time * 0.8) * 0.45;
    }

    float intensity = sin(flow_uv.x * 2.0 + flow_uv.y * 2.8) * 0.5 + 0.5;

    // Palette definitions
    vec3 col_cream       = vec3(0.988, 0.976, 0.953); // #fcf9f3
    vec3 col_ink         = vec3(0.043, 0.110, 0.173); // #0b1c2c
    vec3 col_teal        = vec3(0.055, 0.561, 0.545); // #0e8f8b
    vec3 col_strong_teal = vec3(0.000, 0.416, 0.404); // #006a67

    vec3 flow_color;
    vec3 base_color;

    if (u_is_dark == 1) {
      base_color = vec3(0.02, 0.02, 0.03);
      flow_color = mix(col_strong_teal, col_teal, smoothstep(0.2, 0.65, intensity));
      flow_color = mix(flow_color, vec3(0.6, 0.85, 0.8), smoothstep(0.7, 1.0, intensity) * 0.5);
    } else {
      base_color = col_cream;
      flow_color = mix(col_strong_teal, col_teal, smoothstep(0.2, 0.65, intensity));
      flow_color = mix(flow_color, col_ink, smoothstep(0.65, 0.95, intensity) * 0.65);
    }

    // Color controls
    if (u_hue != 0.0 || u_saturation != 1.0 || u_brightness != 1.0) {
      vec3 hsv = rgb2hsv(flow_color);
      hsv.x = fract(hsv.x + u_hue / 360.0);
      hsv.y = clamp(hsv.y * u_saturation, 0.0, 2.0);
      hsv.z = clamp(hsv.z * u_brightness, 0.0, 2.0);
      flow_color = hsv2rgb(hsv);
    }

    // Halftone dot matrix (editorial technical print texture)
    float grid = max(u_grid_size, 4.0);
    vec2 grid_uv = gl_FragCoord.xy / grid;
    vec2 cell_uv = fract(grid_uv) - 0.5;

    float dist = length(cell_uv);
    // Soft, delicate dot radii
    float radius = clamp(intensity * 0.38, 0.05, 0.42);
    float dot_mask = smoothstep(radius, radius - 0.12, dist);

    // Subtle visibility target (5% to 12% in light theme)
    float dot_alpha = dot_mask * (0.05 + 0.06 * intensity) * u_intensity * u_opacity;

    // Blend into cream paper base
    vec3 final_color = mix(base_color, flow_color, dot_alpha);

    // Very subtle teal highlight in peak flow regions
    if (u_is_dark == 0) {
      float highlight = smoothstep(0.85, 1.0, intensity) * 0.025 * u_intensity * u_opacity;
      final_color += col_teal * highlight;
    }

    gl_FragColor = vec4(final_color, 1.0);
  }
`;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HalftoneFlow({
  mode = "light",
  hue = 0,
  saturation = 1,
  brightness = 1,
  opacity = 1,
  speed = 1.2,
  gridSize,
  className = "",
  style,
}: HalftoneFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      // Fallback if WebGL is unavailable
      return;
    }

    // Compile helper
    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const intensityLoc = gl.getUniformLocation(program, "u_intensity");
    const gridLoc = gl.getUniformLocation(program, "u_grid_size");
    const opacityLoc = gl.getUniformLocation(program, "u_opacity");
    const hueLoc = gl.getUniformLocation(program, "u_hue");
    const satLoc = gl.getUniformLocation(program, "u_saturation");
    const brightLoc = gl.getUniformLocation(program, "u_brightness");
    const isDarkLoc = gl.getUniformLocation(program, "u_is_dark");

    const safeHue = clamp(hue, -180, 180);
    const safeSat = clamp(saturation, 0, 2);
    const safeBright = clamp(brightness, 0.35, 1.65);
    const safeOpacity = clamp(opacity, 0, 1);
    const isDark = mode === "dark" ? 1 : 0;

    gl.uniform1f(hueLoc, safeHue);
    gl.uniform1f(satLoc, safeSat);
    gl.uniform1f(brightLoc, safeBright);
    gl.uniform1f(opacityLoc, safeOpacity);
    gl.uniform1i(isDarkLoc, isDark);

    let animationFrameId: number;
    let isMounted = true;
    const startTime = performance.now();

    // Check motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;

    // Handle viewport resize with DPR clamping for high performance
    function handleResize() {
      if (!canvas || !gl) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      // Mobile check: scale down workload
      const isMobile = window.innerWidth < 768;
      const maxDpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
      const displayWidth = Math.round(width * maxDpr);
      const displayHeight = Math.round(height * maxDpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.uniform2f(resLoc, canvas.width, canvas.height);

      // Grid size adaptation: slightly larger grid on mobile to keep dots soft and reduce fragment cost
      const resolvedGridSize =
        gridSize ?? (isMobile ? 10.0 * maxDpr : 8.0 * maxDpr);
      gl.uniform1f(gridLoc, resolvedGridSize);

      // Mobile intensity reduction (keep it very subtle)
      const intensity = isMobile ? 0.75 : 1.0;
      gl.uniform1f(intensityLoc, intensity);
    }

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
      if (prefersReducedMotion) {
        renderFrame(12.0);
      }
    });
    resizeObserver.observe(canvas);

    function renderFrame(timeSeconds: number) {
      if (!gl || !isMounted) return;
      gl.uniform1f(timeLoc, timeSeconds * speed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function loop(now: number) {
      if (!isMounted) return;
      const elapsed = (now - startTime) * 0.001;
      renderFrame(elapsed);
      animationFrameId = requestAnimationFrame(loop);
    }

    // Motion preference listener
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        renderFrame(12.0);
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    try {
      motionQuery.addEventListener("change", onMotionChange);
    } catch {
      // Safari backwards compat
      motionQuery.addListener(onMotionChange);
    }

    if (prefersReducedMotion) {
      renderFrame(12.0);
    } else {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      try {
        motionQuery.removeEventListener("change", onMotionChange);
      } catch {
        motionQuery.removeListener(onMotionChange);
      }
      if (buffer) gl.deleteBuffer(buffer);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (program) gl.deleteProgram(program);
    };
  }, [mode, hue, saturation, brightness, opacity, speed, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default HalftoneFlow;
