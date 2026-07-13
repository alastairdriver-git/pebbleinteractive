import { Map, MapMarker } from "@gradeui/ui";

/* Self-contained map island (Grade Map, leaflet provider, no API key). Grade's
   Map imports leaflet.css itself, so it renders once `leaflet` is installed. */
export default function LocationMap({
  lng,
  lat,
  zoom = 15,
  label,
}: {
  lng: number;
  lat: number;
  zoom?: number;
  label?: string;
}) {
  return (
    <Map
      center={[lng, lat]}
      zoom={zoom}
      className="h-[440px] w-full overflow-hidden rounded-xl border border-border"
    >
      <MapMarker id="loc" at={[lng, lat]}>
        <div className="flex flex-col items-center">
          {label ? (
            <span className="whitespace-nowrap rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
              {label}
            </span>
          ) : null}
          <span className="-mt-0.5 h-2.5 w-2.5 rotate-45 bg-primary"></span>
        </div>
      </MapMarker>
    </Map>
  );
}
