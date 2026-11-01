export interface ChemicalAssay {
  element: string;
  value: number;
  unit: string;
  minMax: string;
}

export interface PhysicalProperties {
  hardness?: string;
  specificGravity?: string;
  moisture?: string;
  whiteness?: string;
  bulkDensity?: string;
  swellingIndex?: string;
  liquidLimit?: string;
  marshFunnelViscosity?: string;
  gellingIndex?: string;
  phValue?: string;
  firingColor?: string;
  meltingRange?: string;
  brightness?: string;
  grainShape?: string;
  clayContent?: string;
  meshAvailability?: string;
  finishOptions?: string;
  thicknessTolerance?: string;
}

export interface CustomProcessingInfo {
  available: boolean;
  badgeText: string;
  headline: string;
  summary: string;
  capabilities: string[];
}

export interface MineralProduct {
  id: string;
  name: string;
  formula: string;
  category: 'silica' | 'feldspar' | 'ores' | 'clays' | 'flux' | 'stones';
  categoryLabel: string;
  heroImage: string;
  tagline: string;
  shortDesc: string;
  grades: string[];
  origin: string;
  forms: string[];
  assays: ChemicalAssay[];
  physicalProperties: PhysicalProperties;
  applications: string[];
  packaging: string[];
  dispatchLeadTime: string;
  portProximity: string;
  inStockTonnes: number;
  customProcessing?: CustomProcessingInfo;
}

