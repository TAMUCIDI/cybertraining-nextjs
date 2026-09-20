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

export type WorkshopBiography = {
  name: string;
  role?: string;
  paragraphs: string[];
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
  biographies?: WorkshopBiography[];
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
    title: "Morgan State University CyberTraining & NAIRR workshop",
    startDate: "2026-03-02",
    endDate: "2026-03-03",
    location: "Morgan State University, Baltimore, Maryland",
    description:
      "This two-day workshop introduced participants to GeoAI and cyberinfrastructure for maritime and fisheries management, NSF ACES, Jetstream2, and NVIDIA deep learning resources. The program also convened a panel on Blue Economy education and brought together collaborators from Morgan State University, Texas A&M University, and the University of Hawaiʻi.",
    photoUrl: "/images/workshops/morgan-state-2026-classroom-cover.jpg",
    photoAlt: "Participants attending the Morgan State University CyberTraining workshop",
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
    title: "CaGIS-National AI Computing Research Resources Workshop",
    startDate: "2026-09-11",
    location:
      "St. Louis Room, Busch Student Center, Saint Louis University, St. Louis, Missouri",
    description:
      "This workshop aims to equip participants with Cyberinfrastructure (CI) and GeoAI skills to advance disaster management and sustainability. Through hands-on training, participants will develop computational skills using national AI computing resources for analyzing large-scale geospatial datasets and translating complex data into actionable scientific insights. Supported by National Science Foundation (NSF)-funded programs under award Nos. 2526748, 2519476, and 2519477.",
    photoUrl: "/images/workshops/cagis-2026-group.png",
    photoAlt: "Participants at the September 11, 2026 CaGIS workshop in St. Louis",
    imageFit: "cover",
    schedule: [
      {
        time: "8:30 - 9:20 am",
        items: [
          "Breakfast and Welcome",
          "Zhe Zhang - Associate Professor, Department of Geography, Texas A&M University",
          "Kari Craun - Executive Director, Cartography and Geographic Information Society; Northwest Missouri State University",
        ],
      },
      {
        time: "9:20 - 10:00 am",
        items: [
          "Keynote Presentation: Disaster Management as a Geospatial Problem",
          "Michael Goodchild - Professor Emeritus, University of California, Santa Barbara",
        ],
      },
      {
        time: "10:00 - 10:10 am",
        items: ["Break"],
      },
      {
        time: "10:10 am - 11:00 am",
        items: [
          "Introduction to the I-GUIDE Platform",
          "Shaowen Wang - Professor, Department of Geography & Geographic Information Science and Siebel School of Computing and Data Science; Associate Dean for Natural and Mathematical Sciences, College of Liberal Arts & Sciences, University of Illinois Urbana-Champaign",
        ],
      },
      {
        time: "11:00 - 11:50 am",
        items: [
          "Texas A&M AI Supercomputing",
          "Honggao Liu - Executive Director of High-Performance Research Computing at Texas A&M University",
        ],
      },
      {
        time: "11:50 am - 12:30 pm",
        items: ["Lunch"],
      },
      {
        time: "12:30 pm - 1:30 pm",
        items: [
          "Research Talks (30 min each)",
          "Budhu Bhaduri - Chief Data Officer, Oak Ridge National Laboratory",
          "Samantha Arundel - Research Director, Center of Excellence for Geospatial Information Science, U.S. Geological Survey",
        ],
      },
      {
        time: "1:30 - 1:40 pm",
        items: ["Break"],
      },
      {
        time: "1:40 - 3:40 pm",
        items: [
          "CyberGeoAI for Disaster Management using NSF ACES and NAIRR",
          "Zhe Zhang - Associate Professor, Department of Geography, Texas A&M University",
          "Zhenhua He - Interim Director for Emerging Technologies and Research at Texas A&M High-Performance Research Computing",
          "Shoibolina Kaushik - Graduate Research Assistant, Department of Geography, Texas A&M University",
          "Yuhang Xie - Graduate Research Assistant, Department of Geography, Texas A&M University",
        ],
      },
      {
        time: "3:40 - 3:50 pm",
        items: ["Break"],
      },
      {
        time: "3:50 - 4:50 pm",
        items: [
          "Discussion",
          "Chair: Zhe Zhang, Associate Professor, Department of Geography, Texas A&M University",
          "Yue Lin - Assistant Professor, Department of Geography & Geographic Information Science, University of Illinois Urbana-Champaign",
          "Peng Luo - Assistant Professor, School of Earth, Environment, and Sustainability, University of Iowa",
          "Caglar Koylu - Associate Professor, School of Earth, Environment, and Sustainability, University of Iowa",
          "Stephen Baker - Senior Research & Evaluation Scientist, Mansueto Institute for Urban Innovation",
        ],
      },
      {
        time: "4:50 pm",
        items: ["Close the Workshop"],
      },
      {
        time: "5:00 pm",
        items: ["Dinner"],
      },
    ],
    biographies: [
      {
        "name": "Zhe Zhang",
        "role": "Associate Professor, Department of Geography, Texas A&M University",
        "paragraphs": [
          "Dr. Zhe Zhang is Associate Professor in the Department of Geography at Texas A&M University, with joint appointments in the Department of Electrical and Computer Engineering and the Texas A&M Hazard Reduction and Recovery Center. Her research develops spatial decision support systems that integrate advanced cyberinfrastructure, geospatial artificial intelligence (GeoAI), and participatory design to address critical challenges in disaster management and sustainability, with funding from NSF, NASA, USDOT, NOAA, and the National Geographic Society. She has served as Chair of the AAG Cyberinfrastructure Specialty Group, was elected to the Board of Directors of the Cartography and Geographic Information Society, and chairs the Research Committee of the University Consortium for Geographic Information Science. She is Co-Principal Investigator of the NSF-funded FASTER supercomputer and Co-Investigator of the ACES supercomputer at Texas A&M, and serves as Principal Investigator on eight externally funded grants totaling over $3 million, including the NSF CyberTraining project supporting today's workshop. Her work appears in leading GIScience journals including the International Journal of Geographical Information Science, Annals of the American Association of Geographers, and Cartography and Geographic Information Science, and she serves as Associate Editor for Computational Urban Science. She has received the Texas A&M Pathways Award, the NSF CAREER Award, and the 2026 Distinguished Contribution Award from Women in GIS and Esri."
        ]
      },
      {
        "name": "Kari Craun",
        "role": "Executive Director for the Cartography and Geographic Information Society",
        "paragraphs": [
          "Ms. Kari Craun is Executive Director of the Cartography and Geographic Information Society. She retired in December 2019 as Director of the USGS National Geospatial Technical Operations Center (NGTOC) after 36 years of federal service as a geospatial professional. As NGTOC Director she was responsible for maintaining seamless, nationally consistent base geospatial data for the United States and led the establishment of the US Topo production program, which automated the generation of more than 55,000 1:24,000-scale topographic maps on a repeating three-year cycle. She is a Past President of both ASPRS and CaGIS, President of the ASPRS Foundation Board of Trustees, an ASPRS Fellow (2012), and the first recipient of the USGS Henry Gannett Award for outstanding contributions to the geospatial community; she has also received the CaGIS Distinguished Career Award and the Department of the Interior Meritorious Service Award. She holds a B.S. in Geology from the University of Missouri-Kansas City, an M.S. in Civil Engineering from Purdue University, and an M.S. in Geospatial Information Science from Northwest Missouri State University."
        ]
      },
      {
        "name": "Michael F. Goodchild",
        "role": "Professor Emeritus of Geography at the University of California, Santa Barbara",
        "paragraphs": [
          "Dr. Michael F. Goodchild is Emeritus Professor of Geography at the University of California, Santa Barbara, where he also holds the title of Research Professor. He is Distinguished Chair Professor at the Hong Kong Polytechnic University and Research Professor at Arizona State University, and holds affiliate, adjunct, and honorary positions at universities around the world. Until 2012, he was Jack and Laura Dangermond Professor of Geography and Director of UCSB's Center for Spatial Studies, and he directed the National Center for Geographic Information and Analysis for more than twenty years. Widely regarded as the father of geographic information science, his research addresses accuracy and uncertainty in spatial data, discrete global grids, and volunteered geographic information, and he has published over 600 books and articles. He holds a BA in Physics from Cambridge, a PhD in Geography from McMaster University, and five honorary doctorates. He was elected a member of the National Academy of Sciences in 2002, the American Academy of Arts and Sciences in 2006, and Foreign Member of the Royal Society and Corresponding Fellow of the British Academy in 2010. In 2003 he received the Founder's Medal of the Royal Geographical Society, and in 2007 the Prix Vautrin Lud, often described as the Nobel Prize of Geography. Recently, in 2025, he received the Cullum Geographical Medal of the American Geographical Society. He is also a Hagler Distinguished Lecturer of the Texas A&M University Institute for Advanced Study."
        ]
      },
      {
        "name": "Shaowen Wang",
        "role": "Professor, Geography & Geographic Information Science / Siebel School of Computing and Data Science; Associate Dean, University of Illinois Urbana-Champaign",
        "paragraphs": [
          "Dr. Shaowen Wang is a Professor in the Department of Geography and Geographic Information Science and the Siebel School of Computing and Data Science at the University of Illinois Urbana-Champaign, where he serves as Associate Dean for Natural and Mathematical Sciences in the College of Liberal Arts and Sciences and as a Senior Faculty Fellow in the Office of the Vice Chancellor for Research and Innovation. He is founding director of the CyberGIS Center for Advanced Digital and Spatial Studies and leads the NSF-funded Institute for Geospatial Understanding through an Integrative Discovery Environment (I-GUIDE). He previously served as Head of the Department of Geography and Geographic Information Science (2017-2023) and as Associate Director of the National Center for Supercomputing Applications for CyberGIS (2010-2017). His research advances cyberGIS, geospatial data science, and spatial AI to develop scalable solutions for complex geospatial problems and sustainability challenges. He served as President of UCGIS (2016-2017) and on the National Academies' Board on Earth Sciences and Resources (2015-2020), and is a Fellow of AAAS, AAG, and UCGIS."
        ]
      },
      {
        "name": "Honggao Liu",
        "role": "Executive Director, High Performance Research Computing (HPRC), Texas A&M University",
        "paragraphs": [
          "Dr. Honggao Liu is Executive Director of Texas A&M High Performance Research Computing, with more than 28 years of experience in research computing, computational and data sciences, and cyberinfrastructure development. He has served as PI or Co-PI on over $35 million in NSF funding and is PI on the NSF FASTER and ACES awards that acquired Texas A&M's composable supercomputers, which are made available to the national research community through the NSF ACCESS program; ACES is also a compute resource of the National AI Research Resource (NAIRR) pilot. He is Co-PI on the NSF award for Broadening Adoption of Cyberinfrastructure and Research Workforce Development for Disaster Management, and previously served as Deputy Director of the Center for Computation and Technology and Director of HPC at Louisiana State University. He received his Ph.D. in Chemical Engineering from LSU in 2002."
        ]
      },
      {
        "name": "Dr. Budhu Bhaduri",
        "role": "Chief Data Officer, Oak Ridge National Laboratory",
        "paragraphs": [
          "Dr. Budhendra \"Budhu\" Bhaduri is Chief Data Officer for Oak Ridge National Laboratory, where he provides executive leadership for an enterprise-wide data and AI strategy, establishes policies for data stewardship, ethics, accessibility, and risk management, and collaborates with DOE's Genesis AI efforts to scale AI-enabled and autonomous science. From 2018 to 2024 he led ORNL's Geospatial Science and Human Security Division, an interdisciplinary portfolio spanning human dynamics, geographic data science, GeoAI, remote sensing, and scalable geocomputation, and from 2014 to 2019 he founded and led ORNL's Urban Dynamics Institute. He is a Fellow of AAAS and AAG, has served on the National Academies' Geographical and Geospatial Sciences and Mapping Science Committees, and is a founding member of DOE's Geospatial Sciences Steering Committee and a recipient of the Department's Outstanding Mentor Award. He holds professorial appointments at the University of Tennessee, Knoxville, and earned his doctorate from Purdue University."
        ]
      },
      {
        "name": "Samantha Arundel",
        "role": "Research Director, Center of Excellence for Geospatial Information Science (CEGIS), U.S. Geological Survey",
        "paragraphs": [
          "Dr. Samantha T. Arundel is Director of the Center of Excellence for Geospatial Information Science and Senior Advisor for Research in the U.S. Geological Survey's National Geospatial Program. Her work focuses on advancing national geospatial infrastructure through artificial intelligence, automation, and large-scale data integration, including efforts to embed AI within The National Map. She chairs the International Cartographic Association Commission on GeoAI and leads the U.S. Federal GeoAI Community of Practice, helping coordinate research and collaboration across government, academia, and industry. Her research connects scientific innovation with operational mapping systems that support natural hazard response, environmental management, and infrastructure planning. She received her Ph.D. in Geography from Arizona State University and was previously an associate professor at Northern Arizona University before joining the USGS in 2009."
        ]
      },
      {
        "name": "Zhenhua He",
        "role": "Interim Director for Emerging Technologies and Research, Research Scientist, High Performance Research Computing (HPRC), Texas A&M University",
        "paragraphs": [
          "Dr. Zhenhua He is Interim Director for Emerging Technologies and Research and a Research Scientist with Texas A&M High Performance Research Computing (HPRC), where he supports the training and research mission of the center and the NSF-funded ACES composable accelerator testbed. He earned his Ph.D. from Texas A&M University, and his expertise centers on machine learning and AI, deep learning frameworks such as PyTorch and TensorFlow, and deploying AI/ML workloads on GPUs and emerging accelerators. He develops and teaches widely attended short courses on AI for high-performance computing that help researchers nationwide harness national cyberinfrastructure through the ACCESS and NAIRR programs. Recently named an NVIDIA Deep Learning Institute Certified Instructor and University Ambassador, he helps bridge domain researchers, including those in GeoAI and coastal resilience science, with the AI technologies and computing resources needed to scale their analyses."
        ]
      },
      {
        "name": "Ms. Shoibolina Kaushik",
        "role": "Graduate Research Assistant, Department of Geography, Texas A&M University",
        "paragraphs": [
          "Ms. Shoibolina Kaushik is a Ph.D. student in Geographic Information Science and Graduate Research Assistant in the Department of Geography at Texas A&M University, and holds a Master's degree in Computer Science from Emory University. Her research focuses on GeoAI, CyberGIS, explainable geospatial AI, and spatial decision support for environmental and public health applications. She previously worked at Emory as an Information Analyst in the Department of Environmental Sciences, contributing to a Gates Foundation-funded project in Ethiopia that developed automated GeoAI pipelines for malaria vector control using remote sensing imagery. During her master's she helped develop a novel GeoAI pipeline that reduced manual feature extraction effort from 300 hours to 9, enabling scalable road network extraction from more than a century of Atlanta's historical maps while preserving road network topology for GIS workflows. Her work emphasizes the use of AI to reduce human effort and enable faster decision support."
        ]
      },
      {
        "name": "Dr. Yue Lin",
        "role": "Assistant Professor, Department of Geography & Geographic Information Science, University of Illinois Urbana-Champaign",
        "paragraphs": [
          "Dr. Yue Lin is an Assistant Professor in the Department of Geography & Geographic Information Science at the University of Illinois Urbana-Champaign, where she directs the Geospatial Computing & Society Lab. She is also a Faculty Affiliate at the National Center for Supercomputing Applications and the Center for Social & Behavioral Science. Her research lies at the intersection of data, computation, and human values, exploring how geospatial computing and artificial intelligence can be designed and used in ways that are ethical and socially responsible, with broader interests in spatial data science, location privacy, and the societal implications of algorithmic systems. She serves on the board of the Cartography and Geographic Information Society, and the editorial boards of Annals of the American Association of Geographers and Digital Geography and Society."
        ]
      },
      {
        "name": "Dr. Peng Luo",
        "role": "Assistant Professor, School of Earth, Environment, and Sustainability, University of Iowa",
        "paragraphs": [
          "Dr. Peng Luo is a tenure-track Assistant Professor in the School of Earth, Environment, and Sustainability at the University of Iowa, where he leads research at the intersection of GIScience, GeoAI, and spatial data science. Previously, he was a postdoctoral researcher at the MIT Senseable City Lab and received his Ph.D. from the Chair of Cartography and Visual Analytics at the Technical University of Munich. His research focuses on Trustworthy GeoAI, with particular interests in spatially explicit modeling, geospatial explainable AI, uncertainty quantification for GeoAI models, and multi-agent GeoAI."
        ]
      },
      {
        "name": "Dr. Caglar Koylu",
        "role": "Associate Professor, School of Earth, Environment, and Sustainability, University of Iowa",
        "paragraphs": [
          "Dr. Caglar Koylu is an Associate Professor in the School of Earth, Environment, and Sustainability at the University of Iowa and a past president of the Cartography and Geographic Information Society. His research in GIScience integrates spatial data science, network analysis, and geovisualization to understand how people, places, and the environment interact across space and time, addressing societal challenges in demography, kinship networks, public health, hazards and social vulnerability, and the environment. His contributions include research on the largest population-scale kinship network in the United States, with 51 million individuals in its largest connected component; CAMSA, a small-area cancer mapping application used by multiple state cancer registries; and Roots & Migrants, an interactive mapping platform for teaching U.S. history. He received his Ph.D. from the University of South Carolina."
        ]
      },
      {
        "name": "Dr. Stephen Baker",
        "role": "Senior Research & Evaluation Scientist, Mansueto Institute for Urban Innovation",
        "paragraphs": [
          "Dr. Stephen Baker is Senior Research & Evaluation Scientist at the Mansueto Institute for Urban Innovation, where he also facilitates the Urban Doctoral Fellowship, a cross-disciplinary doctoral fellows program. A mixed-methods researcher, he has conducted program and policy evaluations at the University of Chicago for over thirty years and has served as principal investigator and project director on evaluations funded by NSF, the Department of Education, and local and national philanthropic foundations, as well as a panel reviewer for NSF and the Department of Education. His recent portfolio has concentrated on STEM education and workforce development, informal learning, and community-based and collaborative policy approaches. He holds master's and doctoral degrees in social policy from the University of Chicago, where he has taught graduate and undergraduate courses in evaluation, research, data management, and U.S. social welfare."
        ]
      }
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
  sourceUrl?: string;
};

export const localNotebooks: LocalNotebook[] = [
  {
    "id": "physics-informed-irrigation",
    "title": "Physics-Informed Geo-AI for Irrigation Quantification",
    "category": "Sustainable water management",
    "author": "Esmaeel Adrah, Daniel Dominguez",
    "fileUrl": "/content/notebooks/physics-informed-irrigation.html",
    "thumbnailUrl": "/images/modules/physics-informed-irrigation.png",
    "sourceUrl": "https://platform.i-guide.io/notebooks/5d89ce8d-1948-494c-8ed5-41d4cb09e39d"
  },
  {
    "id": "flood-depth-machine-learning",
    "title": "Flood Depth Prediction with Geospatial Data Fusion and Machine Learning",
    "category": "Flood hazard assessment",
    "author": "Rufai Omowunmi Balogun, Aleksander Berg, Parnian Ghaneei, Jikun Liu, Temitope Akinboyewa, Xiao Chen, Wen Zhou",
    "fileUrl": "/content/notebooks/flood-depth-machine-learning.html",
    "thumbnailUrl": "/images/modules/flood-depth-machine-learning.jpg",
    "sourceUrl": "https://platform.i-guide.io/notebooks/803168c4-efdd-44c1-8338-1445f16d95e2"
  },
  {
    "id": "flood-depth-data-fusion",
    "title": "Multimodal Geospatial Data Fusion for Flood Depth Prediction",
    "category": "Flood data preparation",
    "author": "Temitope Akinboyewa, Aleksander Berg, Parnian Ghaneei, Rufai Omowunmi Balogun, Jikun Liu, Xiao Chen, Wen Zhou",
    "fileUrl": "/content/notebooks/flood-depth-data-fusion.html",
    "thumbnailUrl": "/images/modules/flood-depth-data-fusion.png",
    "sourceUrl": "https://platform.i-guide.io/notebooks/e8eb5345-2a17-4f2c-9f1c-e1510f995b30"
  },
  {
    "id": "disaster-message-locations",
    "title": "Location Descriptions in Disaster-related Text Messages",
    "category": "Disaster response and GeoAI",
    "author": "Yingjie Hu",
    "fileUrl": "/content/notebooks/disaster-message-locations.html",
    "thumbnailUrl": "/images/modules/disaster-message-locations.png",
    "sourceUrl": "https://platform.i-guide.io/notebooks/f571442f-b7a9-4e75-909f-bb5ff285be6c"
  },

  {
    "id": "california-wildfire-warning",
    "title": "California Wildfire 5-Day Warning Modeling with Random Forest and XGBoost",
    "category": "Wildfire prediction",
    "author": "Ali Khosravi Kazazi, Eric Twum Barima, Yunfan Kang, Simran Koul, Samrin Sauda, Hashir Tanveer, Yuhan Xu",
    "fileUrl": "/content/notebooks/california-wildfire-warning.html",
    "thumbnailUrl": "/images/modules/california-wildfire-warning.png",
    "sourceUrl": "https://platform.i-guide.io/notebooks/e15730fc-085f-4cb6-b1b8-548adda38854"
  },
  {
    "id": "prime-disaster-resilience",
    "title": "PRIME: A CyberGIS Platform for Resilience Inference Measurement and Enhancement",
    "category": "Community disaster resilience",
    "author": "Debayan Mandal, Lei Zou, Rohan Singh Wilkho, Furqan Baig, Joynal Abedin, Bing Zhou, Heng Cai, Nasir Gharaibeh, Nina Lam",
    "fileUrl": "/content/notebooks/prime-disaster-resilience.html",
    "thumbnailUrl": "/images/modules/prime-disaster-resilience.jpg",
    "sourceUrl": "https://platform.i-guide.io/notebooks/23422705-aad7-4e00-b3d5-1df64125c429"
  },
  {
    "id": "wildfire-transportation-unet",
    "title": "Wildfire Threat Detection for Transportation Infrastructure using U-Net for Semantic Segmentation",
    "category": "Wildfire and infrastructure resilience",
    "author": "Carey Whitehair-Conde, Jeremiah Huggins, Matthew Prebble, Joel Diaz, John Crissman, Lars Hanson, Shaun Williams, Steven Habicht",
    "fileUrl": "/content/notebooks/wildfire-transportation-unet.html",
    "thumbnailUrl": "/images/modules/wildfire-transportation-unet.jpeg",
    "sourceUrl": "https://platform.i-guide.io/notebooks/ae64d94a-99ce-473b-9df9-224dc13c240b"
  },
  {
    "id": "hydraulic-graph-neural-networks",
    "title": "Multi-scale hydraulic graph neural networks for flood modelling",
    "category": "Flood modeling and GeoAI",
    "author": "Roberto Bentivoglio, Elvin Isufi, Sebastiaan Nicolas Jonkman, Riccardo Taormina",
    "fileUrl": "/content/notebooks/hydraulic-graph-neural-networks.html",
    "thumbnailUrl": "/images/modules/hydraulic-graph-neural-networks.png",
    "sourceUrl": "https://platform.i-guide.io/notebooks/d15bf2db-e427-4fd0-9961-996b72f0f537"
  },
  {
    "id": "dam-risk-interactive-maps",
    "title": "From Dam Risk Metrics to Interactive Maps: A Hands-on Jupyter Tutorial for Open Geospatial REST APIs",
    "category": "Dam risk and geospatial analysis",
    "author": "Jungha Woo, Xiao Liu, Erick Li, Michael Englert",
    "fileUrl": "/content/notebooks/dam-risk-interactive-maps.html",
    "thumbnailUrl": "/images/modules/dam-risk-interactive-maps.jpg",
    "sourceUrl": "https://platform.i-guide.io/notebooks/f711f98c-105c-41ef-bfc3-c6532a5a5b86"
  },
  {
    "id": "cdc-social-vulnerability",
    "title": "An exploration of the Centers for Disease Control (CDC) Social Vulnerability Index (SVI) dataset",
    "category": "Social vulnerability and preparedness",
    "author": "Daniel Kiv",
    "fileUrl": "/content/notebooks/cdc-social-vulnerability.html",
    "thumbnailUrl": "/images/modules/cdc-social-vulnerability.png",
    "sourceUrl": "https://platform.i-guide.io/notebooks/791fa878-e227-4953-b07d-1fbb5176ace5"
  },

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
    title: "Using ACES for Port Operation Resilience under Coastal Hazards",
    author: "Shoibolina Kaushik and Zhe Zhang",
    category: "Coastal hazards and port resilience",
    fileUrl:
      "/content/notebooks/port-infrastructure-resilience-coastal-hazards.html",
    thumbnailUrl:
      "/images/modules/port-operation-resilience-aces-cover.jpg",
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

export type LocalTeamMember = {
  name: string;
  affiliation: string;
  displayRole?: string;
  email?: string;
  img: string;
  profileUrl: string;
};

export const officialProfileUrls: Record<string, string> = {
  "Michael Goodchild":
    "https://www.geog.ucsb.edu/people/faculty/michael-goodchild",
  "Angela Yao": "https://geography.uga.edu/directory/people/angela-yao",
  "Zhe Zhang":
    "https://artsci.tamu.edu/geography/contact/profiles/zhesarina-zhang.html",
  "Honggao Liu": "https://hprc.tamu.edu/about/staff/honggao-liu.html",
  "Shaowen Wang": "https://ggis.illinois.edu/directory/profile/shaowen",
  "Liqiu Meng": "https://www.professoren.tum.de/en/meng-liqiu/",
  "Xinyue Ye": "https://geography.ua.edu/people/xinyue-ye/",
  "Chanam Lee": "https://www.arch.tamu.edu/directory/chanam-lee/",
  "Nick Duffield":
    "https://engineering.tamu.edu/electrical/profiles/duffield-nick.html",
  "Yuqin Jiang": "https://geography.manoa.hawaii.edu/yuqin-jiang/",
  "Stephen Baker": "https://miurban.uchicago.edu/bio_stephen-baker/",
  "Zhuping Sheng":
    "https://www.morgan.edu/civil-and-environmental-engineering/faculty-and-staff/dr-zhuping-sheng",
  "Shelley Knuth": "https://www.colorado.edu/rc/about/knuth",
  "Lori Peek": "https://www.colorado.edu/sociology/our-people/lori-peek",
  "Tim Cockerill": "https://tacc.utexas.edu/about/staff-directory/tim-cockerill/",
  "Joseph Kerski": "https://www.josephkerski.com",
  "Samantha Arundel": "https://www.usgs.gov/staff-profiles/samantha-t-arundel",
  "Amy Rock": "https://www.humboldt.edu/geography/amy-rock",
  "Jorge Brenner": "https://gcoos.org/team-showcase/jorge-brenner/",
  "Tao Cheng": "https://profiles.ucl.ac.uk/10774-tao-cheng",
  "Xiao Li": "https://www.tsu.ox.ac.uk/people/xli.html",
  "Aron Larsson": "https://www.miun.se/en/personnel/l/aronlarsson/",
  "Huilin Gao": "https://engineering.tamu.edu/civil/profiles/hgao.html",
  "Lingli Zhu":
    "https://www.maanmittauslaitos.fi/en/research/research/centre-excellence-laser-scanning-research/people",
  "Henrikki Tenkanen": "https://www.aalto.fi/en/people/henrikki-tenkanen",
  "Jukka Krisp":
    "https://www.uni-augsburg.de/en/fakultaet/fai/geo/prof/geoagi/geoagi-team/j-krisp/",
  "Changjie Cai":
    "https://publichealth.ouhsc.edu/about/who-we-are/details/changjie-cai-phd",
};

export function getOfficialProfileUrl(name: string, fallback?: string) {
  return officialProfileUrls[name] ?? fallback;
}

export const officialEmails: Record<string, string> = {
  "Michael Goodchild": "good@geog.ucsb.edu",
  "Angela Yao": "xyao@uga.edu",
  "Zhe Zhang": "zhezhang@tamu.edu",
  "Honggao Liu": "honggao@tamu.edu",
  "Shaowen Wang": "shaowen@illinois.edu",
  "Liqiu Meng": "liqiu.meng@tum.de",
  "Xinyue Ye": "xye10@ua.edu",
  "Chanam Lee": "chanam@tamu.edu",
  "Nick Duffield": "duffieldng@tamu.edu",
  "Yuqin Jiang": "yuqinj@hawaii.edu",
  "Stephen Baker": "bak5@uchicago.edu",
  "Zhuping Sheng": "zhuping.sheng@morgan.edu",
  "Shelley Knuth": "shelley.knuth@colorado.edu",
  "Lori Peek": "Lori.Peek@colorado.edu",
  "Tim Cockerill": "cockerill@tacc.utexas.edu",
  "Joseph Kerski": "jkerski@esri.com",
  "Samantha Arundel": "sarundel@usgs.gov",
  "Amy Rock": "arock@ucgis.org",
  "Jorge Brenner": "jorge.brenner@gcoos.org",
  "Tao Cheng": "tao.cheng@ucl.ac.uk",
  "Xiao Li": "xiao.li@ouce.ox.ac.uk",
  "Aron Larsson": "aron.larsson@miun.se",
  "Huilin Gao": "hgao@civil.tamu.edu",
  "Lingli Zhu": "lingli.zhu@nls.fi",
  "Henrikki Tenkanen": "henrikki.tenkanen@aalto.fi",
  "Jukka Krisp": "jukka.krisp@geo.uni-augsburg.de",
  "Changjie Cai": "Changjie-Cai@ouhsc.edu",
};

export function getOfficialEmail(name: string, fallback?: string) {
  return officialEmails[name] ?? fallback;
}

export const localProjectLeadershipMembers: LocalTeamMember[] = [
];

export const localAdvisoryMembers: LocalTeamMember[] = [
  {
    name: "Michael Goodchild",
    affiliation:
      "Distinguished Professor Emeritus, Department of Geography, University of California, Santa Barbara",
    email: "good@geog.ucsb.edu",
    img: "/images/team/michael-goodchild.jpg",
    profileUrl:
      "https://www.geog.ucsb.edu/people/faculty/michael-goodchild",
  },
  {
    name: "Angela Yao",
    affiliation: "Professor of Geography, University of Georgia",
    email: "xyao@uga.edu",
    img: "/images/team/angela-yao.jpg",
    profileUrl: "https://geography.uga.edu/directory/people/angela-yao",
  },
  {
    name: "Liqiu Meng",
    affiliation: "Professor of Cartography, Technical University of Munich",
    email: "liqiu.meng@tum.de",
    img: "/images/team/liqiu-meng.jpg",
    profileUrl: "https://www.professoren.tum.de/en/meng-liqiu/",
  },
  {
    name: "Xinyue Ye",
    affiliation:
      "Endowed Shelby Distinguished Professor of GeoAI, University of Alabama",
    email: "xye10@ua.edu",
    img: "/images/team/xinyue-ye.jpg",
    profileUrl: "https://geography.ua.edu/people/xinyue-ye/",
  },
  {
    name: "Chanam Lee",
    affiliation:
      "Professor and Executive Associate Dean, College of Architecture, Texas A&M University",
    email: "chanam@tamu.edu",
    img: "/images/team/chanam-lee.jpg",
    profileUrl: "https://www.arch.tamu.edu/directory/chanam-lee/",
  },
  {
    name: "Nick Duffield",
    affiliation:
      "Professor of Electrical and Computer Engineering and Director, Texas A&M Institute of Data Science",
    email: "duffieldng@tamu.edu",
    img: "/images/team/nick-duffield.jpg",
    profileUrl:
      "https://engineering.tamu.edu/electrical/profiles/duffield-nick.html",
  },
  {
    name: "Yuqin Jiang",
    affiliation:
      "Assistant Professor, Department of Geography and Environment, University of Hawaiʻi at Mānoa",
    email: "yuqinj@hawaii.edu",
    img: "/images/team/yuqin-jiang.jpg",
    profileUrl: "https://geography.manoa.hawaii.edu/yuqin-jiang/",
  },
  {
    name: "Stephen Baker",
    affiliation:
      "Urban Doctoral Fellows Coordinator, Mansueto Institute for Urban Innovation; Senior Research & Evaluation Scientist, Outlier Research and Evaluation at UChicago STEM",
    email: "bak5@uchicago.edu",
    img: "/images/team/stephen-baker.jpg",
    profileUrl: "https://miurban.uchicago.edu/bio_stephen-baker/",
  },
];
