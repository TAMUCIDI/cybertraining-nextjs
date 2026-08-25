export type WorkshopScheduleItem = {
  time: string;
  items: string[];
};

export type WorkshopResource = {
  label: string;
  url: string;
};

export type WorkshopGalleryImage = {
  src: string;
  alt: string;
};

export type LocalWorkshop = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  photoUrl?: string;
  photoAlt?: string;
  imageFit?: "cover" | "contain";
  schedule: WorkshopScheduleItem[];
  resources?: WorkshopResource[];
  gallery?: WorkshopGalleryImage[];
  registration?: WorkshopResource;
};

export const localWorkshops: LocalWorkshop[] = [
  {
    id: "i-guide-forum-2025",
    title: "I-GUIDE Forum 2025",
    startDate: "2025-06-17",
    endDate: "2025-06-19",
    location: "Chicago, Illinois",
    description:
      "The CyberTraining team participated in the 2025 I-GUIDE Forum, Geospatial AI and Innovation for Sustainability Solutions. The forum brought together researchers, educators, cyberinfrastructure specialists, and practitioners to share geospatial AI approaches for sustainability and resilience. The team contributed a hands-on CyberTraining workshop on cyberinfrastructure for disaster management.",
    photoUrl: "/images/workshops/i-guide-forum-2025.jpg",
    photoAlt: "CyberTraining presentation at the 2025 I-GUIDE Forum",
    imageFit: "contain",
    schedule: [
      {
        time: "June 17, 1:30 - 5:15 pm",
        items: [
          "CyberTraining: Broadening Adoption of Cyberinfrastructure and Geospatial Science Research and Workforce for Disaster Management",
          "Instructors: Zhe Zhang, Shaowen Wang, and Honggao Liu",
        ],
      },
    ],
  },
  {
    id: "agu25-town-hall",
    title: "AGU25 Town Hall: CyberTraining for Disaster Management",
    startDate: "2025-12-16",
    location: "New Orleans, Louisiana",
    description:
      "The AGU25 Town Hall highlighted NSF-funded CyberTraining activities that broaden access to cyberinfrastructure, geospatial data science, and GeoAI for disaster management. Researchers, educators, and practitioners discussed workforce development, capacity building, and the use of advanced computing resources to support more resilient communities.",
    photoUrl: "/images/workshops/agu-town-hall-2025.jpeg",
    photoAlt: "Participants at the AGU25 CyberTraining Town Hall",
    schedule: [
      {
        time: "December 16, 1:00 - 2:00 pm",
        items: [
          "Town Hall: CyberTraining - Broadening Adoption of Cyberinfrastructure and Geospatial Science for Disaster Management",
        ],
      },
    ],
    resources: [
      {
        label: "View Town Hall Presentation",
        url: "/content/workshops/agu-town-hall-2025-presentation.pdf",
      },
    ],
  },
  {
    id: "morgan-state-workshop-2026",
    title: "Morgan State University CyberTraining Workshop",
    startDate: "2026-03-02",
    endDate: "2026-03-03",
    location: "Morgan State University, Baltimore, Maryland",
    description:
      "This two-day workshop introduced participants to GeoAI and cyberinfrastructure for maritime and fisheries management, NSF ACES, Jetstream2, and NVIDIA deep learning resources. The program also convened a panel on Blue Economy education and brought together collaborators from Morgan State University, Texas A&M University, and the University of Hawaiʻi.",
    photoUrl: "/images/workshops/morgan-state-2026-cover.jpeg",
    photoAlt: "Morgan State University workshop participants",
    schedule: [
      {
        time: "March 2, 8:30 - 9:00 am",
        items: ["Introduction to the project"],
      },
      {
        time: "March 2, 9:00 - 10:00 am",
        items: [
          "Keynote",
          "Dr. Sharmistha Bagchi-Sen, Program Manager, National Science Foundation",
        ],
      },
      {
        time: "March 2, 10:00 - 11:20 am",
        items: [
          "GeoAI and CI-Based Training for Maritime and Fisheries Management",
          "Dr. Zhe Zhang, Texas A&M University",
          "Mr. Jinyu Zhou, Texas A&M University",
        ],
      },
      {
        time: "March 2, 11:20 - 11:30 am",
        items: ["Break"],
      },
      {
        time: "March 2, 11:30 am - 12:20 pm",
        items: [
          "Panel - Blue Economy Education: Challenges and Opportunities",
          "Chair: Dr. Zhe Zhang, Texas A&M University",
          "Panelists: Dr. Chunlei Fan, Dr. Zhuping Sheng, Dr. Anthony Filippi, and Dr. Sean Cleveland",
        ],
      },
      {
        time: "March 2, 12:20 - 1:00 pm",
        items: ["Lunch"],
      },
      {
        time: "March 2, 1:00 - 2:20 pm",
        items: [
          "ACES Training",
          "Dr. Honggao Liu and Dr. Zhenhua He, Texas A&M High Performance Research Computing",
        ],
      },
      {
        time: "March 2, 2:20 - 2:30 pm",
        items: ["Break"],
      },
      {
        time: "March 2, 2:30 - 4:00 pm",
        items: [
          "Jetstream2 Training",
          "Dr. Sean Cleveland, University of Hawaiʻi",
        ],
      },
      {
        time: "March 2, 4:00 pm",
        items: ["Round-table discussion and workshop closing"],
      },
      {
        time: "March 3",
        items: [
          "NVIDIA Deep Learning Institute",
          "Dr. Zhenhua He, Certified NVIDIA Deep Learning Institute Instructor",
        ],
      },
    ],
    resources: [
      {
        label: "View Workshop Agenda",
        url: "/content/workshops/morgan-state-2026-agenda.pdf",
      },
    ],
    gallery: [
      {
        src: "/images/workshops/morgan-state-2026-session.jpeg",
        alt: "Participants attending the Morgan State University workshop",
      },
    ],
  },
  {
    id: "ucgis-2026-nairr-workshop",
    title: "UCGIS 2026: CyberTraining with NAIRR Workshop",
    startDate: "2026-06-15",
    location: "University of Maryland, College Park, Maryland",
    description:
      "Part of the UCGIS 2026 Symposium, AI Everywhere!, this workshop combined I-GUIDE, NSF ACCESS, NAIRR, and GeoAI perspectives for research and education. The program included platform training, invited lightning talks, and a hands-on session on coastal resilience and sustainability.",
    photoUrl: "/images/workshops/ucgis-2026-group.jpg",
    photoAlt: "Participants at the UCGIS 2026 CyberTraining workshop",
    schedule: [
      {
        time: "8:30 - 9:30 am",
        items: ["Breakfast and Welcome", "Dr. Zhe Zhang, Texas A&M University"],
      },
      {
        time: "9:30 - 10:30 am",
        items: [
          "Introduction to the I-GUIDE Platform",
          "Dr. Shaowen Wang, University of Illinois Urbana-Champaign",
        ],
      },
      {
        time: "10:30 - 10:40 am",
        items: ["Break"],
      },
      {
        time: "10:40 am - 12:00 pm",
        items: [
          "Lightning Talks (Session I)",
          "Dr. Samantha Arundel, Dr. Shih-Lung Shaw, Dr. Steven Manson, and Ms. Shoibolina Kaushik",
        ],
      },
      {
        time: "12:00 - 12:45 pm",
        items: ["Lunch provided by the project"],
      },
      {
        time: "12:45 - 2:30 pm",
        items: [
          "NSF ACCESS for Enhancing Coastal Resilience and Sustainability",
          "Dr. Zhe Zhang, Dr. Honggao Liu, Dr. Zhenhua He, and Mr. Yuan Niu",
        ],
      },
      {
        time: "2:30 - 2:40 pm",
        items: ["Break"],
      },
      {
        time: "2:40 - 4:00 pm",
        items: [
          "Lightning Talks (Session II)",
          "Dr. Diya Li, Dr. Kumar Navulur, Dr. Kai Zhang, Dr. Zhuping Sheng, and Dr. Chang Liu",
        ],
      },
      {
        time: "4:00 pm",
        items: ["Close of the Workshop"],
      },
    ],
    resources: [
      {
        label: "View Full Workshop Program",
        url: "/content/workshops/ucgis-2026-program.pdf",
      },
    ],
  },
  {
    id: "nvidia-deep-learning-training-2026",
    title: "NVIDIA Deep Learning Institute Training Workshop",
    startDate: "2026-08-20",
    location:
      "O&M Building, Room 112, Texas A&M University, College Station, Texas",
    description:
      "This all-day workshop combined NVIDIA Deep Learning Institute training with presentations on Texas A&M AI supercomputing, GEOINT and AI, and intelligent national mapping infrastructure. Participants who attended all sessions and completed the training were eligible to receive NVIDIA's official deep learning certification.",
    photoUrl:
      "/images/workshops/nvidia-deep-learning-training-2026.jpg",
    photoAlt:
      "Participants at the 2026 NVIDIA Deep Learning Institute training workshop",
    schedule: [
      {
        time: "8:00 - 8:20 am",
        items: [
          "Welcome Breakfast",
          "Dr. Zhe Zhang, Associate Professor, Department of Geography, Texas A&M University",
        ],
      },
      {
        time: "8:20 - 8:35 am",
        items: [
          "Presentation: Texas A&M AI Supercomputing",
          "Dr. Honggao Liu, Executive Director, Texas A&M High Performance Research Computing",
        ],
      },
      {
        time: "8:35 - 8:50 am",
        items: [
          "Presentation: GEOINT and AI",
          "Dr. Elizabeth Sherman, Professor of Practice, Department of Geography, Texas A&M University",
        ],
      },
      {
        time: "8:50 - 9:00 am",
        items: ["Break"],
      },
      {
        time: "9:00 am - 12:00 pm",
        items: [
          "NVIDIA Deep Learning Institute Training",
          "Dr. Zhenhua He, Interim Director for Emerging Technologies and Research, Texas A&M High Performance Research Computing",
        ],
      },
      {
        time: "12:00 - 12:30 pm",
        items: ["Lunch"],
      },
      {
        time: "12:30 - 12:45 pm",
        items: [
          "Presentation: From GeoAI Models to Intelligent National Mapping Infrastructure",
          "Dr. Samantha Arundel, Research Director, Center of Excellence for Geospatial Information Science, U.S. Geological Survey",
        ],
      },
      {
        time: "12:45 - 6:00 pm",
        items: [
          "NVIDIA Deep Learning Institute Training",
          "Dr. Zhenhua He, Interim Director for Emerging Technologies and Research, Texas A&M High Performance Research Computing",
        ],
      },
      {
        time: "6:00 pm",
        items: ["Close of the Workshop"],
      },
    ],
  },
  {
    id: "cagis-2026-cybertraining-workshop",
    title: "CaGIS 2026 CyberTraining Workshop",
    startDate: "2026-09-11",
    location:
      "Busch Student Center, Saint Louis University, St. Louis, Missouri",
    description:
      "This all-day workshop will establish a cyberinfrastructure-powered GeoAI research network for disaster and coastal sustainability management. It will build foundational computational literacy for analyzing large-scale disaster and oceanography datasets and producing scientific outcomes.",
    photoUrl: "/images/workshops/cagis-2026.jpg",
    photoAlt: "CaGIS 2026 Conference in St. Louis",
    imageFit: "contain",
    schedule: [
      {
        time: "All day",
        items: [
          "Fundamentals of cyberinfrastructure and high-performance computing, including NSF ACCESS and NAIRR resources",
          "Scientific programming in Python using JupyterLab",
          "Disaster and coastal science data processing and visualization techniques",
          "Geospatial analysis for disaster and coastal sustainability management",
          "Organizers: Zhe Zhang, Shaowen Wang, Honggao Liu, and Zhenhua He",
        ],
      },
    ],
    registration: {
      label: "Workshop Information and Registration",
      url: "https://cartogis.org/conferences/cagis2026/workshops/",
    },
  },
  {
    id: "harvard-cga-nairr-workshop-2026",
    title: "National AI Computing Research Resources Workshop at Harvard CGA",
    startDate: "2026-10-02",
    location: "David Rubenstein Treehouse, Harvard University",
    description:
      "This upcoming workshop will introduce National AI Computing Research Resources in connection with the 2026 Harvard University Center for Geographic Analysis Conference. Travel-grant details and the application are available through the linked form.",
    photoUrl: "/images/workshops/harvard-cga-logo.svg",
    photoAlt: "Harvard University Center for Geographic Analysis logo",
    imageFit: "contain",
    schedule: [],
    registration: {
      label: "Travel Grant Details and Application",
      url: "https://forms.gle/1YF6PBDmLERShi8Z7",
    },
  },
  {
    id: "university-of-hawaii-workshop-2026",
    title: "University of Hawaiʻi CyberTraining Workshop",
    startDate: "2026-10-19",
    endDate: "2026-10-20",
    location: "University of Hawaiʻi",
    description:
      "A two-day CyberTraining workshop is planned at the University of Hawaiʻi. Additional program, venue, and registration information will be posted when available.",
    photoUrl: "/images/workshops/university-of-hawaii-manoa-logo.png",
    photoAlt: "University of Hawaiʻi at Mānoa logo",
    imageFit: "contain",
    schedule: [],
  },
];

