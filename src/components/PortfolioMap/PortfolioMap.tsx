import { useEffect, useRef, useState } from "react";
import { commissionBoundaries, MapPoint, referenceProjects } from "../../mockData/geography";
import { DemoProject } from "../../mockData/showcase";
import { ProjectType } from "../../types/Project";
import "./PortfolioMap.css";

export interface PortfolioMapMarker {
  id: string;
  point: MapPoint;
  label: string;
  color: string;
}

interface Props {
  projects: DemoProject[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  geometry?: MapPoint[];
  onGeometryChange?: (points: MapPoint[]) => void;
  markers?: PortfolioMapMarker[];
  selectedMarkerId?: string;
  onMarkerSelect?: (id: string) => void;
  highlightedIds?: string[];
  ariaLabel?: string;
  fitToFeatures?: boolean;
  showProjectPopup?: boolean;
}

// Local equirectangular projection centered on the urban part of Miami-Dade.
const project = ([lon, lat]: number[]) => [(lon + 80.26) * 9000, (25.78 - lat) * 10000];
const unproject = (x: number, y: number): MapPoint => [+(x / 9000 - 80.26).toFixed(5), +(25.78 - y / 10000).toFixed(5)];
const path = (points: number[][]) => points.map((p, index) => (index ? "L" : "M") + project(p).map(v => v.toFixed(1)).join(",")).join("");
const districtPaths = commissionBoundaries.map(d => d.polygons.map(rings => rings.map(r => path(r) + "Z").join("")).join(""));
const referenceLines = referenceProjects.filter(p => p.points.length > 1).map(p => path(p.points)).join("");
const referencePoints = referenceProjects.filter(p => p.points.length === 1).map(p => project(p.points[0]));
const typeColors: Record<ProjectType,string> = {
  Transit:"#347ead", Bike:"#298257", Pedestrian:"#8a9e30", Roadway:"#344990", Freight:"#ba3970",
};
const places: [string, number, number][] = [
  ["Miami", -80.194,25.766], ["Hialeah", -80.286,25.85], ["Coral Gables",-80.257,25.73],
  ["Kendall",-80.351,25.677], ["Doral",-80.356,25.823], ["Miami Beach",-80.13,25.801],
  ["North Miami",-80.174,25.89], ["Miami Gardens",-80.248,25.943], ["Palmetto Bay",-80.318,25.613],
  ["Homestead",-80.474,25.468], ["Cutler Bay",-80.34,25.572], ["Aventura",-80.139,25.952],
];
const districtLabels: [number, number, number][] = [
  [1,-80.23,25.928],[2,-80.22,25.867],[3,-80.213,25.805],[4,-80.154,25.925],
  [5,-80.204,25.756],[6,-80.29,25.769],[7,-80.294,25.686],[8,-80.38,25.587],
  [9,-80.445,25.525],[10,-80.364,25.724],[11,-80.434,25.68],[12,-80.401,25.841],[13,-80.31,25.916],
];
// Major corridors give geographic context when viewing the CTMP reference layer offline.
const mainRoads = [
  [[-80.188,25.97],[-80.163,25.921],[-80.194,25.915],[-80.202,25.872],[-80.204,25.818],[-80.201,25.79],[-80.199,25.751],[-80.216,25.743],[-80.229,25.731],[-80.258,25.71],[-80.278,25.696],[-80.311,25.683],[-80.34,25.611],[-80.397,25.541],[-80.471,25.47]],
  [[-80.203,25.787],[-80.225,25.793],[-80.247,25.794],[-80.262,25.784],[-80.31,25.781],[-80.356,25.782],[-80.408,25.78]],
  [[-80.336,25.884],[-80.323,25.847],[-80.322,25.79],[-80.322,25.752],[-80.326,25.706],[-80.328,25.663]],
  [[-80.452,25.764],[-80.376,25.767],[-80.308,25.769],[-80.255,25.772],[-80.193,25.775]],
  [[-80.425,25.684],[-80.366,25.686],[-80.311,25.688]], [[-80.194,25.788],[-80.18,25.785],[-80.154,25.783],[-80.137,25.786]],
].map(path).join("");

// Continue the mainland into Broward beyond the county's northern jurisdiction line.
const neighboringLand = path([[-82, 28], [-80.09, 28], [-80.115, 26.15], [-80.119, 25.974],
  [-80.146, 25.974], [-80.1665, 25.9736], [-80.2952, 25.9703], [-80.295, 25.9567],
  [-80.6801, 25.9567], [-80.6801, 25.9787], [-82, 25.98]]) + "Z";

const defaultFrame = { x: 140, y: -45, span: 3510 };
function frameFor(points: MapPoint[], size: {width: number; height: number}) {
  if (!points.length) return defaultFrame;
  let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
  for (const point of points) {
    const [x, y] = project(point);
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }
  const shortest = Math.min(size.width, size.height);
  const span = Math.max((right-left) * shortest / size.width, (bottom-top) * shortest / size.height);
  return { x:(right+left)/2, y:(bottom+top)/2, span:Math.max(850, span * 1.28) };
}
const noPoints: MapPoint[] = [];
const noMarkers: PortfolioMapMarker[] = [];
const clampZoom = (span: number) => Math.max(250, Math.min(9000, span));

export default function PortfolioMap({
  projects, selectedId, onSelect, geometry = noPoints, onGeometryChange,
  markers = noMarkers, selectedMarkerId, onMarkerSelect, highlightedIds = [],
  ariaLabel, fitToFeatures = false, showProjectPopup = true,
}: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({width:420,height:500});
  const [frame,setFrame] = useState(() => frameFor(geometry, size));
  const [localId,setLocalId] = useState("");
  const [layers,setLayers] = useState(false);
  const [districts,setDistricts] = useState(true);
  const [references,setReferences] = useState(true);
  const [hidePopup,setHidePopup] = useState(false);
  const gesture = useRef<{x:number;y:number; moved:boolean; center:typeof defaultFrame}>();
  const suppressClick = useRef(false);
  const selected = projects.find(p => p.id === (selectedId ?? localId));
  const selectedMarker = markers.find(marker => marker.id === selectedMarkerId);
  const orderedMarkers = selectedMarker ? [...markers.filter(marker => marker !== selectedMarker), selectedMarker] : markers;
  const editing = !!onGeometryChange;
  const portfolioFrame = fitToFeatures
    ? frameFor([...projects.flatMap(p => p.geometry), ...markers.map(marker => marker.point)], size)
    : defaultFrame;
  const readOnlyFootprint = !editing && geometry.length > 0;
  const focusedPoints = selectedMarker ? [selectedMarker.point] : selected?.geometry.length ? selected.geometry : geometry;
  const focusedFrame = !editing && focusedPoints.length ? frameFor(focusedPoints, size) : portfolioFrame;
  const focusId = selectedMarker?.id ?? selected?.id;
  const {x: focusX, y: focusY, span: focusSpan} = focusedFrame;
  const unit = frame.span / Math.min(size.width, size.height);
  const width = unit * size.width, height = unit * size.height;

  useEffect(() => {
    const node = svg.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width && rect.height) setSize({width:rect.width,height:rect.height});
    };
    measure();
    function wheel(event: WheelEvent) {
      if (!node || !event.deltaY) return;
      const rect = node.getBoundingClientRect();
      const shortest = Math.min(rect.width, rect.height);
      if (!shortest) return;
      event.preventDefault();
      // Keep the geographic position under the pointer still as the scale changes.
      const dx = (event.clientX - rect.left - rect.width / 2) / shortest;
      const dy = (event.clientY - rect.top - rect.height / 2) / shortest;
      const pixelsPerUnit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.height : 1;
      const delta = Math.max(-360, Math.min(360, event.deltaY * pixelsPerUnit));
      setFrame(previous => {
        const span = clampZoom(previous.span * Math.exp(delta * 0.0024));
        return {span, x: previous.x + dx * (previous.span - span), y: previous.y + dy * (previous.span - span)};
      });
    }
    node.addEventListener("wheel", wheel, {passive: false});
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
    observer?.observe(node);
    return () => {
      observer?.disconnect();
      node.removeEventListener("wheel", wheel);
    };
  }, []);
  useEffect(() => {
    setHidePopup(false);
    if (!editing && (focusId || fitToFeatures || readOnlyFootprint)) setFrame({x:focusX, y:focusY, span:focusSpan});
  }, [focusId, focusX, focusY, focusSpan, fitToFeatures, readOnlyFootprint, editing]);

  const zoom = (factor: number) => setFrame(old => ({...old,span:clampZoom(old.span*factor)}));
  const select = (id:string) => {
    if (editing) return;
    setHidePopup(false);
    setLocalId(id);
    onSelect?.(id);
  };
  const closePopup = () => {
    setHidePopup(true);
    setLocalId("");
    onSelect?.("");
  };
  const reset = () => {
    setFrame(geometry.length ? frameFor(geometry, size) : portfolioFrame);
    closePopup();
    if (selectedMarkerId) onMarkerSelect?.("");
  };
  const drawPoint = (x: number, y: number) => {
    if (!onGeometryChange) return;
    const point = unproject(x,y);
    if (!geometry.length || geometry[geometry.length-1].join() !== point.join()) onGeometryChange([...geometry,point]);
  };

  return <div className={"portfolio-map" + (editing ? " portfolio-map-edit" : "")}>
    <svg ref={svg} className="portfolio-map-surface" role="group" aria-label={ariaLabel ?? (editing ? "Draw project footprint" : "Map of Miami-Dade projects")}
      tabIndex={0} viewBox={[frame.x-width/2,frame.y-height/2,width,height].join(" ")}
      onPointerDown={event => {
        if (event.button !== 0) return;
        gesture.current = {x:event.clientX,y:event.clientY,moved:false,center:frame};
        suppressClick.current = false;
      }}
      onPointerMove={event => {
        const start = gesture.current;
        if (!start) return;
        const dx = event.clientX-start.x, dy = event.clientY-start.y;
        if (!start.moved && Math.hypot(dx,dy) < 4) return;
        start.moved = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFrame({...start.center,x:start.center.x-dx*unit,y:start.center.y-dy*unit});
      }}
      onPointerUp={event => {
        const start = gesture.current;
        gesture.current = undefined;
        suppressClick.current = !!start?.moved;
        if (!start || start.moved || !editing) return;
        const rect = event.currentTarget.getBoundingClientRect();
        drawPoint(frame.x+(event.clientX-rect.left-rect.width/2)*unit, frame.y+(event.clientY-rect.top-rect.height/2)*unit);
      }}
      onPointerCancel={() => {gesture.current=undefined;}} onPointerLeave={event => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) gesture.current = undefined;
      }}
      onKeyDown={e => {
        if (e.target !== e.currentTarget) return;
        if (e.key.startsWith("Arrow")) {
          e.preventDefault();
          const step=frame.span/10;
          setFrame({...frame,x:frame.x+(e.key==="ArrowLeft"?-step:e.key==="ArrowRight"?step:0),y:frame.y+(e.key==="ArrowUp"?-step:e.key==="ArrowDown"?step:0)});
        } else if (e.key === "+" || e.key === "=") zoom(0.7);
        else if (e.key === "-") zoom(1.4);
        else if (e.key === "Enter" && editing) { e.preventDefault(); drawPoint(frame.x,frame.y); }
      }}>
      <path d={neighboringLand} fill="#ecede7" />
      <g className={"portfolio-land" + (districts ? " with-districts" : "")}>{districtPaths.map((d,i) =>
        <path key={i} d={d} fillRule="evenodd" style={{fill:districts ? ["#f2f0e6","#e9eee4","#f2eee3","#eaece4"][i%4] : "#f0efe7"}} />)}</g>
      <path d={mainRoads} className="portfolio-highway-casing" /><path d={mainRoads} className="portfolio-highway" />
      {references && <g className="portfolio-reference">
        <path d={referenceLines} />{referencePoints.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={1.5*unit}/>)}
      </g>}
      {districts && <g className="portfolio-district-labels">{districtLabels.map(([n,lon,lat]) => {
        const [x,y]=project([lon,lat]);
        return <g key={n} transform={`translate(${x} ${y}) scale(${unit})`}><circle r="9"/><text y="3.2">{n}</text></g>;
      })}</g>}
      <g className="portfolio-place-labels">{places.map(([label,lon,lat])=>{
        const [x,y]=project([lon,lat]);
        return <text key={label} x={x} y={y} style={{fontSize:(label==="Miami"?16:11)*unit,strokeWidth:3*unit}}>{label}</text>;
      })}</g>
      <text className="portfolio-water-label" x={project([-80.182,25.698])[0]} y={project([-80.182,25.698])[1]} style={{fontSize:13*unit}}>Biscayne Bay</text>
      {projects.map(item=>{
        const points=item.geometry;
        if (!points.length) return null;
        const active = selected?.id === item.id && !editing;
        const included = highlightedIds.includes(item.id);
        const color = active ? "#bf451b" : included ? "#087738" : typeColors[item.type];
        const [x,y] = project(points[Math.floor((points.length-1)/2)]);
        const d = path(points);
        return <g key={item.id} className="portfolio-feature" role={editing ? undefined : "button"}
          tabIndex={editing ? undefined:0} aria-label={editing ? undefined : "Show " + item.name}
          onClick={() => { if (!suppressClick.current) select(item.id); }} onKeyDown={e=>{if(!editing && (e.key==="Enter" || e.key===" ")){e.preventDefault(); select(item.id);}}}>
          <title>{item.name}</title>
          <path d={d} stroke="white" strokeWidth={active || included ? 8 : 5}/><path d={d} stroke={color} strokeWidth={active || included ? 5 : 2.7}/>
          <path d={d} stroke="transparent" strokeWidth="16"/>
          <circle cx={x} cy={y} r={(active || included ? 7 : 5)*unit} fill={color} stroke="white" strokeWidth="1.8"/>
          <circle cx={x} cy={y} r={11*unit} fill="transparent" />
        </g>;
      })}
      {geometry.length > 0 && <g className="portfolio-footprint"><path d={path(geometry)} stroke="white" strokeWidth="9"/>
        <path d={path(geometry)} stroke="#b74720" strokeWidth="5"/>
        {(editing || geometry.length === 1) && geometry.map((p,i)=>{const [x,y]=project(p);return <circle key={i} cx={x} cy={y} r={4.7*unit} fill="white" stroke="#b74720" strokeWidth="2.6"/>;})}
      </g>}
      {orderedMarkers.map(marker => {
        const [x, y] = project(marker.point);
        const active = marker.id === selectedMarkerId;
        return <g key={marker.id} transform={`translate(${x} ${y}) scale(${unit})`}
          className="portfolio-pin" role="button" tabIndex={0} aria-label={marker.label} aria-pressed={active}
          onClick={() => { if (!suppressClick.current) onMarkerSelect?.(marker.id); }}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onMarkerSelect?.(marker.id); }
          }}>
          <title>{marker.label}</title>
          <circle cy="-9" r="17" fill="transparent" />
          {active && <circle r="8" fill="white" stroke={marker.color} strokeWidth="2" />}
          <path d="M0 0C-3 -5 -11 -12 -11 -18a11 11 0 0 1 22 0c0 6 -8 13 -11 18Z"
            fill={marker.color} stroke={active ? "#25303c" : "white"} strokeWidth={active ? 2.5 : 1.6} />
          <circle cy="-18" r={active ? 4.5 : 3.5} fill="white" />
        </g>;
      })}
    </svg>
    <div className="portfolio-map-nav">
      <button type="button" title="Zoom in" aria-label="Zoom in" onClick={()=>zoom(0.7)}>+</button>
      <button type="button" title="Zoom out" aria-label="Zoom out" onClick={()=>zoom(1.4)}>−</button>
      <button type="button" title="Reset map extent" aria-label="Reset map extent" onClick={reset}>⌂</button>
    </div>
    <div className="portfolio-map-layers">
      <button type="button" aria-expanded={layers} onClick={()=>setLayers(!layers)}>Layers</button>
      {layers && <div><label><input type="checkbox" checked={districts} onChange={e=>setDistricts(e.target.checked)}/>Commission districts</label>
        <label><input type="checkbox" checked={references} onChange={e=>setReferences(e.target.checked)}/>Existing CTMP projects</label>
        <div className="portfolio-type-key">{Object.entries(typeColors).map(([type,color]) =>
          <span key={type}><i style={{background:color}}/>{type}</span>)}</div></div>}
    </div>
    {editing && <>
      <span className="portfolio-map-reticle" aria-hidden="true">+</span>
      <div className="portfolio-drawing-controls"><strong>Project footprint</strong>
        <span>{geometry.length ? `${geometry.length} ${geometry.length===1?"vertex":"vertices"}` : "Click to place a point. Add points for a corridor."}</span>
        {geometry.length>0 && <button type="button" onClick={()=>onGeometryChange!(geometry.slice(0,-1))}>Undo</button>}
        {geometry.length>1 && <button type="button" onClick={()=>onGeometryChange!([])}>Clear</button>}
      </div></>}
    {showProjectPopup && !editing && selected && !hidePopup && <aside className="portfolio-map-popup" aria-label="Selected project">
      <button type="button" className="portfolio-popup-close" aria-label="Close map details" onClick={closePopup}>×</button>
      <small>{selected.type} · {selected.reviewStatus}</small><h3>{selected.name}</h3>
      <p className="portfolio-delivery"><strong>Delivery</strong> {selected.deliveryStatus}</p>
      <dl><div><dt>Composite</dt><dd>{selected.composite}</dd></div><div><dt>Location</dt><dd>{selected.location}</dd></div><div><dt>Benefit</dt><dd>{selected.benefit}</dd></div></dl>
      <strong>Goal alignment</strong><div className="portfolio-map-goals">{Object.entries(selected.goals).map(([goal,value]) =>
        <span key={goal} className={value?"aligned":""} title={value ? `${goal}: contributes, ${value}/100` : `${goal}: no contribution`}>{value?"✓ ":"– "}{goal}</span>)}</div>
      <strong>Potential funding</strong><p>{selected.funding.join(" · ")}</p>
    </aside>}
    <div className="portfolio-attribution">Miami-Dade County · CTMP &amp; commission districts</div>
  </div>;
}
