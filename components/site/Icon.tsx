export type IconName =
  | "flag"
  | "building"
  | "anchor"
  | "stamp"
  | "ship"
  | "phone"
  | "mail"
  | "pin"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "x"
  | "arrow"
  | "doc"
  | "external"
  | "home"
  | "megaphone"
  | "settings";

const paths: Record<IconName, React.ReactNode> = {
  flag: (
    <path d="M4 21V4m0 0s1.5-1.5 5-1.5S14.5 4 18 4s2.5-1 2.5-1v11s-1 1-4.5 1-5.5-1.5-9-1.5" />
  ),
  building: (
    <>
      <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2" />
    </>
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 7.5V21m0 0c-4.5 0-8-3.5-8-7h2.5M12 21c4.5 0 8-3.5 8-7h-2.5" />
    </>
  ),
  stamp: (
    <>
      <path d="M5 21h14M6 17h12v-3H6zM12 14V9" />
      <path d="M9 6.5a3 3 0 1 1 6 0c0 1.5-1 2.5-3 2.5s-3-1-3-2.5Z" />
    </>
  ),
  ship: (
    <>
      <path d="M3 17.5 5 11l7-2 7 2 2 6.5" />
      <path d="M12 9V4m-3 2V4h6v2" />
      <path d="M2 21c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0 3.5-1 5 0" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.85.57 2.8.7A2 2 0 0 1 22 16.9Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6L22 7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.3-4A8.94 8.94 0 0 1 3 12a9 9 0 1 1 9 9 8.94 8.94 0 0 1-5-1.3Z" />
      <path d="M9 9.5c0 4 2.5 6.5 5.5 6.5.5 0 1.5-.5 1.5-1s-1-1.5-1.5-1.5-.75.5-1.5.25S10.75 12 10.5 11.25 11 10 11 9.5 10.5 8 10 8s-1 .5-1 1.5Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M14 3h-2.5A3.5 3.5 0 0 0 8 6.5V9H5.5v4H8v8h4v-8h2.5l.5-4h-3V7a1 1 0 0 1 1-1h2Z" />
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 10.5V17M7 7v.01M11.5 17v-3.5a2.5 2.5 0 0 1 5 0V17M11.5 17v-6.5" />
    </>
  ),
  x: (
    <>
      <path d="M4 3h4.3l11.7 18h-4.3L4 3Z" />
      <path d="M20 3 4.5 21" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </>
  ),
  external: (
    <>
      <path d="M15 3h6v6M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  settings: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
