import React from 'react';
import { motion } from 'framer-motion';

// Color Palette based on the provided image
const P1_COLOR_BOTTOM = "#321D4F";
const P2_COLOR_MID_DARK = "#4A2771";
const P3_COLOR_BRIGHT = "#6F30A0";
const P4_COLOR_BRIGHTEST = "#8536CF";
const FADE_COLOR_RIGHT = "#2D2D3A";

// Initial visual order of colors on the left rhombuses (top to bottom)
// This order will be used for the gradient strips.
const INITIAL_COLOR_ORDER = [P3_COLOR_BRIGHT, P4_COLOR_BRIGHTEST, P2_COLOR_MID_DARK, P1_COLOR_BOTTOM];
const ANIMATION_INTERVAL_MS = 700; // Original interval per color step

// Rhombus dimensions and shape
const RHOMBUS_WIDTH = 50;
const RHOMBUS_HEIGHT = 60;
const RHOMBUS_POINTS_STRING = `${RHOMBUS_WIDTH / 2},0 ${RHOMBUS_WIDTH},${RHOMBUS_HEIGHT / 2} ${RHOMBUS_WIDTH / 2},${RHOMBUS_HEIGHT} 0,${RHOMBUS_HEIGHT / 2}`;

// Layout constants for rhombuses
const Y_AXIS_STEP = RHOMBUS_HEIGHT * 0.60; // Overlap: Each rhombus starts 60% of height below the previous
const X_AXIS_OFFSET_LEFT_COL = 5; // Left padding for the left column

const LEFT_COLUMN_RHOMBUS_CONFIG = [
  { id: 'l0', transform: `translate(${X_AXIS_OFFSET_LEFT_COL}, ${0 * Y_AXIS_STEP})` },
  { id: 'l1', transform: `translate(${X_AXIS_OFFSET_LEFT_COL}, ${1 * Y_AXIS_STEP})` },
  { id: 'l2', transform: `translate(${X_AXIS_OFFSET_LEFT_COL}, ${2 * Y_AXIS_STEP})` },
  { id: 'l3', transform: `translate(${X_AXIS_OFFSET_LEFT_COL}, ${3 * Y_AXIS_STEP})` },
];

const X_AXIS_OFFSET_RIGHT_COL = X_AXIS_OFFSET_LEFT_COL + RHOMBUS_WIDTH * 0.7; // Right column shifted horizontally
const Y_AXIS_OFFSET_RIGHT_COL = Y_AXIS_STEP / 2; // Right column vertically centered with left column gaps

const RIGHT_COLUMN_RHOMBUS_CONFIG = [
  { id: 'r0', transform: `translate(${X_AXIS_OFFSET_RIGHT_COL}, ${Y_AXIS_OFFSET_RIGHT_COL + 0 * Y_AXIS_STEP})` },
  { id: 'r1', transform: `translate(${X_AXIS_OFFSET_RIGHT_COL}, ${Y_AXIS_OFFSET_RIGHT_COL + 1 * Y_AXIS_STEP})` },
  { id: 'r2', transform: `translate(${X_AXIS_OFFSET_RIGHT_COL}, ${Y_AXIS_OFFSET_RIGHT_COL + 2 * Y_AXIS_STEP})` },
];

// SVG ViewBox dimensions, calculated based on rhombus layout
const SVG_VIEWBOX_WIDTH = X_AXIS_OFFSET_RIGHT_COL + RHOMBUS_WIDTH + 5; // Max X extent + padding
const SVG_VIEWBOX_HEIGHT = (3 * Y_AXIS_STEP) + RHOMBUS_HEIGHT + 5; // Max Y extent + padding

interface RhombusPolygonProps {
  transform: string;
  points: string;
  fill: string;
}

// Reusable Rhombus SVG polygon component
const RhombusPolygon: React.FC<RhombusPolygonProps> = ({ transform, points, fill }) => {
  return <polygon points={points} fill={fill} transform={transform} />;
};

const Animation: React.FC = () => {
  // Total duration for one full cycle of colors to pass (equivalent to SVG_VIEWBOX_HEIGHT)
  const totalAnimationDurationSeconds = (ANIMATION_INTERVAL_MS / 1000) * INITIAL_COLOR_ORDER.length;

  // Create a doubled color list for a seamless gradient loop.
  // The gradient will be twice the height of the viewbox and scroll one viewbox height.
  const gradientColors = [...INITIAL_COLOR_ORDER, ...INITIAL_COLOR_ORDER];

  return (
    <div className="p-3 bg-appBg rounded-lg shadow-2xl">
      <svg
        width={SVG_VIEWBOX_WIDTH}
        height={SVG_VIEWBOX_HEIGHT}
        viewBox={`0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`}
        aria-label="Animated geometric rhombus pattern"
      >
        <defs>
          <mask id="leftRhombusHolesMask">
            {/* Mask is white (opaque) by default. Black areas will be transparent in the masked element. */}
            <rect width="100%" height="100%" fill="white" />
            {/* Draw left rhombuses with black fill to punch "holes" in the mask */}
            {LEFT_COLUMN_RHOMBUS_CONFIG.map((config) => (
              <RhombusPolygon
                key={`mask-${config.id}`}
                transform={config.transform}
                points={RHOMBUS_POINTS_STRING}
                fill="black" 
              />
            ))}
          </mask>
        </defs>

        {/* Layer 1: Animated Gradient Background (using foreignObject for HTML motion.div) */}
        {/* This layer is at the very bottom, providing the moving colors. */}
        <foreignObject x="0" y="0" width={SVG_VIEWBOX_WIDTH} height={SVG_VIEWBOX_HEIGHT}>
          {/* xmlns is important for HTML content within SVG to be styled and behave correctly. */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <motion.div
              style={{
                width: '100%',
                height: `200%`, // Makes the gradient twice the height of the SVG view area
                backgroundImage: `linear-gradient(to bottom, ${gradientColors.join(', ')})`,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              animate={{ y: ['0%', '-100%'] }} // Animates upwards by one full SVG_VIEWBOX_HEIGHT
              transition={{
                duration: totalAnimationDurationSeconds,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </foreignObject>

        {/* Layer 2: Static Dark Background (#110E1B), masked to reveal gradient through left rhombuses */}
        {/* This sits on top of the gradient. The mask makes the left rhombus areas transparent, showing the gradient. */}
        <rect
          x="0"
          y="0"
          width={SVG_VIEWBOX_WIDTH}
          height={SVG_VIEWBOX_HEIGHT}
          fill="#110E1B" // The app's dark background color, from tailwind config bg-appBg
          mask="url(#leftRhombusHolesMask)"
        />

        {/* Layer 3: Right column of static, faded rhombuses */}
        {/* These are drawn on top of the masked dark background and the underlying gradient. */}
        <g>
          {RIGHT_COLUMN_RHOMBUS_CONFIG.map((config) => (
            <RhombusPolygon
              key={config.id}
              transform={config.transform}
              fill={FADE_COLOR_RIGHT}
              points={RHOMBUS_POINTS_STRING}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Animation;
