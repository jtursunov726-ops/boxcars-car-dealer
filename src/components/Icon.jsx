// Inline SVG icon set (stroke icons drawn on a 24×24 grid).
const paths = {
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  'chev-l': <path d="m15 6-6 6 6 6" />,
  'chev-r': <path d="m9 6 6 6-6 6" />,
  'chev-d': <path d="m7 10 5 5 5-5" />,
  'chev-u': <path d="m7 14 5-5 5 5" />,
  bookmark: <path d="M7 4h10v16l-5-3.5L7 20z" />,
  gauge: <><path d="M4.5 17a8.5 8.5 0 1 1 15 0" /><path d="m12 13 3.5-3.5" /><circle cx="12" cy="13" r="1" /></>,
  fuel: <><path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M3.5 20h12M5 10h9" /><path d="M14 8h2a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V8.5L18 6" /></>,
  gear: <><circle cx="6" cy="6" r="1.6" /><circle cx="12" cy="6" r="1.6" /><circle cx="18" cy="6" r="1.6" /><circle cx="6" cy="18" r="1.6" /><circle cx="12" cy="18" r="1.6" /><path d="M6 7.6v8.8M12 7.6v8.8M18 7.6V12H6" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  phone: <><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  call: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  play: <path d="M9 7v10l8-5z" fill="currentColor" />,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>,
  compare: <path d="M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3" />,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  cart: <><path d="M3 4h2.5l2.2 11h10.6l2-8H6.5" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  whatsapp: <><path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z" /><path d="M9 9.5c.3 2 2.2 4 4.5 4.6l1.2-1.2 1.8.8c-.2 1-1 1.8-2 1.8A6 6 0 0 1 8 9c0-1 .8-1.8 1.8-2l.8 1.8z" /></>,
  video: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l5.5-3.5z" /></>,
  body: <><path d="M3 15v-3l2.5-5h13L21 12v3z" /><circle cx="7" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  engine: <path d="M4 10h3l2-2h5l2 2h2v2h2v4h-2v2h-4l-2 2H9l-2-2H4z" />,
  door: <><path d="M5 21V8l6-5h8v18z" /><path d="M5 12h14M15 15h2" /></>,
  color: <><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2.5 1.5-2.5H18a3 3 0 0 0 3-3A8.5 8.5 0 0 0 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></>,
  vin: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10v4M10 10v4M13 10v4M16 10v4" /></>,
  cylinder: <><ellipse cx="12" cy="6" rx="6" ry="2.5" /><path d="M6 6v12c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" /></>,
  drive: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="2.5" /><path d="M12 3.5v6M5 15.5l5-2.5M19 15.5l-5-2.5" /></>,
  condition: <><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor" stroke="none" />,
  quote: <path d="M5 18v-5a6 6 0 0 1 4-6l.8 1.6A4 4 0 0 0 8 11h2v7zm9 0v-5a6 6 0 0 1 4-6l.8 1.6A4 4 0 0 0 17 11h2v7z" fill="currentColor" stroke="none" />,
  apple: <path d="M16.5 12.6c0-2.4 2-3.5 2-3.6a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8A4.5 4.5 0 0 0 4.9 9.5c-1.6 2.8-.4 7 1.2 9.2.8 1.1 1.7 2.3 2.8 2.3s1.6-.8 3-.8 1.8.8 3 .7 2-1.1 2.7-2.2a9.7 9.7 0 0 0 1.2-2.5 3.9 3.9 0 0 1-2.3-3.6zM14.3 5.6a4 4 0 0 0 .9-2.9 4 4 0 0 0-2.6 1.4 3.8 3.8 0 0 0-1 2.8 3.4 3.4 0 0 0 2.7-1.3z" fill="currentColor" stroke="none" />,
  gplay: <path d="M4 3.5v17l9-8.5zm10.5 7 2.8-2.7L6 2.5zm0 3L6 21.5l11.3-5.3zm4.5-4.2-2.6 1.4-2.2 2.3 2.2 2.3 2.6 1.4c.9-.5.9-2 0-2.5L18 12.6z" fill="currentColor" stroke="none" />,
  fb: <path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.2H7.5v3h2.6V21z" fill="currentColor" stroke="none" />,
  tw: <path d="M21 6.3a7.4 7.4 0 0 1-2.1.6 3.7 3.7 0 0 0 1.6-2 7.4 7.4 0 0 1-2.3.9 3.7 3.7 0 0 0-6.3 3.4A10.5 10.5 0 0 1 4.3 5.3a3.7 3.7 0 0 0 1.1 4.9 3.7 3.7 0 0 1-1.7-.5 3.7 3.7 0 0 0 3 3.7 3.7 3.7 0 0 1-1.7.1 3.7 3.7 0 0 0 3.5 2.6A7.4 7.4 0 0 1 3 17.6 10.5 10.5 0 0 0 8.7 19.3c6.8 0 10.6-5.7 10.6-10.6v-.5A7.5 7.5 0 0 0 21 6.3z" fill="currentColor" stroke="none" />,
  ig: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></>,
  in: <path d="M5 9h3v10H5zM6.5 4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9h2.9v1.4c.4-.8 1.4-1.6 3-1.6 3.1 0 3.6 2 3.6 4.7V19h-3v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V19h-3z" fill="currentColor" stroke="none" />,
  pinterest: <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.8-.1-1.9 0-2.7l1.1-4.5s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.7-3.9-4-3.9-2.8 0-4.4 2.1-4.4 4.2 0 .8.3 1.7.7 2.2l.1.4-.3 1.1c0 .2-.2.3-.4.2-1.2-.6-2-2.4-2-3.9 0-3.1 2.3-6 6.6-6 3.5 0 6.2 2.5 6.2 5.8 0 3.4-2.2 6.2-5.2 6.2-1 0-2-.5-2.3-1.1l-.6 2.4c-.2.9-.9 2-1.3 2.6A9 9 0 1 0 12 3z" fill="currentColor" stroke="none" />,
  // feature icons (two-tone)
  finance: <><path d="M6 8.5 12 4l6 4.5" /><rect x="5" y="8.5" width="14" height="11.5" rx="3" /><path d="M14 12.3c-.4-.6-1.1-.9-2-.9-1.2 0-2 .6-2 1.4s.8 1.2 2 1.4 2 .7 2 1.5-.9 1.4-2 1.4c-.9 0-1.7-.4-2-1M12 10.3v1.1M12 16.6v1.1" className="ic-accent" /></>,
  trusted: <><path d="M5 9.5 12 3l7 6.5-7 11.5z" /><path d="M5 9.5h14M9.5 9.5 12 20.5l2.5-11M9 9.5 12 3l3 6.5" className="ic-accent" /></>,
  pricing: <><path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8L21 12l-8.5 8.5z" /><circle cx="8" cy="8" r="1.5" className="ic-accent" /><path d="M10.5 15.5 15 11M11 11.5l1 .2M13.5 14.6l1 .2" className="ic-accent" /></>,
  service: <><path d="M3.5 15v-3.5l2.2-4.4c.3-.6 1-1.1 1.7-1.1h9.2c.7 0 1.4.5 1.7 1.1l2.2 4.4V15z" /><circle cx="7.5" cy="15.5" r="1.8" /><circle cx="16.5" cy="15.5" r="1.8" /><path d="M12 15.5h0M15 19.5l2-2 2 2 2-2" className="ic-accent" /></>,
  // body types
  suv: <><path d="M2.5 15V11l2-3.5h10l3.5 3.5 3 .8V15z" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="16.5" cy="15.5" r="1.8" /></>,
  sedan: <><path d="M2.5 15v-2l3-1 3-3h7l3 3 3 .8V15z" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  hatchback: <><path d="M2.5 15v-2.5l2-1L8 7.5h8l3.5 4.5 2 .6V15z" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  coupe: <><path d="M2.5 15v-2l4-1.5 3.5-2.5h5.5l4 3 2 .8V15z" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  hybrid: <><path d="M3 15v-2.5l2.5-4h13l2.5 4V15z" /><circle cx="7" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /><path d="m12 9.5-1.5 2.5h3l-1.5 2.5" /></>,
  convertible: <><path d="M2.5 15v-2l5-1.5 2-2.5h1l-.5 2.5h6l4.5 1v2.5z" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  van: <><path d="M2.5 15V7h12l4 4 3 1v3z" /><path d="M14.5 7v4h4" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  truck: <><path d="M2.5 15v-4h9V7h5l2.5 4 2.5.8V15z" /><circle cx="6.5" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /></>,
  electric: <><path d="M3 15v-2.5l3-4h9l3 4 3 .8V15z" /><circle cx="7" cy="15.5" r="1.8" /><circle cx="17" cy="15.5" r="1.8" /><path d="M20 3v3M18.5 4.5h3" /></>,
}

export default function Icon({ name, size, className = '', ...rest }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name] || paths.body}
    </svg>
  )
}
