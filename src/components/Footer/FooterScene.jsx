import styles from "./Footer.module.css";

// * Night scene at the bottom of the footer: stars, two mountain ridges, a glowing
// horizon, a perspective grid, a road, and a car whose taillights pulse.
// Purely decorative, so the whole thing is hidden from assistive tech.

const STARS = [
  { cx: 90, cy: 40, r: 1.5, o: 0.7 },
  { cx: 210, cy: 78, r: 1, o: 0.5 },
  { cx: 340, cy: 30, r: 1.2, o: 0.6 },
  { cx: 470, cy: 62, r: 1, o: 0.5 },
  { cx: 610, cy: 24, r: 1.5, o: 0.7 },
  { cx: 760, cy: 52, r: 1, o: 0.5 },
  { cx: 880, cy: 20, r: 1.3, o: 0.6 },
  { cx: 1010, cy: 66, r: 1, o: 0.5 },
  { cx: 1130, cy: 34, r: 1.5, o: 0.7 },
  { cx: 1260, cy: 58, r: 1, o: 0.5 },
  { cx: 1380, cy: 28, r: 1.2, o: 0.6 },
];

// Grid lines fanning out from the vanishing point, then horizontal rungs
const GRID_RAYS = [-260, 60, 300, 1140, 1380, 1700];
const GRID_RUNGS = [222, 242, 272, 312];

// Lane dashes, growing as they come toward the viewer
const LANE_DASHES = [
  { x: 719, y: 218, w: 2, h: 4 },
  { x: 718.5, y: 230, w: 3, h: 7 },
  { x: 718, y: 248, w: 4, h: 11 },
  { x: 717, y: 274, w: 6, h: 17 },
  { x: 716, y: 308, w: 8, h: 26 },
];

function FooterScene() {
  return (
    <div className={styles.scene}>
      <div aria-hidden="true" className={styles.sceneHaze}></div>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice" className={styles.sceneSvg}>
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Stars */}
        <g fill="var(--text-primary)">
          {STARS.map((s) => (
            <circle key={s.cx} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
          ))}
        </g>

        {/* Far and near mountain ridges */}
        <path
          d="M0 210 L0 150 L80 122 L150 152 L230 96 L310 142 L400 112 L470 152 L560 82 L650 136 L730 116 L820 152 L900 102 L990 142 L1080 92 L1160 136 L1250 106 L1330 146 L1440 116 L1440 210 Z"
          fill="#0a3352"
        />
        <path
          d="M0 210 L0 178 L110 160 L200 184 L300 150 L420 186 L540 164 L640 190 L760 170 L870 192 L980 160 L1100 188 L1210 166 L1320 190 L1440 168 L1440 210 Z"
          fill="#061c2e"
        />

        {/* Ground */}
        <rect x="0" y="210" width="1440" height="130" fill="#040404" />

        {/* Perspective grid */}
        <g stroke="var(--primary)" strokeWidth="1" opacity="0.22">
          {GRID_RAYS.map((x) => (
            <path key={`ray-${x}`} d={`M720 210 L${x} 340`} />
          ))}
          {GRID_RUNGS.map((y) => (
            <path key={`rung-${y}`} d={`M0 ${y} H1440`} />
          ))}
        </g>

        {/* Road and its edges */}
        <path d="M712 210 L728 210 L980 340 L460 340 Z" fill="#0a0a0a" />
        <path d="M712 210 L460 340" stroke="var(--primary)" strokeWidth="1.5" opacity="0.6" />
        <path d="M728 210 L980 340" stroke="var(--primary)" strokeWidth="1.5" opacity="0.6" />

        {/* Lane dashes */}
        <g fill="var(--text-primary)" opacity="0.75">
          {LANE_DASHES.map((d) => (
            <rect key={d.y} x={d.x} y={d.y} width={d.w} height={d.h} />
          ))}
        </g>

        {/* Glowing horizon */}
        <path d="M0 210 H1440" stroke="var(--primary)" strokeWidth="6" opacity="0.5" filter="url(#softGlow)" />
        <path d="M0 210 H1440" stroke="var(--primary)" strokeWidth="2" />

        {/* Taillight reflection on the road */}
        <ellipse cx="774" cy="278" rx="38" ry="6" fill="var(--primary)" opacity="0.45" filter="url(#softGlow)" className={styles.taillightPulse} />

        {/* Car body */}
        <rect x="758" y="238" width="32" height="16" rx="6" fill="#000000" stroke="#1f1f1f" />
        <rect x="752" y="248" width="44" height="22" rx="5" fill="#000000" stroke="#1f1f1f" />

        {/* Taillight glow */}
        <g className={styles.taillightPulse}>
          <rect x="750" y="252" width="48" height="10" rx="5" fill="var(--primary)" opacity="0.8" filter="url(#softGlow)" />
        </g>

        {/* Taillights and the bar between them */}
        <rect x="754" y="255" width="11" height="5" rx="2" fill="var(--primary-light)" />
        <rect x="783" y="255" width="11" height="5" rx="2" fill="var(--primary-light)" />
        <rect x="765" y="256.5" width="18" height="2" fill="var(--primary)" />
      </svg>
    </div>
  );
}

export default FooterScene;
