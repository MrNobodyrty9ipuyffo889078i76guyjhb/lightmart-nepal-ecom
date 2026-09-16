
export type CategorySlug = "light" | "switch" | "fan" | "electric-stove" | "clock" | "main";

export type Tag = "featured" | "new" | "best" | "popular";

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  specs: Record<string, string>;
  wattage?: number;
  colorTemp?: "Warm White" | "Cool White" | "Daylight";
  gangs?: number;
  speeds?: number;
  tags: Tag[];
}

export const CATEGORIES: {
  slug: CategorySlug;
  label: string;
  blurb: string;
  subcategories: string[];
}[] = [
  {
    slug: "light",
    label: "Light",
    blurb: "LED bulbs, panels, pendants & outdoor",
    subcategories: ["LED Bulbs", "Panel Lights", "Pendant Lights", "Strip Lights", "Flood Lights", "Table Lamps"],
  },
  {
    slug: "switch",
    label: "Switch",
    blurb: "Modular switches, sockets & plates",
    subcategories: ["1 Gang", "2 Gang", "4 Gang", "6 Gang", "Sockets", "Dimmers"],
  },
  {
    slug: "main",
    label: "Main (Electrical)",
    blurb: "MCBs, DBs, wires & accessories",
    subcategories: ["MCB", "RCCB", "Distribution Board", "Copper Wire", "Changeover", "Doorbell"],
  },
  {
    slug: "fan",
    label: "Fan",
    blurb: "Ceiling, wall, exhaust & stand fans",
    subcategories: ["Ceiling Fan", "Wall Fan", "Stand Fan", "Exhaust Fan", "BLDC Fan"],
  },
  {
    slug: "electric-stove",
    label: "Electric Stove",
    blurb: "Induction, infrared & hot plates",
    subcategories: ["Induction Cooker", "Infrared Cooker", "Hot Plate", "Built-in Hob"],
  },
  {
    slug: "clock",
    label: "Clock",
    blurb: "Wall, table & digital clocks",
    subcategories: ["Wall Clock", "Table Clock", "Digital Clock", "Pendulum Clock"],
  },
];

export const BRANDS = [
  "Lumina",
  "Surya",
  "Everest Electric",
  "Himal Volt",
  "NexaSwitch",
  "Sagarmatha Home",
  "OrbitTime",
  "Kathmandu Electricals",
];

export const PRICE_BRACKETS = [
  { label: "Under Rs. 1,000", min: 0, max: 1000 },
  { label: "Rs. 1,000 – 3,000", min: 1000, max: 3000 },
  { label: "Rs. 3,000 – 7,000", min: 3000, max: 7000 },
  { label: "Rs. 7,000 – 15,000", min: 7000, max: 15000 },
  { label: "Above Rs. 15,000", min: 15000, max: Number.MAX_SAFE_INTEGER },
];

let id = 0;
type Draft = Omit<Product, "id" | "slug"> & { slug?: string };
const make = (d: Draft): Product => ({
  id: ++id,
  slug: d.slug ?? d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  ...d,
} as Product);