export function getLocalWorkshop(id: string) {
  return localWorkshops.find((workshop) => workshop.id === id);
}

const workshopDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function parseWorkshopDate(date: string) {
  return new Date(`${date}T12:00:00Z`);
}

export function formatWorkshopDate(startDate: string, endDate?: string) {
  const start = parseWorkshopDate(startDate);
  if (!endDate || endDate === startDate) {
    return workshopDateFormatter.format(start);
  }

  const end = parseWorkshopDate(endDate);
  if (
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth()
  ) {
    const month = new Intl.DateTimeFormat("en-US", {
      month: "long",
      timeZone: "UTC",
    }).format(start);
    return `${month} ${start.getUTCDate()}-${end.getUTCDate()}, ${start.getUTCFullYear()}`;
  }

  return `${workshopDateFormatter.format(start)} - ${workshopDateFormatter.format(end)}`;
}

export function isUpcomingWorkshop(startDate: string, endDate?: string) {
  const finalDate = parseWorkshopDate(endDate || startDate);
  finalDate.setUTCHours(23, 59, 59, 999);
  return finalDate.getTime() >= Date.now();
}

export type LocalNotebook = {
  id: string;
  title: string;
  category: string;
  author?: string;
  fileUrl: string;
  thumbnailUrl: string;
};

