import styles from "./Hero.module.css";

// * The dark theme's scene: open space around a black hole. Everything lives in one
// 2600 x 500 box centered on the black hole (1300, 250), the same size as the art.
// Layers, back to front: stars, galaxies, nebula dust and a few planets (still, and
// wider than the box so big screens fill to the edges), the dotted orbits (their dashes
// flow), the black hole (slowly grows and shrinks while its core glows), and the
// planets, which travel along their orbits.

const CX = 1300;
const CY = 250;
// The orbits are ellipses flattened to this ratio and tilted 6 degrees, like the disk
const SQUASH = 0.324;
const TILT = -6;
const t = (TILT * Math.PI) / 180;

// Radius along the long axis, seconds per lap for the planets, seconds per dash loop
const ORBITS = [
  { a: 470, lap: 110, flow: 9 },
  { a: 565, lap: 160, flow: 12 },
  { a: 660, lap: 220, flow: 15 },
];

// Where on its orbit each planet starts (degrees, 0 is the right end, 90 the front),
// and the size of its sprite. r is the planet's radius, for the dark disk behind it.
const PLANETS = [
  { n: 1, orbit: 0, deg: 160, r: 13, w: 36, h: 36 },
  { n: 2, orbit: 0, deg: -30, r: 9, w: 28, h: 28 },
  { n: 3, orbit: 0, deg: 96, r: 7, w: 24, h: 24 },
  { n: 4, orbit: 1, deg: 20, r: 24, w: 128, h: 58 },
  { n: 5, orbit: 1, deg: 200, r: 28, w: 148, h: 66 },
  { n: 6, orbit: 2, deg: 172, r: 17, w: 44, h: 44 },
  { n: 7, orbit: 2, deg: -8, r: 21, w: 88, h: 68 },
  { n: 8, orbit: 2, deg: 72, r: 8, w: 26, h: 26 },
];

// A point on an orbit, from its angle
function onOrbit(a, deg) {
  const p = (deg * Math.PI) / 180;
  const u = a * Math.cos(p);
  const v = a * Math.sin(p) * SQUASH;
  return [CX + u * Math.cos(t) - v * Math.sin(t), CY + u * Math.sin(t) + v * Math.cos(t)];
}

// The orbit as a closed path, starting at the right end and going clockwise (front to the left)
function orbitPath(a) {
  const [x0, y0] = onOrbit(a, 0).map((n) => n.toFixed(2));
  const [x1, y1] = onOrbit(a, 180).map((n) => n.toFixed(2));
  const b = (a * SQUASH).toFixed(2);
  return `M ${x0} ${y0} A ${a} ${b} ${TILT} 1 1 ${x1} ${y1} A ${a} ${b} ${TILT} 1 1 ${x0} ${y0} Z`;
}

function HeroSpace() {
  return (
    <div className={styles.space}>
      <div className={styles.field}></div>

      {/* Only the black hole and its orbit system drift up and down; the field stays still */}
      <div className={styles.system}>
        <svg className={styles.orbits} viewBox="0 0 2600 500" width="2600" height="500" focusable="false">
          {ORBITS.map((orbit) => (
            <path
              key={orbit.a}
              d={orbitPath(orbit.a)}
              className={styles.orbit}
              style={{ animationDuration: `${orbit.flow}s` }}
            />
          ))}
        </svg>

        <div className={styles.core}>
          <div className={styles.coreArt}></div>
          <div className={styles.coreGlow}></div>
        </div>

        {PLANETS.map((planet) => {
          const orbit = ORBITS[planet.orbit];
          const start = (((planet.deg % 360) + 360) % 360) / 360;
          return (
            <div
              key={planet.n}
              className={styles.planet}
              style={{
                width: planet.w,
                height: planet.h,
                offsetPath: `path("${orbitPath(orbit.a)}")`,
                "--start": `${(start * 100).toFixed(2)}%`,
                "--lap": `${orbit.lap}s`,
                "--back": `${planet.r * 2 + 3}px`,
                "--art": `url("/dither/hero-planet-${planet.n}.png")`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroSpace;