export const PRODUCTS: Product[] = [
  // ---------------- LIGHT ----------------
  make({
    name: "Lumina 9W LED Bulb Warm White",
    brand: "Lumina", category: "light", price: 320, oldPrice: 420, rating: 4.6, reviews: 184, stock: 240,
    wattage: 9, colorTemp: "Warm White", tags: ["featured", "best"],
    description: "Everyday 9W B22 LED bulb with flicker-free warm light, ideal for bedrooms and living rooms across Nepal's variable voltage conditions.",
    specs: { Wattage: "9W", Base: "B22 Pin", Lumens: "810 lm", Voltage: "140–280V", Warranty: "2 Years" },
  }),
  make({
    name: "Lumina 12W LED Bulb Cool Daylight",
    brand: "Lumina", category: "light", price: 420, rating: 4.5, reviews: 121, stock: 180,
    wattage: 12, colorTemp: "Daylight", tags: ["best"],
    description: "Bright 12W daylight bulb for kitchens, study rooms and shops.",
    specs: { Wattage: "12W", Base: "B22 Pin", Lumens: "1120 lm", Voltage: "140–280V", Warranty: "2 Years" },
  }),
  make({
    name: "Surya 18W Round Slim Panel Light",
    brand: "Surya", category: "light", price: 980, oldPrice: 1250, rating: 4.7, reviews: 96, stock: 85,
    wattage: 18, colorTemp: "Cool White", tags: ["featured", "popular"],
    description: "Recessed slim panel with uniform diffusion — a false-ceiling favourite.",
    specs: { Wattage: "18W", "Cut-out": "165 mm", Lumens: "1620 lm", Body: "Aluminium", Warranty: "2 Years" },
  }),
  make({
    name: "Surya 24W Square Panel Light",
    brand: "Surya", category: "light", price: 1290, rating: 4.4, reviews: 64, stock: 70,
    wattage: 24, colorTemp: "Cool White", tags: ["popular"],
    description: "Square recessed panel for offices, clinics and retail counters.",
    specs: { Wattage: "24W", "Cut-out": "220 mm", Lumens: "2200 lm", Body: "Aluminium", Warranty: "2 Years" },
  }),
  make({
    name: "Lumina Aurora Brass Pendant Lamp",
    brand: "Lumina", category: "light", price: 8450, oldPrice: 9900, rating: 4.9, reviews: 42, stock: 18,
    wattage: 20, colorTemp: "Warm White", tags: ["featured", "new", "popular"],
    description: "Matte black and brushed brass pendant with integrated warm LED ring — a statement over dining tables and islands.",
    specs: { Wattage: "20W", Finish: "Black / Brass", Drop: "Adjustable to 1.2 m", Dimmable: "Yes", Warranty: "3 Years" },
  }),
  make({
    name: "Lumina Halo Minimal Pendant",
    brand: "Lumina", category: "light", price: 6250, rating: 4.7, reviews: 31, stock: 22,
    wattage: 16, colorTemp: "Warm White", tags: ["new"],
    description: "Slim halo ring pendant with frosted diffuser for soft, glare-free light.",
    specs: { Wattage: "16W", Finish: "Matte Black", Diameter: "400 mm", Dimmable: "Yes", Warranty: "2 Years" },
  }),
  make({
    name: "Himal Volt 50W LED Flood Light",
    brand: "Himal Volt", category: "light", price: 2350, oldPrice: 2800, rating: 4.5, reviews: 77, stock: 54,
    wattage: 50, colorTemp: "Daylight", tags: ["best"],
    description: "IP66 outdoor flood light for courtyards, construction sites and signboards.",
    specs: { Wattage: "50W", "IP Rating": "IP66", Lumens: "4500 lm", Body: "Die-cast Aluminium", Warranty: "2 Years" },
  }),
  make({
    name: "Himal Volt 100W LED Flood Light",
    brand: "Himal Volt", category: "light", price: 4150, rating: 4.6, reviews: 38, stock: 30,
    wattage: 100, colorTemp: "Daylight", tags: ["popular"],
    description: "High-output flood light for warehouses, parking and open compounds.",
    specs: { Wattage: "100W", "IP Rating": "IP66", Lumens: "9000 lm", Body: "Die-cast Aluminium", Warranty: "2 Years" },
  }),
  make({
    name: "Lumina 5m Warm LED Strip Kit",
    brand: "Lumina", category: "light", price: 1650, rating: 4.3, reviews: 112, stock: 96,
    wattage: 24, colorTemp: "Warm White", tags: ["new"],
    description: "Adhesive cove strip with driver and dimmer for ceiling coves and cabinets.",
    specs: { Length: "5 m", Wattage: "24W total", "LED Count": "300", Driver: "Included", Warranty: "1 Year" },
  }),
  make({
    name: "Sagarmatha Home Reading Table Lamp",
    brand: "Sagarmatha Home", category: "light", price: 2890, oldPrice: 3400, rating: 4.4, reviews: 58, stock: 40,
    wattage: 8, colorTemp: "Warm White", tags: ["popular"],
    description: "Touch-dimmable desk lamp with three brightness steps and USB charging port.",
    specs: { Wattage: "8W", Control: "Touch Dimmer", Port: "USB-A 5V", Finish: "Matte Black", Warranty: "1 Year" },
  }),
  make({
    name: "Surya 36W LED Batten Tube",
    brand: "Surya", category: "light", price: 890, rating: 4.2, reviews: 143, stock: 150,
    wattage: 36, colorTemp: "Cool White", tags: ["best"],
    description: "4-foot surface batten for corridors, shops and workshops.",
    specs: { Wattage: "36W", Length: "1200 mm", Lumens: "3600 lm", Voltage: "140–280V", Warranty: "2 Years" },
  }),
  make({
    name: "Lumina Track Spot Light 12W",
    brand: "Lumina", category: "light", price: 1850, rating: 4.6, reviews: 27, stock: 44,
    wattage: 12, colorTemp: "Warm White", tags: ["new"],
    description: "Adjustable track spot for galleries, boutiques and feature walls.",
    specs: { Wattage: "12W", "Beam Angle": "24°", CRI: "Ra 90", Finish: "Black", Warranty: "2 Years" },
  }),

  // ---------------- SWITCH ----------------
  make({
    name: "NexaSwitch 1 Gang Modular Switch",
    brand: "NexaSwitch", category: "switch", price: 185, rating: 4.4, reviews: 210, stock: 320,
    gangs: 1, tags: ["best"],
    description: "Single-gang 6A modular switch with silent rocker and polycarbonate body.",
    specs: { Gangs: "1", Rating: "6A", Material: "Polycarbonate", Colour: "Crisp White", Warranty: "3 Years" },
  }),
  make({
    name: "NexaSwitch 2 Gang Modular Switch",
    brand: "NexaSwitch", category: "switch", price: 310, oldPrice: 380, rating: 4.5, reviews: 176, stock: 260,
    gangs: 2, tags: ["featured", "best"],
    description: "Two-gang modular switch with fingerprint-resistant matte finish.",
    specs: { Gangs: "2", Rating: "6A", Material: "Polycarbonate", Colour: "Crisp White", Warranty: "3 Years" },
  }),
  make({
    name: "NexaSwitch 4 Gang Switch Plate",
    brand: "NexaSwitch", category: "switch", price: 690, rating: 4.3, reviews: 88, stock: 140,
    gangs: 4, tags: ["popular"],
    description: "Four-gang plate with locator LEDs, ideal for living room control walls.",
    specs: { Gangs: "4", Rating: "6A", Indicator: "LED Locator", Plate: "Included", Warranty: "3 Years" },
  }),
  make({
    name: "NexaSwitch 6 Gang Control Panel",
    brand: "NexaSwitch", category: "switch", price: 1150, oldPrice: 1350, rating: 4.6, reviews: 54, stock: 90,
    gangs: 6, tags: ["featured"],
    description: "Six-gang modular panel for master bedrooms and hotel rooms.",
    specs: { Gangs: "6", Rating: "6A", Indicator: "LED Locator", Plate: "Included", Warranty: "3 Years" },
  }),
  make({
    name: "NexaSwitch Universal 3-Pin Socket 16A",
    brand: "NexaSwitch", category: "switch", price: 420, rating: 4.5, reviews: 132, stock: 200,
    gangs: 1, tags: ["best"],
    description: "Universal 6A/16A socket with shutter protection for appliances.",
    specs: { Rating: "16A", Type: "Universal 3-Pin", Safety: "Child Shutter", Colour: "White", Warranty: "3 Years" },
  }),
  make({
    name: "NexaSwitch LED Dimmer 400W",
    brand: "NexaSwitch", category: "switch", price: 1290, rating: 4.2, reviews: 41, stock: 60,
    gangs: 1, tags: ["new"],
    description: "Rotary dimmer tuned for dimmable LED loads without flicker.",
    specs: { Load: "400W", Type: "Rotary", Compatibility: "LED / Halogen", Colour: "White", Warranty: "2 Years" },
  }),
  make({
    name: "Everest Electric 2 Gang Two-Way Switch",
    brand: "Everest Electric", category: "switch", price: 395, rating: 4.3, reviews: 63, stock: 110,
    gangs: 2, tags: ["popular"],
    description: "Two-way switching for staircases and long corridors.",
    specs: { Gangs: "2", Type: "Two-Way", Rating: "6A", Colour: "White", Warranty: "2 Years" },
  }),
  make({
    name: "Everest Electric USB Charging Socket",
    brand: "Everest Electric", category: "switch", price: 1480, oldPrice: 1750, rating: 4.4, reviews: 36, stock: 48,
    gangs: 1, tags: ["new"],
    description: "Wall socket with twin USB-A fast charging outputs.",
    specs: { USB: "2 × 2.4A", Rating: "16A", Plate: "Modular", Colour: "White", Warranty: "2 Years" },
  }),

  // ---------------- MAIN (ELECTRICAL) ----------------
  make({
    name: "Kathmandu Electricals 32A Single Pole MCB",
    brand: "Kathmandu Electricals", category: "main", price: 520, rating: 4.5, reviews: 91, stock: 180,
    tags: ["best"],
    description: "C-curve single pole miniature circuit breaker for lighting and socket circuits.",
    specs: { Current: "32A", Poles: "1", Curve: "C", "Breaking Capacity": "6kA", Warranty: "2 Years" },
  }),
  make({
    name: "Kathmandu Electricals 63A Double Pole MCB",
    brand: "Kathmandu Electricals", category: "main", price: 1180, rating: 4.6, reviews: 47, stock: 95,
    tags: ["popular"],
    description: "Main incomer breaker for residential distribution boards.",
    specs: { Current: "63A", Poles: "2", Curve: "C", "Breaking Capacity": "6kA", Warranty: "2 Years" },
  }),
  make({
    name: "Himal Volt 8-Way Distribution Board",
    brand: "Himal Volt", category: "main", price: 3450, oldPrice: 3990, rating: 4.7, reviews: 33, stock: 40,
    tags: ["featured"],
    description: "Powder-coated metal DB with transparent door and labelled ways.",
    specs: { Ways: "8", Door: "Transparent", Mounting: "Surface", "IP Rating": "IP40", Warranty: "2 Years" },
  }),
  make({
    name: "Himal Volt 12-Way Distribution Board",
    brand: "Himal Volt", category: "main", price: 4890, rating: 4.6, reviews: 22, stock: 26,
    tags: ["new"],
    description: "Larger DB for duplex homes and small commercial floors.",
    specs: { Ways: "12", Door: "Transparent", Mounting: "Surface", "IP Rating": "IP40", Warranty: "2 Years" },
  }),
  make({
    name: "Everest Electric 40A RCCB 30mA",
    brand: "Everest Electric", category: "main", price: 3250, rating: 4.8, reviews: 29, stock: 34,
    tags: ["featured", "popular"],
    description: "Residual current breaker giving shock protection for the whole house.",
    specs: { Current: "40A", Sensitivity: "30mA", Poles: "2", Standard: "IEC 61008", Warranty: "2 Years" },
  }),
  make({
    name: "Everest Electric 2.5 sq mm Copper Wire 90m",
    brand: "Everest Electric", category: "main", price: 6850, oldPrice: 7400, rating: 4.7, reviews: 68, stock: 58,
    tags: ["best"],
    description: "FR-grade multistrand copper wire coil for socket circuits.",
    specs: { Size: "2.5 sq mm", Length: "90 m", Conductor: "99.97% Copper", Insulation: "FR PVC", Warranty: "N/A" },
  }),
  make({
    name: "Everest Electric 1.5 sq mm Copper Wire 90m",
    brand: "Everest Electric", category: "main", price: 4350, rating: 4.6, reviews: 74, stock: 62,
    tags: ["popular"],
    description: "Lighting-circuit copper wire coil with flame-retardant sheath.",
    specs: { Size: "1.5 sq mm", Length: "90 m", Conductor: "99.97% Copper", Insulation: "FR PVC", Warranty: "N/A" },
  }),
  make({
    name: "Himal Volt 63A Manual Changeover Switch",
    brand: "Himal Volt", category: "main", price: 2450, rating: 4.4, reviews: 19, stock: 28,
    tags: ["new"],
    description: "Load-break changeover for switching between mains and inverter supply.",
    specs: { Current: "63A", Poles: "2", Type: "Manual", Mounting: "Enclosure", Warranty: "1 Year" },
  }),
  make({
    name: "Sagarmatha Home Wireless Doorbell",
    brand: "Sagarmatha Home", category: "main", price: 1290, rating: 4.1, reviews: 87, stock: 76,
    tags: ["popular"],
    description: "Plug-in wireless doorbell with 36 chimes and 150 m range.",
    specs: { Range: "150 m", Chimes: "36", Power: "Plug-in", Waterproof: "Button IP44", Warranty: "1 Year" },
  }),

  // ---------------- FAN ----------------
  make({
    name: "Surya Breeze 1200mm Ceiling Fan",
    brand: "Surya", category: "fan", price: 5450, oldPrice: 6200, rating: 4.5, reviews: 154, stock: 62,
    wattage: 70, speeds: 5, tags: ["featured", "best"],
    description: "Aerodynamic 1200 mm ceiling fan with high air delivery and quiet motor.",
    specs: { Sweep: "1200 mm", Power: "70W", Speed: "380 RPM", "Air Delivery": "220 CMM", Warranty: "2 Years" },
  }),
  make({
    name: "Surya BLDC Saver 1200mm Ceiling Fan",
    brand: "Surya", category: "fan", price: 9850, oldPrice: 11200, rating: 4.8, reviews: 71, stock: 35,
    wattage: 32, speeds: 5, tags: ["featured", "new", "popular"],
    description: "Energy-saving BLDC fan with remote, running at roughly half the power of a conventional fan.",
    specs: { Sweep: "1200 mm", Power: "32W", Control: "Remote", "Air Delivery": "230 CMM", Warranty: "3 Years" },
  }),
  make({
    name: "Lumina Noir 1320mm Designer Fan",
    brand: "Lumina", category: "fan", price: 14500, rating: 4.9, reviews: 24, stock: 12,
    wattage: 35, speeds: 6, tags: ["new", "popular"],
    description: "Three-blade matte black designer fan with wood-finish blades and silent BLDC motor.",
    specs: { Sweep: "1320 mm", Power: "35W", Blades: "3", Control: "Remote + App", Warranty: "3 Years" },
  }),
  make({
    name: "Everest Electric 400mm Wall Fan",
    brand: "Everest Electric", category: "fan", price: 3950, rating: 4.3, reviews: 66, stock: 48,
    wattage: 55, speeds: 3, tags: ["best"],
    description: "Oscillating wall-mount fan with pull-cord control for shops and kitchens.",
    specs: { Sweep: "400 mm", Power: "55W", Oscillation: "Yes", Speeds: "3", Warranty: "1 Year" },
  }),
  make({
    name: "Everest Electric 400mm Pedestal Stand Fan",
    brand: "Everest Electric", category: "fan", price: 4650, oldPrice: 5200, rating: 4.2, reviews: 58, stock: 44,
    wattage: 60, speeds: 3, tags: ["popular"],
    description: "Height-adjustable stand fan with wide oscillation and stable base.",
    specs: { Sweep: "400 mm", Power: "60W", Height: "Adjustable", Speeds: "3", Warranty: "1 Year" },
  }),
  make({
    name: "Himal Volt 200mm Exhaust Fan",
    brand: "Himal Volt", category: "fan", price: 1890, rating: 4.1, reviews: 93, stock: 88,
    wattage: 30, speeds: 1, tags: ["best"],
    description: "Compact exhaust fan with back-draft shutter for bathrooms and kitchens.",
    specs: { Sweep: "200 mm", Power: "30W", Shutter: "Auto", Speeds: "1", Warranty: "1 Year" },
  }),
  make({
    name: "Surya Mini 300mm Table Fan",
    brand: "Surya", category: "fan", price: 2750, rating: 4.0, reviews: 47, stock: 55,
    wattage: 45, speeds: 3, tags: ["new"],
    description: "Portable table fan with copper motor and tilt adjustment.",
    specs: { Sweep: "300 mm", Power: "45W", Motor: "Copper", Speeds: "3", Warranty: "1 Year" },
  }),

  // ---------------- ELECTRIC STOVE ----------------
  make({
    name: "Sagarmatha Home 2000W Induction Cooker",
    brand: "Sagarmatha Home", category: "electric-stove", price: 5250, oldPrice: 6100, rating: 4.5, reviews: 138, stock: 52,
    wattage: 2000, tags: ["featured", "best"],
    description: "Touch-control induction cooktop with 8 preset Nepali cooking modes and timer.",
    specs: { Power: "2000W", Control: "Touch", Presets: "8", Surface: "Crystal Glass", Warranty: "1 Year" },
  }),
  make({
    name: "Sagarmatha Home 2200W Infrared Cooker",
    brand: "Sagarmatha Home", category: "electric-stove", price: 4890, rating: 4.3, reviews: 84, stock: 46,
    wattage: 2200, tags: ["best"],
    description: "Infrared cooker that works with every utensil, including brass and clay.",
    specs: { Power: "2200W", Type: "Infrared", Control: "Touch + Knob", Surface: "Ceramic Glass", Warranty: "1 Year" },
  }),
  make({
    name: "Everest Electric 1500W Hot Plate",
    brand: "Everest Electric", category: "electric-stove", price: 2450, rating: 4.0, reviews: 61, stock: 70,
    wattage: 1500, tags: ["popular"],
    description: "Single cast-iron hot plate — a dependable back-up for load-shedding kitchens.",
    specs: { Power: "1500W", Plate: "Cast Iron", Control: "Knob", Body: "Steel", Warranty: "1 Year" },
  }),
  make({
    name: "Everest Electric Double Hot Plate 2500W",
    brand: "Everest Electric", category: "electric-stove", price: 4150, oldPrice: 4700, rating: 4.1, reviews: 39, stock: 38,
    wattage: 2500, tags: ["new"],
    description: "Twin-burner hot plate with independent controls for hostels and canteens.",
    specs: { Power: "2500W", Burners: "2", Control: "Twin Knob", Body: "Steel", Warranty: "1 Year" },
  }),
  make({
    name: "Lumina Built-in 2 Zone Induction Hob",
    brand: "Lumina", category: "electric-stove", price: 18900, oldPrice: 21500, rating: 4.8, reviews: 17, stock: 9,
    wattage: 3500, tags: ["featured", "new", "popular"],
    description: "Flush-fit black glass induction hob with slider controls and child lock.",
    specs: { Power: "3500W", Zones: "2", Control: "Slider Touch", Safety: "Child Lock", Warranty: "2 Years" },
  }),
  make({
    name: "Sagarmatha Home Portable Mini Induction 1200W",
    brand: "Sagarmatha Home", category: "electric-stove", price: 3450, rating: 4.2, reviews: 52, stock: 64,
    wattage: 1200, tags: ["popular"],
    description: "Lightweight induction plate for small flats, offices and travel.",
    specs: { Power: "1200W", Weight: "2.1 kg", Control: "Touch", Timer: "3 Hour", Warranty: "1 Year" },
  }),

  // ---------------- CLOCK ----------------
  make({
    name: "OrbitTime Minimal Black Wall Clock 12in",
    brand: "OrbitTime", category: "clock", price: 1450, oldPrice: 1750, rating: 4.6, reviews: 122, stock: 110,
    tags: ["featured", "best"],
    description: "Silent sweep wall clock with matte black rim and crisp white dial.",
    specs: { Diameter: "12 inch", Movement: "Silent Sweep", Battery: "1 × AA", Glass: "Acrylic", Warranty: "1 Year" },
  }),
  make({
    name: "OrbitTime Grande Wall Clock 16in",
    brand: "OrbitTime", category: "clock", price: 2650, rating: 4.7, reviews: 44, stock: 52,
    tags: ["popular"],
    description: "Oversized statement clock for living rooms and reception areas.",
    specs: { Diameter: "16 inch", Movement: "Silent Sweep", Battery: "1 × AA", Glass: "Tempered", Warranty: "1 Year" },
  }),
  make({
    name: "OrbitTime Wooden Pendulum Wall Clock",
    brand: "OrbitTime", category: "clock", price: 4250, oldPrice: 4800, rating: 4.5, reviews: 26, stock: 20,
    tags: ["new"],
    description: "Classic walnut-finish pendulum clock with brass detailing.",
    specs: { Height: "60 cm", Movement: "Pendulum Quartz", Battery: "2 × AA", Finish: "Walnut", Warranty: "1 Year" },
  }),
  make({
    name: "OrbitTime LED Digital Desk Clock",
    brand: "OrbitTime", category: "clock", price: 1890, rating: 4.3, reviews: 73, stock: 84,
    tags: ["new", "best"],
    description: "Digital clock with temperature, alarm and dimmable LED display.",
    specs: { Display: "LED", Functions: "Time, Date, Temp, Alarm", Power: "USB + Battery", Finish: "Matte Black", Warranty: "1 Year" },
  }),
  make({
    name: "Sagarmatha Home Brass Table Clock",
    brand: "Sagarmatha Home", category: "clock", price: 3150, rating: 4.4, reviews: 18, stock: 24,
    tags: ["popular"],
    description: "Solid brass desk clock with domed glass — a refined gifting piece.",
    specs: { Height: "14 cm", Movement: "Quartz", Battery: "1 × AA", Finish: "Brushed Brass", Warranty: "1 Year" },
  }),
  make({
    name: "OrbitTime Slim Office Wall Clock 10in",
    brand: "OrbitTime", category: "clock", price: 990, rating: 4.2, reviews: 96, stock: 130,
    tags: ["best"],
    description: "Budget-friendly slim clock for offices, classrooms and shops.",
    specs: { Diameter: "10 inch", Movement: "Step Quartz", Battery: "1 × AA", Glass: "Acrylic", Warranty: "6 Months" },
  }),
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCategory = (c: CategorySlug) => PRODUCTS.filter((p) => p.category === c);
export const byTag = (t: Tag, limit = 8) => PRODUCTS.filter((p) => p.tags.includes(t)).slice(0, limit);
export const categoryLabel = (c: CategorySlug) =>
  CATEGORIES.find((x) => x.slug === c)?.label ?? c;

export function searchProducts(q: string, limit = 50) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      categoryLabel(p.category).toLowerCase().includes(term),
  ).slice(0, limit);
}