export const localNotebooks: LocalNotebook[] = [
  {
    id: "cybertraining-nairr-tutorial-2026",
    title: "CyberTraining & NAIRR Tutorial",
    category: "Advancing GeoAI using I-GUIDE and NAIRR",
    author: "Zhe Zhang, Honggao Liu, and Shaowen Wang",
    fileUrl: "/content/notebooks/cybertraining-nairr-tutorial-2026.pdf",
    thumbnailUrl: "/images/modules/cybertraining-nairr-tutorial-2026-cover.png",
  },
  {
    id: "port-infrastructure-resilience-coastal-hazards",
    title: "Port Infrastructure Resilience under Coastal Hazards",
    category: "Coastal hazards and port resilience",
    fileUrl:
      "/content/notebooks/port-infrastructure-resilience-coastal-hazards.html",
    thumbnailUrl:
      "/images/modules/port-infrastructure-resilience-coastal-hazards-cover.png",
  },
  {
    id: "maritime-traffic-disruption-hurricane-harvey",
    title: "GeoAI for Maritime Traffic Disruption During Hurricane Harvey (2017)",
    category: "GeoAI and maritime disaster analysis",
    author: "Jinyu Zhou and Zhe Zhang",
    fileUrl:
      "/content/notebooks/maritime-traffic-disruption-hurricane-harvey.html",
    thumbnailUrl:
      "/images/modules/maritime-traffic-disruption-hurricane-harvey-cover.png",
  },
  {
    id: "fish-habitat-suitability-modeling",
    title: "GeoAI for Fish Habitat Suitability Modeling",
    category: "GeoAI and fisheries management",
    author: "Jinyu Zhou and Zhe Zhang",
    fileUrl: "/content/notebooks/fish-habitat-suitability-modeling.html",
    thumbnailUrl: "/images/modules/fish-habitat-suitability-modeling-cover.png",
  },
];

