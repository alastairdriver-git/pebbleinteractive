import { Composition } from "remotion";
import { PebbleVideo } from "./PebbleVideo";
import { FPS, sceneFrames, type VideoProps } from "./types";
import demo from "./demo-props.json";

const total = (p: VideoProps) => p.voice.reduce((n, v) => n + sceneFrames(v), 0);

/* One script, two shapes: a 9:16 short and a 16:9 explainer. Layouts adapt
   to the aspect ratio. Real props come from tools/render.mjs (--props). */
export const Root = () => (
  <>
    <Composition
      id="Short"
      component={PebbleVideo}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={total(demo as VideoProps)}
      defaultProps={demo as VideoProps}
      calculateMetadata={({ props }) => ({ durationInFrames: total(props) })}
    />
    <Composition
      id="Wide"
      component={PebbleVideo}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={total(demo as VideoProps)}
      defaultProps={demo as VideoProps}
      calculateMetadata={({ props }) => ({ durationInFrames: total(props) })}
    />
  </>
);