export const AMOGH_PRODUCTS: MineralProduct[] = [
  {
    id: "quartz-snow-white",
    name: "Snow White Quartz",
    formula: "SiO₂",
    category: "silica",
    categoryLabel: "Silica & Quartz",
    heroImage: "/images/quartz.jpg",
    tagline: "Ultra-pure crystalline quartz with >99.5% SiO₂ — manufactured, cut, and crushed to client requirements.",
    shortDesc: "Sourced directly from verified geological veins in the Sabarkantha & Aravalli belts. Hand-sorted and optically calibrated to achieve pristine snow-white brilliance (L* > 96). Can be custom manufactured, cut, crushed, or precision-milled to your exact size, mesh, and dimensional requirements for engineered stone surfaces, optical glass, and semiconductors.",
    grades: ["Optical Snow White (L* > 96)", "Semi-White / Glass Grade", "A-Grade Custom Sized Lumps"],
    origin: "Sabarkantha & Rajasthan Mining Belts, India",
    forms: [
      "Custom-Cut & Sized Lumps (Manufactured & cut to client requirements, 25mm - 150mm)",
      "Precision Calibrated Grits (16-30, 24-60, 30-80 mesh or tailor-made sieve curves)",
      "Micronized Micro-Powder (100 - 500 mesh custom fluid-bed milled)"
    ],
    assays: [
      { element: "Silicon Dioxide (SiO₂)", value: 99.52, unit: "%", minMax: "Min 99.50%" },
      { element: "Ferric Oxide (Fe₂O₃)", value: 0.018, unit: "%", minMax: "Max 0.025%" },
      { element: "Alumina (Al₂O₃)", value: 0.18, unit: "%", minMax: "Max 0.25%" },
      { element: "Titanium Dioxide (TiO₂)", value: 0.01, unit: "%", minMax: "Max 0.02%" },
      { element: "Loss on Ignition (LOI)", value: 0.12, unit: "%", minMax: "Max 0.20%" }
    ],
    physicalProperties: {
      hardness: "7.0 Mohs Scale",
      specificGravity: "2.65 g/cm³",
      moisture: "< 0.2% max",
      whiteness: "96.5% (Reflectance)",
      meshAvailability: "Custom Sized Lumps, 16-30, 24-60, 30-80, 100, 200, 300, 400, 500 Mesh (Custom Cut & Milled)"
    },
    applications: [
      "Engineered Quartz Surface & Countertop Manufacturing",
      "High-Grade Vitrified Ceramic Body & Frit Glazes",
      "Specialty Float Glass, Optical & Solar Tube Glass",
      "Paints, High-Performance Coatings & Silicone Sealants",
      "Foundry Core Sand & Refractory Castables"
    ],
    packaging: [
      "50 kg HDPE / PP bags with inner polyethylene moisture liner",
      "1,000 kg (1 MT) UV-treated Jumbo Bulk Bags with top spout & bottom discharge",
      "1,250 kg Heavy-Duty Jumbo Bags on ISPM-15 Fumigated Wooden Pallets",
      "Custom bulk containerized liners for FCL export dispatches"
    ],
    dispatchLeadTime: "3 to 5 business days from Himatnagar yard",
    portProximity: "Mundra Port (340 km) | Kandla Port (310 km)",
    inStockTonnes: 12500,
    customProcessing: {
      available: true,
      badgeText: "Custom Manufacturing & Cutting to Requirement",
      headline: "Custom Manufacturing, Cutting & Crushing to Client Requirement",
      summary: "We manufacture, cut, crush, and precision-size Snow White Quartz according to your exact plant parameters. Whether you require custom-cut raw lumps for crushing plants, tailored grain distributions for engineered stone slabs, or micro-milled powders, we calibrate every batch to your technical specification.",
      capabilities: [
        "Custom Lump Cutting & Sizing (Cut & graded to client dimensional & thickness specs)",
        "Precision Mesh Sizing (8-16, 16-30, 24-60, 30-80, or tailor-made sieve curves)",
        "Ultra-Fine Micronizing (Fluid-bed milled from 100 up to 500 mesh for engineered quartz)",
        "Optical Sorting & Purity (Elimination of foreign specks to preserve L* > 96 snow-white purity)",
        "Dedicated Custom Batch Production (Tuned to your factory's specific recipe & feed systems)"
      ]
    }
  },
  {
    id: "soda-feldspar",
    name: "Soda Feldspar",
    formula: "NaAlSi₃O₈",
    category: "feldspar",
    categoryLabel: "Feldspar & Flux",
    heroImage: "/images/feldspar.jpg",
    tagline: "High-soda aluminum silicate flux — custom cut, sized, and manufactured to client requirements.",
    shortDesc: "Pristine sodium feldspar with Na₂O content exceeding 10.45% and exceptionally low free iron. Promotes rapid fluxing at lower kiln temperatures, enhances mechanical strength, and imparts high translucency. We manufacture, cut, crush, and mill Soda Feldspar directly to client size and chemistry specifications.",
    grades: ["Super High Soda Grade (Na₂O > 10.5%)", "Standard Ceramic Grade (Na₂O > 9.5%)", "Glass Batch Grade (Custom Sized)"],
    origin: "Sabarkantha & Sirohi Belt, Western India",
    forms: [
      "Custom-Cut & Sized Lumps (Crushed & calibrated to client size requirements, 10mm - 120mm)",
      "Calibrated Chips & Granules (0.5mm - 3mm or tailor-made granular fractions)",
      "Grounded Ceramic Powder (200, 300, 400 mesh or custom milled)"
    ],
    assays: [
      { element: "Sodium Oxide (Na₂O)", value: 10.45, unit: "%", minMax: "Min 10.00%" },
      { element: "Silicon Dioxide (SiO₂)", value: 68.20, unit: "%", minMax: "67.0 - 69.5%" },
      { element: "Alumina (Al₂O₃)", value: 17.80, unit: "%", minMax: "Min 17.00%" },
      { element: "Potassium Oxide (K₂O)", value: 0.65, unit: "%", minMax: "0.40 - 0.90%" },
      { element: "Ferric Oxide (Fe₂O₃)", value: 0.08, unit: "%", minMax: "Max 0.12%" },
      { element: "Loss on Ignition (LOI)", value: 0.40, unit: "%", minMax: "Max 0.50%" }
    ],
    physicalProperties: {
      hardness: "6.0 - 6.5 Mohs",
      specificGravity: "2.61 g/cm³",
      moisture: "< 0.5% max",
      firingColor: "Bright White (No specks)",
      meltingRange: "1150°C - 1220°C",
      meshAvailability: "Custom Sized Lumps, 0.5-3mm Chips, 200, 300, 400 Mesh (Custom Cut & Ground)"
    },
    applications: [
      "Vitrified & Glazed Porcelain Tile Body (Fluxing Agent)",
      "High-End Ceramic Tableware & Bone China",
      "Sanitaryware Bodies & Glaze Compositions",
      "Container Glass & Flat Glass Batch Formulations",
      "Mild Abrasives & Scouring Compounds"
    ],
    packaging: [
      "50 kg PP Woven Bags with PE liner",
      "1,250 kg Jumbo Bags with lifting loops",
      "Bulk Tipper / Dumper delivery for regional ceramic tile clusters (Morbi / Himatnagar)"
    ],
    dispatchLeadTime: "2 to 4 business days",
    portProximity: "Mundra Port (340 km) | Kandla Port (310 km)",
    inStockTonnes: 9800,
    customProcessing: {
      available: true,
      badgeText: "Custom Manufacturing & Cutting to Requirement",
      headline: "Custom Manufacturing, Sizing & Cutting to Client Requirement",
      summary: "We manufacture, cut, crush, and mill Soda Feldspar tailored to your factory's kiln firing parameters and crushing machinery. Available in custom lump cut sizes, granulated chips, or bespoke fine ceramic powders calibrated to your exact specifications.",
      capabilities: [
        "Custom Lump Cutting & Sizing (Calibrated to 10-50mm, 20-80mm, or buyer-specified lump cut sizes)",
        "Granular Sizing & Chips (0.5mm - 3.0mm tailor-made ceramic granulates)",
        "Fine Mesh Milling (200, 300, 400 mesh customized to your tile body or glaze requirements)",
        "High Na₂O (>10.5%) batch formulation processed to client chemistry tolerance",
        "Direct custom lot production for Morbi, Gujarat & international export buyers"
      ]
    }
  },
  {
    id: "bauxite-ore",
    name: "Industrial Bauxite",
    formula: "Al₂O₃ · 2H₂O",
    category: "ores",
    categoryLabel: "Ores & Clays",
    heroImage: "/images/bauxite.jpg",
    tagline: "Alumina-rich metallurgical, chemical, and refractory grade bauxite ore.",
    shortDesc: "High-density natural bauxite with Al₂O₃ content from 42% up to 54%+. Sourced from premier geological formations across Gujarat's coastal and inland belts, rigorously screened for low reactive silica and controlled iron oxide.",
    grades: ["Refractory Grade (Al₂O₃ > 52%)", "Cement Grade (Al₂O₃ 42-46%)", "Chemical & Alum Grade"],
    origin: "Saurashtra & Kutch Mineral Formations, Gujarat",
    forms: ["Run-of-Mine (ROM) Lumps (50mm - 250mm)", "Sized Lumps (10mm - 50mm)", "Fine Aggregates (0 - 10mm)"],
    assays: [
      { element: "Alumina (Al₂O₃)", value: 48.60, unit: "%", minMax: "42.0% - 54.0% Grade Dependent" },
      { element: "Ferric Oxide (Fe₂O₃)", value: 16.20, unit: "%", minMax: "12.0% - 22.0%" },
      { element: "Silicon Dioxide (SiO₂)", value: 3.80, unit: "%", minMax: "Max 5.00% (Reactive <2.5%)" },
      { element: "Titanium Dioxide (TiO₂)", value: 2.80, unit: "%", minMax: "2.0% - 3.5%" },
      { element: "Loss on Ignition (LOI)", value: 24.50, unit: "%", minMax: "22.0% - 28.0%" }
    ],
    physicalProperties: {
      hardness: "3.0 - 4.5 Mohs",
      bulkDensity: "1.45 - 1.65 g/cm³",
      moisture: "3% - 6% natural (dry options available)"
    },
    applications: [
      "Portland & High-Alumina Cement Raw Mix Corrective",
      "High-Alumina Refractory Bricks & Monolithic Castables",
      "Ferric & Non-Ferric Aluminum Sulfate (Alum) Production",
      "Mineral Wool & Synthetic Slag Manufacturing",
      "Road Surfacing Anti-Skid Aggregates"
    ],
    packaging: [
      "Loose Bulk in Heavy Tippers (25 - 40 MT loads)",
      "1.0 MT - 1.25 MT Heavy Duty Jumbo Bags for export",
      "Vessel / Barge bulk breakbulk loading arrangements"
    ],
    dispatchLeadTime: "Bulk rakes & truck fleets within 48-72 hours",
    portProximity: "Mundra Port | Kandla Port | Pipavav Port",
    inStockTonnes: 18500
  },
  {
    id: "bentonite-clay",
    name: "Premium Bentonite",
    formula: "Al₂O₃ · 4SiO₂ · H₂O",
    category: "clays",
    categoryLabel: "Industrial Clays",
    heroImage: "/images/bentonite.jpg",
    tagline: "Natural high-swelling Sodium & Calcium Bentonite with superior thixotropic yield.",
    shortDesc: "Montmorillonite-rich bentonite clay featuring exceptional cation exchange capacity, colloidal viscosity, and thermal binding resilience. Formulated to meet strict API 13A drilling and high-pressure foundry mold benchmarks.",
    grades: ["API Spec 13A Drilling Mud Grade", "Foundry Sand Binder Grade", "Piling & Civil Engineering Grade", "Calcium Absorbent Grade"],
    origin: "Kutch & Western Gujarat Bentonite Basins",
    forms: ["Processed Granules / Pellets (1mm - 5mm)", "Ultra-Fine Powder (200 & 300 Mesh)"],
    assays: [
      { element: "Silicon Dioxide (SiO₂)", value: 52.40, unit: "%", minMax: "50.0 - 55.0%" },
      { element: "Alumina (Al₂O₃)", value: 16.80, unit: "%", minMax: "15.0 - 18.5%" },
      { element: "Ferric Oxide (Fe₂O₃)", value: 9.80, unit: "%", minMax: "8.0 - 12.0%" },
      { element: "Sodium Oxide (Na₂O)", value: 2.60, unit: "%", minMax: "2.0 - 3.2%" },
      { element: "Calcium Oxide (CaO)", value: 1.40, unit: "%", minMax: "1.0 - 2.0%" },
      { element: "Loss on Ignition (LOI)", value: 11.20, unit: "%", minMax: "9.0 - 13.0%" }
    ],
    physicalProperties: {
      swellingIndex: "> 28 - 32 mL/2g",
      liquidLimit: "> 450%",
      marshFunnelViscosity: "38 - 45 seconds (API)",
      gellingIndex: "> 95%",
      phValue: "8.5 - 10.0 (Alkaline)",
      moisture: "8% - 12% max"
    },
    applications: [
      "Oil, Gas & Geothermal Well Drilling Fluids (API 13A)",
      "High-Pressure Automated Foundry Green Sand Casting Binder",
      "Diaphragm Walls, Bored Piles & TBM Tunneling Slurry",
      "Iron Ore Pelletization Binder",
      "Landfill Impermeable Clay Liners & Pond Sealing",
      "Civil Waterproofing Grouting & Agricultural Soil Conditioning"
    ],
    packaging: [
      "25 kg & 50 kg Moisture-Proof HDPE Bags with Inner Polyethylene Liner",
      "1,000 kg & 1,250 kg Heavy Woven Jumbo Bags with discharge spout",
      "Bulk container liner bags for international sea freight"
    ],
    dispatchLeadTime: "Immediate dispatch from processing yard (24-48 hrs)",
    portProximity: "Mundra Port (180 km from Kutch hub) | Kandla Port (140 km)",
    inStockTonnes: 14000
  },
  {
    id: "limestone-calcite",
    name: "Limestone & Calcite",
    formula: "CaCO₃",
    category: "flux",
    categoryLabel: "Feldspar & Flux",
    heroImage: "/images/limestone.jpg",
    tagline: "High-calcium mineral carbonate with >52% CaO and supreme whiteness.",
    shortDesc: "Selected natural sedimentary and crystalline calcite limestone with minimal silica, magnesia, and iron impurities. Delivers exceptional chemical reactivity in steel metallurgical flux, flue gas desulfurization (FGD), and ultra-fine micronized fillers.",
    grades: ["High-Calcium Chemical Grade (CaO > 53%)", "Micronized Calcite (Whiteness > 96%)", "Steel Metallurgy Flux Grade"],
    origin: "Gujarat & Western Mining Corridors",
    forms: ["Screened Lumps (40mm - 120mm)", "Grit / Granules (2mm - 10mm)", "Micronized Powder (300 to 1200 Mesh)"],
    assays: [
      { element: "Calcium Oxide (CaO)", value: 53.40, unit: "%", minMax: "Min 52.00%" },
      { element: "Calcium Carbonate (CaCO₃)", value: 95.30, unit: "%", minMax: "Min 93.00%" },
      { element: "Magnesium Oxide (MgO)", value: 1.20, unit: "%", minMax: "Max 2.00%" },
      { element: "Silicon Dioxide (SiO₂)", value: 1.10, unit: "%", minMax: "Max 1.80%" },
      { element: "Ferric Oxide (Fe₂O₃)", value: 0.15, unit: "%", minMax: "Max 0.30%" },
      { element: "Loss on Ignition (LOI)", value: 42.80, unit: "%", minMax: "41.5 - 43.5%" }
    ],
    physicalProperties: {
      hardness: "3.0 Mohs",
      specificGravity: "2.71 g/cm³",
      brightness: "94% - 97% (Micronized Calcite)",
      phValue: "8.5 - 9.5"
    },
    applications: [
      "Steel Making Basic Oxygen Furnace (BOF) & EAF Fluxing",
      "Paper Coating & Extender Pigment for Opacity",
      "Paints, Masterbatches & Rigid PVC Pipe Stabilizers",
      "Power Plant Flue Gas Desulfurization (FGD Scrubbing)",
      "Glass Batch Refining & Agricultural Soil Acidity Neutralizer"
    ],
    packaging: [
      "50 kg Laminated PP Bags",
      "1,000 kg Jumbo Bags on Pallets",
      "Bulk Dumper / Hopper discharge for heavy industrial plants"
    ],
    dispatchLeadTime: "3 to 4 business days",
    portProximity: "Mundra Port | Kandla Port",
    inStockTonnes: 16000
  },
  {
    id: "laterite-ore",
    name: "Industrial Laterite",
    formula: "Fe₂O₃ · Al₂O₃ · SiO₂",
    category: "ores",
    categoryLabel: "Ores & Clays",
    heroImage: "/images/laterite.jpg",
    tagline: "Natural iron-rich aluminous corrective material for cement clinker and metallurgy.",
    shortDesc: "Vesicular geological laterite high in ferric oxide and alumina, perfectly balanced to serve as an indispensable raw mix corrector in cement kilns, optimizing burnability and phase formation during clinkerization.",
    grades: ["High-Iron Grade (Fe₂O₃ > 45%)", "Aluminous Laterite (Al₂O₃ > 22%)", "Civil Construction Grade"],
    origin: "Western India Lateritic Reserves",
    forms: ["Run-of-Mine Lumps (0 - 150mm)", "Sized Aggregates (10mm - 40mm)"],
    assays: [
      { element: "Ferric Oxide (Fe₂O₃)", value: 44.80, unit: "%", minMax: "38.0% - 50.0%" },
      { element: "Alumina (Al₂O₃)", value: 20.40, unit: "%", minMax: "16.0% - 24.0%" },
      { element: "Silicon Dioxide (SiO₂)", value: 16.50, unit: "%", minMax: "14.0% - 20.0%" },
      { element: "Titanium Dioxide (TiO₂)", value: 2.10, unit: "%", minMax: "1.5% - 3.0%" },
      { element: "Loss on Ignition (LOI)", value: 12.60, unit: "%", minMax: "10.0% - 15.0%" }
    ],
    physicalProperties: {
      bulkDensity: "1.55 - 1.75 g/cm³",
      moisture: "5% - 8% as delivered"
    },
    applications: [
      "Portland Cement Clinker Raw Mix Iron Corrector",
      "Specialty Masonry Mortars & Earth Block Additives",
      "Heavy Duty Highway Sub-Base & Embankment Stabilization",
      "Mineral Pigments for Tile Bodies & Terracotta Products"
    ],
    packaging: [
      "Loose Bulk in Tippers / Trailers (30-45 MT per truck)",
      "1.25 MT Jumbo bags for container export"
    ],
    dispatchLeadTime: "Immediate dispatch capacity up to 500 MT/day",
    portProximity: "Mundra Port | Kandla Port",
    inStockTonnes: 22000
  },
  {
    id: "silica-sand",
    name: "Washed Silica Sand",
    formula: "SiO₂",
    category: "silica",
    categoryLabel: "Silica & Quartz",
    heroImage: "/images/silica-sand.jpg",
    tagline: "Triple-washed, sub-angular to rounded high-silica industrial sand.",
    shortDesc: "Processed through hydro-cyclones, multi-deck vibrating screens, and fluidized bed dryers to eliminate all clay slimes and heavy minerals. Yields uniform particle size distribution curves for foundry molds, water filtration beds, and specialty glass.",
    grades: ["Foundry Moulding Sand (AFS 45-55, AFS 55-65)", "Water Filtration Media (IS:8419 compliant)", "Glass Grade (SiO₂ > 99%)"],
    origin: "Gujarat & Western River Basin Geological Deposits",
    forms: ["Coarse Fraction (16-30 Mesh)", "Medium Fraction (24-60 Mesh)", "Fine Fraction (30-80 Mesh)"],
    assays: [
      { element: "Silicon Dioxide (SiO₂)", value: 99.10, unit: "%", minMax: "Min 98.80%" },
      { element: "Ferric Oxide (Fe₂O₃)", value: 0.038, unit: "%", minMax: "Max 0.050%" },
      { element: "Alumina (Al₂O₃)", value: 0.35, unit: "%", minMax: "Max 0.60%" },
      { element: "Titanium Dioxide (TiO₂)", value: 0.02, unit: "%", minMax: "Max 0.04%" },
      { element: "Loss on Ignition (LOI)", value: 0.18, unit: "%", minMax: "Max 0.30%" }
    ],
    physicalProperties: {
      grainShape: "Sub-angular to rounded",
      clayContent: "< 0.3% (Clean washed)",
      moisture: "< 0.5% dried"
    },
    applications: [
      "High-Pressure Automated Foundry Core & Mould Making",
      "Municipal & Industrial Drinking Water Rapid Gravity Filtration Beds",
      "Container Glass, Flat Glass & Sodium Silicate Production",
      "Epoxy Floor Coatings, Industrial Grouts & Dry Mortars",
      "Golf Course Bunker Sand & Athletic Turf Topdressing"
    ],
    packaging: [
      "50 kg Heavy Duty Polypropylene Bags",
      "1,000 kg and 1,250 kg Jumbo Bags on ISPM-15 Wooden Pallets",
      "Pneumatic tanker delivery available for dry automated silos"
    ],
    dispatchLeadTime: "2 to 4 business days",
    portProximity: "Mundra Port (340 km) | Kandla Port (310 km)",
    inStockTonnes: 11000
  },
  {
    id: "natural-stones",
    name: "Architectural Marble & Granite",
    formula: "Natural Rock",
    category: "stones",
    categoryLabel: "Natural Stones",
    heroImage: "/images/hero-mineral.jpg",
    tagline: "Hand-selected Gujarat and Rajasthan premium granite & marble blocks and slabs.",
    shortDesc: "Dimensional stone blocks, sawn gangsaw slabs, and calibrated cut-to-size tiles. Extracted from premier geological quarries across Western India, celebrated worldwide for dense compressive strength and timeless visual aesthetics.",
    grades: ["First Choice Export Slabs (20mm & 30mm calibrated)", "Gang-Saw Cut Blocks", "Commercial Cut-to-Size Project Tiles"],
    origin: "Sabarkantha, Aravalli & Rajasthan Granite Hubs",
    forms: ["Rough Quarry Blocks (10 - 25 MT each)", "Jumbo Polished Slabs (3000 x 1800 mm)", "Cut to Size (600x600, 800x800, 1200x600 mm)"],
    assays: [
      { element: "Compressive Strength", value: 185, unit: "MPa", minMax: "Min 160 MPa" },
      { element: "Water Absorption", value: 0.15, unit: "%", minMax: "Max 0.25%" },
      { element: "Density", value: 2.68, unit: "g/cm³", minMax: "2.65 - 2.75 g/cm³" },
      { element: "Flexural Strength", value: 16.5, unit: "MPa", minMax: "Min 14.0 MPa" }
    ],
    physicalProperties: {
      finishOptions: "Mirror Polished, Flamed, Leathered, Bush-Hammered, Honed",
      thicknessTolerance: "± 1.0 mm calibrated"
    },
    applications: [
      "Exterior High-Rise Ventilated Facade Cladding",
      "Heavy Traffic Airport, Hotel & Commercial Flooring",
      "Kitchen Island Countertops, Vanity Tops & Tables",
      "Public Monuments, Landscaping Kerbs & Pavers"
    ],
    packaging: [
      "Heavy Sea-Worthy Treated Wooden Bundles / A-Frames",
      "Steel-Reinforced Crates with styrofoam padding",
      "Direct open-top and standard 20ft container stuffing"
    ],
    dispatchLeadTime: "7 to 10 days for slab cutting & bundle bracing",
    portProximity: "Mundra Port | Kandla Port",
    inStockTonnes: 4500
  }
];