export function getLocalNotebook(id: string) {
  return localNotebooks.find((notebook) => notebook.id === id);
}

export type LocalAdvisoryMember = {
  name: string;
  affiliation: string;
  displayRole?: string;
  img: string;
  profileUrl: string;
};

export const localAdvisoryMembers: LocalAdvisoryMember[] = [
  {
    name: "Michael Goodchild",
    displayRole: "Co-I and Evaluator",
    affiliation:
      "Distinguished Professor Emeritus, Department of Geography, University of California, Santa Barbara",
    img: "/images/team/michael-goodchild.jpg",
    profileUrl:
      "https://www.thebritishacademy.ac.uk/fellows/profiles/michael-goodchild-FBA/",
  },
  {
    name: "Liqiu Meng",
    affiliation: "Professor of Cartography, Technical University of Munich",
    img: "/images/team/liqiu-meng.jpg",
    profileUrl: "https://www.professoren.tum.de/en/meng-liqiu/",
  },
  {
    name: "Xinyue Ye",
    affiliation:
      "Endowed Shelby Distinguished Professor of GeoAI, University of Alabama",
    img: "/images/team/xinyue-ye.jpg",
    profileUrl: "https://geography.ua.edu/people/xinyue-ye/",
  },
  {
    name: "Chanam Lee",
    affiliation:
      "Professor and Executive Associate Dean, College of Architecture, Texas A&M University",
    img: "/images/team/chanam-lee.jpg",
    profileUrl: "https://www.arch.tamu.edu/directory/chanam-lee/",
  },
  {
    name: "Nick Duffield",
    affiliation:
      "Professor of Electrical and Computer Engineering and Director, Texas A&M Institute of Data Science",
    img: "/images/team/nick-duffield.jpg",
    profileUrl:
      "https://engineering.tamu.edu/electrical/profiles/duffield-nick.html",
  },
  {
    name: "Yuqin Jiang",
    affiliation:
      "Assistant Professor, Department of Geography and Environment, University of Hawaiʻi at Mānoa",
    img: "/images/team/yuqin-jiang.jpg",
    profileUrl: "https://geography.manoa.hawaii.edu/yuqin-jiang/",
  },
];
