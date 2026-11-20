import boundaries from "./commissionBoundaries.json";
import reference from "./ctmpReference.json";

export type MapPoint = [number, number];

// Simplified WGS84 geometry from the workspace Commission_Districts and CTMP layers.
export const commissionBoundaries = boundaries;
export const referenceProjects = reference;
export const locationFactors = [
  "Connects to Existing", "Count Metrobus Routes", "Near Transit Station",
  "Service Area", "Equity Area", "Resiliency", "Land Use",
  "Population Density", "Employment Density", "Travel Time", "Safety",
];

function contains(ring: number[][], [x, y]: MapPoint) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[i];
    const [bx, by] = ring[j];
    if ((ay > y) !== (by > y) && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) {
      inside = !inside;
    }
  }
  return inside;
}

// Sample along the corridor as well as at its endpoints so intermediate districts count.
function corridorSamples(points: MapPoint[]): MapPoint[] {
  const samples = points.slice(0, 1);
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i - 1];
    const dx = points[i][0] - x;
    const dy = points[i][1] - y;
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 0.002));
    for (let j = 1; j <= steps; j++) samples.push([x + dx * j / steps, y + dy * j / steps]);
  }
  return samples;
}

export function getDistricts(points: MapPoint[]) {
  const samples = corridorSamples(points);
  return commissionBoundaries.filter(({ polygons }) => samples.some(point =>
    polygons.some(([outer, ...holes]) => contains(outer, point) && !holes.some(hole => contains(hole, point)))
  )).map(d => d.id).sort((a, b) => Number(a) - Number(b));
}

// Approximate distance to each reference segment in local longitude/latitude space.
function distanceToPath([x, y]: MapPoint, path: number[][]) {
  let distance = Infinity;
  for (let i = 0; i < path.length; i++) {
    const [ax, ay] = path[Math.max(0, i - 1)];
    const dx = (path[i][0] - ax) * 0.9;
    const dy = path[i][1] - ay;
    const px = (x - ax) * 0.9;
    const py = y - ay;
    const t = Math.min(1, Math.max(0, (px * dx + py * dy) / (dx * dx + dy * dy || 1)));
    distance = Math.min(distance, (px - dx * t) ** 2 + (py - dy * t) ** 2);
  }
  return distance;
}

export function locationScores(points: MapPoint[]): Record<string, number> {
  const totals = locationFactors.map(() => 0);
  for (const point of points) {
    const nearest = referenceProjects.map(feature => ({
      distance: distanceToPath(point, feature.points), scores: feature.scores,
    })).sort((a, b) => a.distance - b.distance).slice(0, 3);
    nearest.forEach(({ scores }) => scores.forEach((score, i) => { totals[i] += score / nearest.length; }));
  }
  return Object.fromEntries(locationFactors.map((key, i) => [key, Math.round(totals[i] / (points.length || 1))]));
}
