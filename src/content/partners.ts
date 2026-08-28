/** Companies shown on the landing “we work with” strip. */
export const LANDING_PARTNERS = [
  {
    id: "datiumtech",
    name: "DatiumTech",
    src: "/partners/datiumtech.png",
    /** Stacked mark — taller aspect */
    className: "h-20 md:h-24 w-auto max-w-[160px]",
  },
  {
    id: "radarprop",
    name: "RadarProp",
    src: "/partners/radarprop.png",
    className: "h-20 md:h-24 w-auto max-w-[180px]",
  },
  {
    id: "libertyclub",
    name: "Liberty Club",
    src: "/partners/libertyclub.png",
    /** Wide wordmark */
    className: "h-10 md:h-12 w-auto max-w-[240px]",
  },
] as const;