export const AMOGH_COMPANY = {
  name: "AMOGH SUPPLY",
  tagline: "Direct-from-Mine Industrial Mineral Procurement & Export",
  established: 2021,
  address: "2351/39, Tulsi Complex, Motipura, Himatnagar, Sabarkantha, Gujarat 383001, India",
  phone: "+91 95869 78999",
  phoneFormatted: "+91 95869 78999",
  whatsappUrl: "https://wa.me/919586978999?text=Hello%20Amogh%20Supply,%20I%20would%20like%20to%20request%20a%20quotation%20and%20technical%20data%20sheet.",
  email: "info@amoghsupply.com",
  operatingHours: "Monday – Saturday: 09:00 AM – 07:00 PM IST",
  location: {
    lat: 23.5979,
    lng: 72.9698,
    city: "Himatnagar",
    district: "Sabarkantha",
    state: "Gujarat",
    country: "India",
    pin: "383001"
  },
  ports: [
    { name: "Mundra Port (Gujarat)", distance: "340 km", roadTime: "12-14 hrs", facilities: "Deep-water container terminal, bulk cargo stuffing" },
    { name: "Kandla / Deendayal Port", distance: "310 km", roadTime: "11-13 hrs", facilities: "Dry bulk handling, breakbulk vessels, container berths" },
    { name: "Pipavav Port", distance: "390 km", roadTime: "14-16 hrs", facilities: "Rail-linked container terminal" }
  ],
  testingPillars: [
    {
      title: "Mine-Head Raw Assay",
      desc: "Every geological lot is core-sampled at origin in Himatnagar and Sabarkantha before transport to ensure uniform deposit strata."
    },
    {
      title: "XRF & Spectroscopic Analysis",
      desc: "Precise quantitative determination of SiO₂, Al₂O₃, Fe₂O₃, and trace alkali oxides down to 10 parts-per-million accuracy."
    },
    {
      title: "Laser Particle Size (PSD)",
      desc: "Laser diffraction analysis (ISO 13320) guarantees exact mesh sizing from coarse 16-mesh grits down to micronized 500-mesh powders."
    },
    {
      title: "Zero Artificial Intermediaries",
      desc: "Institutional buyers are welcome to inspect and handpick mineral batches at our Himatnagar facility prior to contract signing."
    }
  ]
};
