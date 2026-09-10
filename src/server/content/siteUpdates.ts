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
    title: "Morgan State University CyberTraining Workshop",
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
    photoUrl: "/images/workshops/cagis-2026.jpg",
    photoAlt: "CaGIS 2026 Conference in St. Louis",
    imageFit: "contain",
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
          "Yuan Niu - Graduate Research Assistant, Department of Geography, Texas A&M University",
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
          "Dr. Zhe Zhang is an Associate Professor in the Department of Geography at Texas A&M University (TAMU), with joint appointments in the Department of Electrical and Computer Engineering and the Texas A&M Hazard Reduction and Recovery Center. She is also a member of the Gulf of America Coastal Ocean Observing System. Dr. Zhang has served as Chair of the Cyberinfrastructure Specialty Group of the American Association of Geographers and was elected to the Board of Directors of the Cartography and Geographic Information Society. She also serves as Chair of the Research Committee of the University Consortium for Geographic Information Science. Her research focuses on developing spatial decision support systems by integrating advanced cyberinfrastructure, geospatial artificial intelligence (GeoAI), and participatory design to address critical challenges in disaster management and sustainability. Her research has been funded by several federal agencies such as the National Science Foundation (NSF), National Aeronautics and Space Administration (NASA), U.S. Department of Transportation (USDOT), National Oceanic and Atmospheric Administration (NOAA), and the National Geographic Society. Dr. Zhang serves as the Co-Principal Investigator of the Texas A&M FASTER High-Performance Supercomputer and as a Co-Investigator of the Texas A&M ACES Supercomputer, both supported by the NSF. In addition, she serves as Principal Investigator on eight externally funded grants, totaling over $3 million. She has published peer reviewed articles in several leading GIS-related journals, including the International Journal of Geographical Information Science, Annals of the American Association of Geographers, Transactions in GIS, Cartography and Geographic Information Science, and the International Journal of Digital Earth. She currently serves as an Associate Editor for the journal Computational Urban Science. Dr. Zhang has been honored to receive both the Pathways Award from Texas A&M Faculty Affairs and the National Science Foundation CAREER Award in recognition of her impactful research."
        ]
      },
      {
        "name": "Honggao Liu",
        "role": "Executive Director, High Performance Research Computing (HPRC), Texas A&M University",
        "paragraphs": [
          "Dr. Honggao Liu is the Executive Director of High-Performance Research Computing (HPRC) at Texas A&M University, with more than 28 years of experience in research computing, computational and data sciences, and cyberinfrastructure development. He has served as PI or co-PI on over $35 million in National Science Foundation funding, and is the PI of the NSF FASTER and ACES awards that delivered the composable FASTER and ACES supercomputers—resources made available to the national research community through the NSF ACCESS program, with ACES also serving as a National AI Research Resource (NAIRR) pilot compute resource. He earned his Ph.D. in Chemical Engineering from Louisiana State University and previously served as director of HPC at LSU before joining Texas A&M."
        ]
      },
      {
        "name": "Shaowen Wang",
        "role": "Professor, Geography & Geographic Information Science / Siebel School of Computing and Data Science; Associate Dean, University of Illinois Urbana-Champaign",
        "paragraphs": [
          "Dr. Shaowen Wang is a Professor in the Department of Geography and Geographic Information Science and the Siebel School of Computing and Data Science at the University of Illinois Urbana-Champaign. He also holds affiliate faculty appointments in the Department of Urban and Regional Planning and the School of Information Sciences. He currently serves as Associate Dean for Natural and Mathematical Sciences in the College of Liberal Arts and Sciences and as a Senior Faculty Fellow in the Office of the Vice Chancellor for Research and Innovation. He is the founding director of the CyberGIS Center for Advanced Digital and Spatial Studies and leads the national Institute for Geospatial Understanding through an Integrative Discovery Environment (I-GUIDE) funded by the National Science Foundation. He previously served as Head of the Department of Geography and Geographic Information Science (2017-2023) and as Associate Director of the National Center for Supercomputing Applications for CyberGIS (2010-2017). He was a Visiting Scholar at Lund University (2006) and Harvard University (2023). His research focuses on advancing CyberGIS, geospatial data science, and spatial artificial intelligence (AI) to develop scalable solutions for complex geospatial problems and sustainability challenges. He served as President of the University Consortium for Geographic Information Science (UCGIS) from 2016 to 2017 and as a member of the National Academies’ Board on Earth Sciences and Resources from 2015 to 2020. He is a Fellow of the American Association for the Advancement of Science (AAAS), the American Association of Geographers (AAG), and UCGIS."
        ]
      },
      {
        "name": "Michael F. Goodchild",
        "role": "Professor Emeritus of Geography at the University of California, Santa Barbara",
        "paragraphs": [
          "Michael F. Goodchild is Professor Emeritus of Geography at the University of California, Santa Barbara. He received his BA degree from Cambridge University in Physics in 1965 and his PhD in Geography from McMaster University in 1969. His research and teaching interests focus on geographic information science, including uncertainty in geographic information, discrete global grids, and volunteered geo-graphic information. He was elected member of the US National Academy of Sciences in 2002, and Foreign Member of the Royal Society and Corresponding Fellow of the British Academy in 2010. He has published over 600 books and articles."
        ]
      },
      {
        "name": "Zhenhua He",
        "role": "Interim Director for Emerging Technologies and Research, Research Scientist, High Performance Research Computing (HPRC), Texas A&M University",
        "paragraphs": [
          "Dr. Zhenhua He is the Interim Director for Emerging Technologies and Research and a Research Scientist with Texas A&M High Performance Research Computing (HPRC), where he supports the training and research mission of the center and the NSF-funded ACES composable accelerator testbed. He earned his Ph.D. from Texas A&M University, and his expertise centers on machine learning and AI, deep-learning frameworks such as PyTorch and TensorFlow, and deploying AI/ML workloads on GPUs and emerging accelerators. He develops and teaches widely attended short courses on AI for high-performance computing that help researchers nationwide harness national cyberinfrastructure through the ACCESS and NAIRR programs. Recently named an NVIDIA Deep Learning Institute Certified Instructor and University Ambassador, he helps bridge domain researchers including those in GeoAI and coastal-resilience science with the AI technologies and computing resources needed to scale their analyses."
        ]
      },
      {
        "name": "Samantha Arundel",
        "role": "Research Director, Center of Excellence for Geospatial Information Science (CEGIS), U.S. Geological Survey",
        "paragraphs": [
          "Dr. Samantha Arundel is the Director of the Center of Excellence for Geospatial Information Science (CEGIS) at the U.S. Geological Survey and serves as Senior Science Advisor to the Director of the USGS National Geospatial Program. Dr. Arundel received her Ph.D. in geography from Arizona State University in 2000 and was an assistant and then associate professor at Northern Arizona University where her research focused on spatial modeling and automation of plant/climate relationships. In 2009, when she joined the USGS, she first served as raster specialist in the Ortho & Elevation section and as elevation and hydrography specialist for the Applied Research and Technology Branch. During this time, she led the contour generation development team in developing algorithms for automating contour production from 10-meter elevation data for the USTopo product; and served as the program manager for the automation of the National Elevation Dataset production, in its transition from Earth Resource Observation System (EROS) to the National Geospatial Technical Operations Center (NGTOC). In 2015, Dr. Arundel moved to the Center of Excellence for Geospatial Information Science, the research section of the NGTOC, where she is a Research Geographer conducting research on automated terrain mapping and modeling using various techniques like traditional raster modeling, geographic object-based image analysis and machine learning."
        ]
      },
      {
        "name": "Kari Craun",
        "role": "Executive Director for the Cartography and Geographic Information Society",
        "paragraphs": [
          "Kari Craun is the Executive Director for the Cartography and Geographic Information Society (CaGIS).  Ms. Craun retired from her position as Director of the National Geospatial Technical Operations Center (NGTOC), U.S. Geological Survey (USGS), in December, 2019 after 36 years of service to the Federal government as a geospatial professional.  In addition to serving as the Executive Director for CaGIS, Kari is the President of the Foundation Board for the American Society for Photogrammetry and Remote Sensing.  She also enjoys backpacking and traveling in her spare time.  Ms. Craun holds a B.S. degree in Geology from the University of Missouri-Kansas City; a M.S. degree in Civil Engineering from Purdue University and a M.S. degree in Geospatial Information Science from Northwest Missouri State University.  She and her husband Jeff reside in Rolla, Missouri."
        ]
      },
      {
        "name": "Dr. Budhu Bhaduri",
        "role": "Chief Data Officer, Oak Ridge National Laboratory",
        "paragraphs": [
          "Dr. Budhendra “Budhu” Bhaduri is the Chief Data Officer at Oak Ridge National Laboratory, providing executive leadership for an enterprise-wide data and AI strategy that accelerates scientific discovery and operational excellence. His responsibilities include establishing policies for data stewardship, ethics, accessibility, and risk management, and collaborating with major laboratory initiatives and the Department of Energy’s Genesis AI efforts to scale AI-enabled and autonomous science. Previously, he has led interdisciplinary portfolio spanning geospatial science and technology initiatives supporting energy, environment, and national security missions. In that capacity he provided strategic guidance and leadership to scientific and programmatic endeavors spanning geospatial science, artificial intelligence and machine learning, and scalable and high-performance computing particularly focusing on defense space and intelligence programs. Additionally, he fosters strategic partnerships with leading universities, research institutions, private companies, and philanthropic organizations to expedite the development and implementation of innovative solutions.",
          "Dr. Bhaduri is a Fellow of the American Association for the Advancement of Science (AAAS), the American Association of Geographers (AAG), and has served on the Geographical and Geospatial Sciences Committee of the National Academy of Sciences. He is a founding member of the U.S. Department of Energy’s Geospatial Sciences Steering Committee and is a recipient of the Department’s Outstanding Mentor Award for his dedicated service to the department for developing workforce for the nation."
        ]
      },
      {
        "name": "Dr. Caglar Koylu",
        "paragraphs": [
          "Caglar Koylu is an Associate Professor in the School of Earth, Environment, and Sustainability at the University of Iowa, and also a past president of the Cartography and Geographic Information Society (CaGIS). Caglar’s research in GIScience integrates spatial data science, network analysis, and geovisualization to understand how people, places, and the environment interact across space and time. He develops analytical, decision-support, and educational tools for exploring complex human mobility, network, environmental, and public health data. His work addresses societal challenges across demography, kinship networks, health, and the environment. Contributions include research on the largest population-scale kinship network in the United States, with 51 million individuals in its largest connected component, CAMSA, a small-area cancer mapping application used by multiple state cancer registries, and Roots & Migrants, an interactive mapping platform for teaching and learning U.S. history. Through research and teaching, Caglar aims to make spatial analysis accessible and useful for discovery and informed decision-making."
        ]
      },
      {
        "name": "Dr. Stephen Baker",
        "paragraphs": [
          "Stephen Baker is Senior Evaluation & Research Scientist at Mansueto Institute for Urban Innovation, where he is also facilitator of a cross-disciplinary doctoral fellows program, and a mixed-methods researcher who has conducted program and policy evaluations at the University of Chicago for over thirty years. He has served as panel reviewer for NSF and the Department of Education and principal investigator and project director on evaluations funded by local and national philanthropic foundations, the Department of Education and NSF. His portfolio has concentrated in recent years on STEM education and workforce development, informal learning, and community-based and collaborative policy approaches.",
          "He holds masters’ and doctoral degrees in social policy from the University of Chicago and has taught graduate and undergraduate courses there in evaluation, research, data management, and U.S. social welfare, as well as served on the Institutional Review Board."
        ]
      },
      {
        "name": "Dr. Yue Lin",
        "role": "Assistant Professor, Department of Geography & Geographic Information Science, University of Illinois Urbana-Champaign",
        "paragraphs": [
          "Dr. Lin’s research lies at the intersection of data, computation, and human values. I am interested in critically exploring how emerging technologies of geospatial computing and artificial intelligence, both in practice and theory, can be designed and used in ways that are ethical, socially responsible, and benefit humanity. More broadly, her interests span spatial data science, location privacy, and the societal implications of algorithmic systems."
        ]
      },
      {
        "name": "Dr. Peng Luo",
        "role": "Assistant Professor, School of Earth, Environment, and Sustainability, University of Iowa",
        "paragraphs": [
          "Dr. Luo leads research at the intersection of GIScience, GeoAI, and spatial data science. Previously, he was a postdoctoral researcher at the MIT Senseable City Lab, and  he received his Ph.D. from the Chair of Cartography and Visual Analytics at the Technical University of Munich. His research focuses on Trustworthy GeoAI, with particular interests in spatial explicit modeling, geospatial explainable AI, uncertainty quantification for GeoAI models, and multi-agent GeoAI."
        ]
      },
      {
        "name": "Ms. Shoibolina Kaushik",
        "role": "Information Analyst, Emory University",
        "paragraphs": [
          "Shoibolina Kaushik is an Information Analyst in the Department of Environmental Sciences at Emory University, where she works within an interdisciplinary team on a Gates Foundation-funded project in Ethiopia, where she has contributed to developing automated GeoAI pipelines for malaria vector-control using remote sensing imagery. She holds master’s degree in computer science from Emory University, during which she helped develop a novel GeoAI pipeline to reduce manual feature extraction effort from 300 hours to 9, enabling scalable road network extraction from more than centuries’ worth of Atlanta’s historical raster maps while preserving road-network topology for GIS workflows. Previously, she has also worked on building accessible low-cost clinical health analysis tools for the vulnerable population. Her background bridges machine learning, computer vision, and data engineering across geospatial and health applications, and her interests center on applying AI and computational methods to spatial and historical data."
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
