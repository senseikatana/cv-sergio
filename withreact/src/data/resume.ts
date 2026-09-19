/**
 * Fuente única del CV digital (/resume).
 * Contenido real extraído de CV_sergiojurado_photo_2026.pdf (Google Docs, 2026).
 * El PDF descargable vive en public/resume/cv/sergio-jurado.pdf.
 */

export type Lang = "es" | "ca" | "en";
export type ProfileId = "logistica" | "fullstack" | "generico";

export interface Experience {
	company: string;
	role: string;
	period: string;
	description: string;
	highlights: string[];
}

export interface Education {
	institution: string;
	degree: string;
	period: string;
	note?: string;
}

export interface ProfileEntry {
	title: string;
	role: string;
	description: string;
	about: string;
	skills: string[];
	experience: {
		role: string;
		company: string;
		period: string;
		highlights: string[];
	}[];
}

export interface Resume {
	name: string;
	title: string;
	summary: string;
	location: string;
	note?: string;
	license: string;
	availability: string;
	experience: Experience[];
	education: Education[];
	softSkills: string[];
	hardSkills: string[];
	languages: { name: string; level: string }[];
	additional: string[];
}

export interface UiStrings {
	nav: { cv: string; services: string; contact: string };
	heroGreeting: string;
	heroIntro: string;
	downloadPdf: string;
	viewProfiles: string;
	sectionProfile: string;
	sectionExperience: string;
	sectionEducation: string;
	sectionSkills: string;
	sectionAvailability: string;
	experienceSubtitle: string;
	softSkills: string;
	hardSkills: string;
	languages: string;
	additionalTitle: string;
	profilesTitle: string;
	profilesSubtitle: string;
	viewProfile: string;
	ctaText: string;
	sendEmail: string;
	servicesTitle: string;
	servicesSubtitle: string;
	servicesIntro: string;
	contactTitle: string;
	contactSubtitle: string;
	contactIntro: string;
	whatsappTitle: string;
	whatsappSub: string;
	whatsappCta: string;
	whatsappPrefill: string;
	orWrite: string;
	formName: string;
	formEmail: string;
	formMsg: string;
	send: string;
	profileSkills: string;
	profileExperience: string;
	profileContact: string;
	backToCv: string;
	footerPartOf: string;
	seoDescription: string;
	skipToContent: string;
	themeToggle: string;
}

export const meta = {
	name: "Sergio Jurado Casado",
	email: "sergiojurado.casado@gmail.com",
	phone: "+34 637 723 747",
	whatsapp: "34637723747",
	location: "Cambrils, Tarragona",
	linkedin: "https://www.linkedin.com/in/senseijurado/",
	github: "https://github.com/senseikatana",
	pdfUrl: "/resume/cv/sergio-jurado.pdf",
	siteUrl: "https://senseikatana.com",
};

export const resume: Record<Lang, Resume> = {
	es: {
		name: "Sergio Jurado Casado",
		title: "Auxiliar de comercio, logística y almacén",
		summary:
			"Soy un profesional meticuloso, responsable, con un perfil observador y gran capacidad de análisis, siempre en aprendizaje continuo. Busco integrarme en equipos dinámicos y en entornos que brinden apoyo al desarrollo profesional. Ofrezco conocimientos técnicos y funcionales, habilidades intermedias en ofimática y experiencia integral en gestión comercial y logística de almacenes.",
		location: "Cambrils, Tarragona",
		note: "Certif. Discapacidad TEA (35%)",
		license: "Licencia de conducir B",
		availability: "Incorporación inmediata — disponibilidad de mañana y tarde",
		experience: [
			{
				company: "Ayuntamiento de Salou",
				role: "Personal de Mantenimiento y Jardinería",
				period: "2025",
				description: "Mantenimiento de espacios verdes municipales.",
				highlights: [
					"Uso de desbrozadora para el saneamiento de jardines públicos",
					"Siembra y mantenimiento fitosanitario floral en el municipio",
				],
			},
			{
				company: "Esinsa Gaskets",
				role: "Prácticas no remuneradas",
				period: "2026",
				description: "Apoyo operativo en almacén y pedidos.",
				highlights: [
					"Picking de espárragos, arandelas, tornillos y tuercas",
					"Mover cajas y realizar pedidos manuales",
				],
			},
			{
				company: "Bar Las Cadenas",
				role: "Asistente de Hostelería",
				period: "2024",
				description: "Servicio en barra y atención en sala.",
				highlights: [
					"Prestación de servicio de calidad en barra y atención directa en mesa",
					"Supervisión del orden, limpieza integral y correcta adecuación del local",
				],
			},
			{
				company: "Passos de Cuinar, Cambrils",
				role: "Reparto Logístico",
				period: "2024",
				description: "Transporte y entrega de mercancías.",
				highlights: [
					"Transporte logístico de mercancías asegurando la puntualidad en cada envío",
				],
			},
			{
				company: "Uber Eats, Cambrils",
				role: "Reparto Logístico",
				period: "2023",
				description: "Distribución de pedidos de alimentación.",
				highlights: [
					"Programación de itinerarios y distribución efectiva de pedidos de alimentación",
				],
			},
			{
				company: "GlovoApp S.L, Cambrils",
				role: "Reparto Logístico",
				period: "2021 – 2023",
				description: "Reparto a domicilio y soporte a restauración.",
				highlights: [
					"Reparto a domicilio con enfoque en la eficiencia de las trayectorias",
					"Soporte operativo en la cadena de entrega para socios de restauración",
				],
			},
			{
				company: "Centro Municipal Deportivo, Valladolid",
				role: "Responsable de Recepción",
				period: "2020",
				description: "Atención al usuario y gestión administrativa.",
				highlights: [
					"Administración de altas de usuarios y resolución eficiente de incidencias",
				],
			},
		],
		education: [
			{
				institution: "Novatecnica",
				degree: "Certificado Profesional en Auxiliar Comercio Marketing",
				period: "2026",
				note: "Carretillas y Ventas",
			},
			{ institution: "Novatecnica, Vila-seca", degree: "PRL", period: "2026" },
			{
				institution: "IDFO",
				degree: "Operador de Carretons Elevadors",
				period: "2024",
			},
			{
				institution: "ESI Valladolid",
				degree: "Curso de Diseño Multimedia y 3D",
				period: "2020",
			},
			{
				institution: "I.E.S. Vega del Prado",
				degree: "CFGS — ICTI",
				period: "2017 – 2019",
			},
			{
				institution: "Valladolid",
				degree: "CFGM — Laboratorio de Imagen",
				period: "2008 – 2010",
			},
			{ institution: "Valladolid", degree: "E.S.O.", period: "2005 – 2008" },
		],
		softSkills: [
			"Capacidad analítica y observadora",
			"Responsabilidad y compromiso",
			"Adaptabilidad y flexibilidad",
			"Orientación a resultados y atención al cliente",
			"Aprendizaje continuo",
		],
		hardSkills: [
			"Gestión logística y control de inventarios",
			"Ofimática intermedia",
			"Manejo de maquinarias (frontal contrapesada, retráctil, apiladoras)",
			"Mantenimiento y jardinería",
		],
		languages: [
			{ name: "Castellano", level: "Nativo (oral y escrita)" },
			{ name: "Catalán", level: "Elemental (comprensión)" },
			{ name: "Inglés", level: "A2 — conocimientos básicos operativos" },
		],
		additional: [
			"Titular de licencia de conducción B",
			"Incorporación inmediata — disponibilidad de mañana y tarde",
		],
	},

	ca: {
		name: "Sergio Jurado Casado",
		title: "Auxiliar de comerç, logística i magatzem",
		summary:
			"Sóc un professional meticulós, responsable, amb perfil observador i gran capacitat d'anàlisi, sempre en aprenentatge continu. Busco integrar-me en equips dinàmics i en entorns que donin suport al desenvolupament professional. Ofereixo coneixements tècnics i funcionals, habilitats intermèdies en ofimàtica i experiència integral en gestió comercial i logística de magatzems.",
		location: "Cambrils, Tarragona",
		note: "Certif. Discapacitat TEA (35%)",
		license: "Permís de conduir B",
		availability: "Incorporació immediata — disponibilitat de matí i tarda",
		experience: [
			{
				company: "Ajuntament de Salou",
				role: "Personal de Manteniment i Jardineria",
				period: "2025",
				description: "Manteniment d'espais verds municipals.",
				highlights: [
					"Ús de desbrossadora per al sanejament de jardins públics",
					"Sembra i manteniment fitosanitari floral al municipi",
				],
			},
			{
				company: "Esinsa Gaskets",
				role: "Pràctiques no remunerades",
				period: "2026",
				description: "Suport operatiu en magatzem i comandes.",
				highlights: [
					"Picking d'espàrrecs, volanderes, cargols i femelles",
					"Moure caixes i fer comandes manuals",
				],
			},
			{
				company: "Bar Las Cadenas",
				role: "Assistent d'Hostaleria",
				period: "2024",
				description: "Servei en barra i atenció a sala.",
				highlights: [
					"Servei de qualitat en barra i atenció directa a taula",
					"Supervisió de l'ordre, neteja integral i adequació del local",
				],
			},
			{
				company: "Passos de Cuinar, Cambrils",
				role: "Repartiment Logístic",
				period: "2024",
				description: "Transport i lliurament de mercaderies.",
				highlights: [
					"Transport logístic de mercaderies assegurant la puntualitat en cada enviament",
				],
			},
			{
				company: "Uber Eats, Cambrils",
				role: "Repartiment Logístic",
				period: "2023",
				description: "Distribució de comandes d'alimentació.",
				highlights: [
					"Programació d'itineraris i distribució efectiva de comandes d'alimentació",
				],
			},
			{
				company: "GlovoApp S.L, Cambrils",
				role: "Repartiment Logístic",
				period: "2021 – 2023",
				description: "Repartiment a domicili i suport a restauració.",
				highlights: [
					"Repartiment a domicili amb enfocament en l'eficiència de les trajectòries",
					"Suport operatiu en la cadena de lliurament per a socis de restauració",
				],
			},
			{
				company: "Centre Municipal Esportiu, Valladolid",
				role: "Responsable de Recepció",
				period: "2020",
				description: "Atenció a l'usuari i gestió administrativa.",
				highlights: [
					"Administració d'altes d'usuaris i resolució eficient d'incidències",
				],
			},
		],
		education: [
			{
				institution: "Novatecnica",
				degree: "Certificat Professional Auxiliar Comerç Màrqueting",
				period: "2026",
				note: "Carretons i Vendes",
			},
			{ institution: "Novatecnica, Vila-seca", degree: "PRL", period: "2026" },
			{
				institution: "IDFO",
				degree: "Operador de Carretons Elevadors",
				period: "2024",
			},
			{
				institution: "ESI Valladolid",
				degree: "Curs de Disseny Multimèdia i 3D",
				period: "2020",
			},
			{
				institution: "I.E.S. Vega del Prado",
				degree: "CFGS — ICTI",
				period: "2017 – 2019",
			},
			{
				institution: "Valladolid",
				degree: "CFGM — Laboratori d'Imatge",
				period: "2008 – 2010",
			},
			{ institution: "Valladolid", degree: "E.S.O.", period: "2005 – 2008" },
		],
		softSkills: [
			"Capacitat analítica i observadora",
			"Responsabilitat i compromís",
			"Adaptabilitat i flexibilitat",
			"Orientació a resultats i atenció al client",
			"Aprenentatge continu",
		],
		hardSkills: [
			"Gestió logística i control d'inventaris",
			"Ofimàtica intermèdia",
			"Maneig de maquinària (frontal contrapesada, retràctil, apiladors)",
			"Manteniment i jardineria",
		],
		languages: [
			{ name: "Castellà", level: "Natiu (oral i escrit)" },
			{ name: "Català", level: "Elemental (comprensió)" },
			{ name: "Anglès", level: "A2 — coneixements bàsics operatius" },
		],
		additional: [
			"Titular de permís de conduir B",
			"Incorporació immediata — disponibilitat de matí i tarda",
		],
	},

	en: {
		name: "Sergio Jurado Casado",
		title: "Trade, logistics and warehouse assistant",
		summary:
			"I am a meticulous, responsible professional with an observant profile and strong analytical skills, always learning. I am looking to join dynamic teams and environments that support professional development. I bring technical and functional knowledge, intermediate office skills and end-to-end experience in commercial management and warehouse logistics.",
		location: "Cambrils, Tarragona",
		note: "ASD disability certificate (35%)",
		license: "Driving licence B",
		availability: "Available immediately — morning and afternoon",
		experience: [
			{
				company: "Salou City Council",
				role: "Maintenance & Gardening Staff",
				period: "2025",
				description: "Maintenance of municipal green spaces.",
				highlights: [
					"Brush clearing to keep public gardens in good condition",
					"Planting and phytosanitary upkeep across the municipality",
				],
			},
			{
				company: "Esinsa Gaskets",
				role: "Unpaid internship",
				period: "2026",
				description: "Operational support in warehouse and orders.",
				highlights: [
					"Picking studs, washers, screws and nuts",
					"Moving boxes and fulfilling manual orders",
				],
			},
			{
				company: "Bar Las Cadenas",
				role: "Hospitality Assistant",
				period: "2024",
				description: "Bar service and table attention.",
				highlights: [
					"Quality bar service and direct table attention",
					"Supervision of order, cleanliness and venue upkeep",
				],
			},
			{
				company: "Passos de Cuinar, Cambrils",
				role: "Logistics Delivery",
				period: "2024",
				description: "Transport and delivery of goods.",
				highlights: [
					"Logistics transport ensuring on-time delivery for every shipment",
				],
			},
			{
				company: "Uber Eats, Cambrils",
				role: "Logistics Delivery",
				period: "2023",
				description: "Food order distribution.",
				highlights: [
					"Route planning and effective distribution of food orders",
				],
			},
			{
				company: "GlovoApp S.L, Cambrils",
				role: "Logistics Delivery",
				period: "2021 – 2023",
				description: "Home delivery and restaurant support.",
				highlights: [
					"Delivery focused on route efficiency",
					"Operational support across the delivery chain for restaurant partners",
				],
			},
			{
				company: "Municipal Sports Centre, Valladolid",
				role: "Reception Manager",
				period: "2020",
				description: "Customer assistance and administrative management.",
				highlights: ["User registration and efficient incident resolution"],
			},
		],
		education: [
			{
				institution: "Novatecnica",
				degree: "Professional Certificate in Trade & Marketing Assistant",
				period: "2026",
				note: "Forklifts & Sales",
			},
			{
				institution: "Novatecnica, Vila-seca",
				degree: "Occupational Risk Prevention (PRL)",
				period: "2026",
			},
			{
				institution: "IDFO",
				degree: "Forklift Operator Certificate",
				period: "2024",
			},
			{
				institution: "ESI Valladolid",
				degree: "Multimedia & 3D Design course",
				period: "2020",
			},
			{
				institution: "I.E.S. Vega del Prado",
				degree: "Higher Diploma in ICTI",
				period: "2017 – 2019",
			},
			{
				institution: "Valladolid",
				degree: "Vocational Diploma in Image Lab",
				period: "2008 – 2010",
			},
			{
				institution: "Valladolid",
				degree: "Compulsory Secondary Education (ESO)",
				period: "2005 – 2008",
			},
		],
		softSkills: [
			"Observant, analytical mindset",
			"Responsibility and commitment",
			"Adaptability and flexibility",
			"Results-driven customer service",
			"Continuous learning",
		],
		hardSkills: [
			"Logistics management and inventory control",
			"Intermediate office software",
			"Machinery operation (counterbalance, reach, stackers)",
			"Maintenance and gardening",
		],
		languages: [
			{ name: "Spanish", level: "Native (spoken and written)" },
			{ name: "Catalan", level: "Basic (comprehension)" },
			{ name: "English", level: "A2 — basic operational knowledge" },
		],
		additional: [
			"Driving licence B",
			"Available immediately — morning and afternoon",
		],
	},
};

export const profiles: Record<ProfileId, Record<Lang, ProfileEntry>> = {
	logistica: {
		es: {
			title: "Logística y Almacén",
			role: "Operario de logística y gestión de almacén",
			description:
				"Preparación de pedidos, control de stock y manejo de carretillas en almacén.",
			about:
				"Perfil orientado a la eficiencia y la precisión en almacén. Experiencia real en picking de componentes, preparación manual de pedidos, movimiento de mercancía y reparto logístico, con formación específica en PRL y operación de carretillas elevadoras (frontal contrapesada, retráctil y apiladoras).",
			skills: [
				"Picking y preparación de pedidos",
				"Control de stock y recuento",
				"Carretillas elevadoras (frontal, retráctil, apiladoras)",
				"Recepción y expedición de mercancía",
				"Reparto y rutas logísticas",
				"PRL (Prevención de Riesgos Laborales)",
				"Ofimática intermedia",
			],
			experience: [
				{
					role: "Prácticas — Almacén y pedidos",
					company: "Esinsa Gaskets",
					period: "2026",
					highlights: [
						"Picking de espárragos, arandelas, tornillos y tuercas.",
						"Movimiento de cajas y preparación manual de pedidos.",
					],
				},
				{
					role: "Reparto logístico",
					company: "GlovoApp · Uber Eats · Passos de Cuinar",
					period: "2021 – 2024",
					highlights: [
						"Reparto a domicilio con enfoque en la eficiencia de las trayectorias.",
						"Programación de itinerarios y entrega puntual de mercancía.",
					],
				},
			],
		},
		ca: {
			title: "Logística i Magatzem",
			role: "Operari de logística i gestió de magatzem",
			description:
				"Preparació de comandes, control d'estoc i maneig de carretons a magatzem.",
			about:
				"Perfil orientat a l'eficiència i la precisió al magatzem. Experiència real en picking de components, preparació manual de comandes, moviment de mercaderia i repartiment logístic, amb formació específica en PRL i operació de carretons elevadors (frontal contrapesada, retràctil i apiladors).",
			skills: [
				"Picking i preparació de comandes",
				"Control d'estoc i recompte",
				"Carretons elevadors (frontal, retràctil, apiladors)",
				"Recepció i expedició de mercaderia",
				"Repartiment i rutes logístiques",
				"PRL (Prevenció de Riscos Laborals)",
				"Ofimàtica intermèdia",
			],
			experience: [
				{
					role: "Pràctiques — Magatzem i comandes",
					company: "Esinsa Gaskets",
					period: "2026",
					highlights: [
						"Picking d'espàrrecs, volanderes, cargols i femelles.",
						"Moviment de caixes i preparació manual de comandes.",
					],
				},
				{
					role: "Repartiment logístic",
					company: "GlovoApp · Uber Eats · Passos de Cuinar",
					period: "2021 – 2024",
					highlights: [
						"Repartiment a domicili amb enfocament en l'eficiència de les trajectòries.",
						"Programació d'itineraris i lliurament puntual de mercaderia.",
					],
				},
			],
		},
		en: {
			title: "Logistics & Warehouse",
			role: "Logistics and warehouse operator",
			description:
				"Order picking, stock control and forklift operation in warehouse environments.",
			about:
				"Effortless efficiency and precision in the warehouse. Hands-on experience in component picking, manual order preparation, goods handling and delivery logistics, with specific training in occupational risk prevention (PRL) and forklift operation (counterbalance, reach and stackers).",
			skills: [
				"Order picking and preparation",
				"Stock control and cycle counting",
				"Forklifts (counterbalance, reach, stackers)",
				"Goods receiving and dispatch",
				"Delivery routes and logistics",
				"Occupational risk prevention (PRL)",
				"Intermediate office software",
			],
			experience: [
				{
					role: "Internship — Warehouse & orders",
					company: "Esinsa Gaskets",
					period: "2026",
					highlights: [
						"Picking studs, washers, screws and nuts.",
						"Moving boxes and fulfilling manual orders.",
					],
				},
				{
					role: "Delivery logistics",
					company: "GlovoApp · Uber Eats · Passos de Cuinar",
					period: "2021 – 2024",
					highlights: [
						"Delivery focused on route efficiency.",
						"Route planning and on-time goods delivery.",
					],
				},
			],
		},
	},

	fullstack: {
		es: {
			title: "Fullstack y Creativo Digital",
			role: "Desarrollo web · Diseño digital",
			description:
				"Sitios y aplicaciones web con Astro, Nuxt y React, del diseño al despliegue.",
			about:
				"Perfil creativo-técnico formado en imagen y diseño (CFGM Laboratorio de Imagen y curso de Diseño Multimedia y 3D) y en desarrollo web autodidacta. Construyo sitios rápidos y accesibles con Astro, Nuxt, React, TypeScript y Tailwind, cuidando también la parte visual: este mismo CV existe en tres implementaciones sobre distintos frameworks.",
			skills: [
				"JavaScript / TypeScript",
				"Astro · Nuxt · React",
				"HTML semántico y CSS moderno",
				"Tailwind CSS",
				"Node.js y build tools (bun, Vite)",
				"Git y despliegue en Cloudflare",
				"Diseño multimedia y 3D",
				"UI / accesibilidad",
			],
			experience: [
				{
					role: "CV digital multi-stack",
					company: "Proyecto propio",
					period: "2026",
					highlights: [
						"Tres implementaciones del mismo CV: Astro, Nuxt y React.",
						"Diseño propio, i18n ES/CA/EN y despliegue en Cloudflare.",
					],
				},
				{
					role: "Formación en diseño y multimedia",
					company: "ESI Valladolid · CFGM Laboratorio de Imagen",
					period: "2008 – 2020",
					highlights: [
						"Diseño multimedia y 3D.",
						"Laboratorio de imagen y tratamiento digital.",
					],
				},
			],
		},
		ca: {
			title: "Fullstack i Creatiu Digital",
			role: "Desenvolupament web · Disseny digital",
			description:
				"Llocs i aplicacions web amb Astro, Nuxt i React, del disseny al desplegament.",
			about:
				"Perfil creatiu-tècnic format en imatge i disseny (CFGM Laboratori d'Imatge i curs de Disseny Multimèdia i 3D) i en desenvolupament web autodidacta. Construeixo llocs ràpids i accessibles amb Astro, Nuxt, React, TypeScript i Tailwind, cuidant també la part visual: aquest mateix CV existeix en tres implementacions sobre diferents frameworks.",
			skills: [
				"JavaScript / TypeScript",
				"Astro · Nuxt · React",
				"HTML semàntic i CSS modern",
				"Tailwind CSS",
				"Node.js i build tools (bun, Vite)",
				"Git i desplegament a Cloudflare",
				"Disseny multimèdia i 3D",
				"UI / accessibilitat",
			],
			experience: [
				{
					role: "CV digital multi-stack",
					company: "Projecte propi",
					period: "2026",
					highlights: [
						"Tres implementacions del mateix CV: Astro, Nuxt i React.",
						"Disseny propi, i18n ES/CA/EN i desplegament a Cloudflare.",
					],
				},
				{
					role: "Formació en disseny i multimèdia",
					company: "ESI Valladolid · CFGM Laboratori d'Imatge",
					period: "2008 – 2020",
					highlights: [
						"Disseny multimèdia i 3D.",
						"Laboratori d'imatge i tractament digital.",
					],
				},
			],
		},
		en: {
			title: "Fullstack & Digital Creative",
			role: "Web development · Digital design",
			description:
				"Websites and apps with Astro, Nuxt and React, from design to deployment.",
			about:
				"Creative-technical profile trained in image and design (Vocational Diploma in Image Lab and Multimedia & 3D Design course) and self-taught in web development. I build fast, accessible sites with Astro, Nuxt, React, TypeScript and Tailwind, taking care of the visual side too: this very CV ships as three implementations on different frameworks.",
			skills: [
				"JavaScript / TypeScript",
				"Astro · Nuxt · React",
				"Semantic HTML and modern CSS",
				"Tailwind CSS",
				"Node.js and build tools (bun, Vite)",
				"Git and Cloudflare deployment",
				"Multimedia and 3D design",
				"UI / accessibility",
			],
			experience: [
				{
					role: "Multi-stack digital CV",
					company: "Personal project",
					period: "2026",
					highlights: [
						"Three implementations of the same CV: Astro, Nuxt and React.",
						"Custom design, ES/CA/EN i18n and Cloudflare deployment.",
					],
				},
				{
					role: "Design and multimedia training",
					company: "ESI Valladolid · Vocational Diploma in Image Lab",
					period: "2008 – 2020",
					highlights: [
						"Multimedia and 3D design.",
						"Image lab and digital processing.",
					],
				},
			],
		},
	},

	generico: {
		es: {
			title: "Perfil Versátil",
			role: "Atención al cliente · Mantenimiento · Logística",
			description:
				"Profesional polivalente con experiencia en atención al público, mantenimiento y almacén.",
			about:
				"Profesional versátil y organizado, con experiencia en atención al usuario y gestión administrativa, mantenimiento de espacios verdes, hostelería y logística. Gran adaptabilidad, aprendizaje continuo y orientación a resultados.",
			skills: [
				"Atención al cliente y recepción",
				"Gestión administrativa y altas de usuarios",
				"Mantenimiento y jardinería",
				"Trabajo en equipo",
				"Adaptabilidad y organización",
				"Ofimática intermedia",
				"Licencia de conducir B",
			],
			experience: [
				{
					role: "Responsable de Recepción",
					company: "Centro Municipal Deportivo, Valladolid",
					period: "2020",
					highlights: [
						"Altas de usuarios y resolución de incidencias.",
						"Gestión administrativa y atención directa al público.",
					],
				},
				{
					role: "Personal de Mantenimiento y Jardinería",
					company: "Ayuntamiento de Salou",
					period: "2025",
					highlights: [
						"Saneamiento de jardines públicos y mantenimiento fitosanitario.",
					],
				},
				{
					role: "Asistente de Hostelería",
					company: "Bar Las Cadenas",
					period: "2024",
					highlights: [
						"Servicio en barra y atención en sala.",
						"Supervisión de orden y limpieza del local.",
					],
				},
			],
		},
		ca: {
			title: "Perfil Versàtil",
			role: "Atenció al client · Manteniment · Logística",
			description:
				"Professional polivalent amb experiència en atenció al públic, manteniment i magatzem.",
			about:
				"Professional versàtil i organitzat, amb experiència en atenció a l'usuari i gestió administrativa, manteniment d'espais verds, hostaleria i logística. Gran adaptabilitat, aprenentatge continu i orientació a resultats.",
			skills: [
				"Atenció al client i recepció",
				"Gestió administrativa i altes d'usuaris",
				"Manteniment i jardineria",
				"Treball en equip",
				"Adaptabilitat i organització",
				"Ofimàtica intermèdia",
				"Permís de conduir B",
			],
			experience: [
				{
					role: "Responsable de Recepció",
					company: "Centre Municipal Esportiu, Valladolid",
					period: "2020",
					highlights: [
						"Altes d'usuaris i resolució d'incidències.",
						"Gestió administrativa i atenció directa al públic.",
					],
				},
				{
					role: "Personal de Manteniment i Jardineria",
					company: "Ajuntament de Salou",
					period: "2025",
					highlights: [
						"Sanejament de jardins públics i manteniment fitosanitari.",
					],
				},
				{
					role: "Assistent d'Hostaleria",
					company: "Bar Las Cadenas",
					period: "2024",
					highlights: [
						"Servei en barra i atenció a sala.",
						"Supervisió de l'ordre i neteja del local.",
					],
				},
			],
		},
		en: {
			title: "Versatile Profile",
			role: "Customer service · Maintenance · Logistics",
			description:
				"All-round professional with experience in customer service, maintenance and warehouse.",
			about:
				"Versatile, organised professional with experience in customer assistance and administrative management, green space maintenance, hospitality and logistics. Strong adaptability, continuous learning and results orientation.",
			skills: [
				"Customer service and reception",
				"Administrative management and user registration",
				"Maintenance and gardening",
				"Teamwork",
				"Adaptability and organisation",
				"Intermediate office software",
				"Driving licence B",
			],
			experience: [
				{
					role: "Reception Manager",
					company: "Municipal Sports Centre, Valladolid",
					period: "2020",
					highlights: [
						"User registration and incident resolution.",
						"Administrative management and direct customer assistance.",
					],
				},
				{
					role: "Maintenance & Gardening Staff",
					company: "Salou City Council",
					period: "2025",
					highlights: ["Public garden clearing and phytosanitary upkeep."],
				},
				{
					role: "Hospitality Assistant",
					company: "Bar Las Cadenas",
					period: "2024",
					highlights: [
						"Bar service and table attention.",
						"Venue order and cleanliness supervision.",
					],
				},
			],
		},
	},
};

export const services: Record<Lang, { title: string; description: string }[]> =
	{
		es: [
			{
				title: "Logística y almacén",
				description:
					"Gestión de inventario, carretillas (frontal, retráctil, apiladoras), picking y expedición.",
			},
			{
				title: "Desarrollo web",
				description:
					"Sitios y aplicaciones pequeñas con Astro, Nuxt, React y TypeScript. Portfolios, catálogos y landings.",
			},
			{
				title: "Mantenimiento y jardinería",
				description: "Desbroce, siembra y mantenimiento fitosanitario.",
			},
			{
				title: "Atención al cliente",
				description:
					"Altas de usuarios, resolución de incidencias y soporte directo.",
			},
		],
		ca: [
			{
				title: "Logística i magatzem",
				description:
					"Gestió d'inventari, carretons (frontal, retràctil, apiladors), picking i expedició.",
			},
			{
				title: "Desenvolupament web",
				description:
					"Llocs i petites apps amb Astro, Nuxt, React i TypeScript. Portfolios, catàlegs i landings.",
			},
			{
				title: "Manteniment i jardineria",
				description: "Desbrossament, sembra i manteniment fitosanitari.",
			},
			{
				title: "Atenció al client",
				description:
					"Altes d'usuaris, resolució d'incidències i suport directe.",
			},
		],
		en: [
			{
				title: "Logistics & warehouse",
				description:
					"Inventory management, forklifts (counterbalance, reach, stackers), picking and dispatch.",
			},
			{
				title: "Web development",
				description:
					"Small sites and apps with Astro, Nuxt, React and TypeScript. Portfolios, catalogues and landing pages.",
			},
			{
				title: "Maintenance & gardening",
				description: "Brush clearing, planting and phytosanitary upkeep.",
			},
			{
				title: "Customer service",
				description:
					"User registration, incident resolution and direct support.",
			},
		],
	};

export const sections: Record<
	Lang,
	{ id: string; label: string; title: string; icon: string }[]
> = {
	es: [
		{ id: "perfil", label: "01", title: "Perfil", icon: "user" },
		{ id: "experiencia", label: "02", title: "Experiencia", icon: "briefcase" },
		{
			id: "formacion",
			label: "03",
			title: "Formación",
			icon: "graduation-cap",
		},
		{ id: "skills", label: "04", title: "Skills", icon: "sparkles" },
		{ id: "extra", label: "05", title: "Disponibilidad", icon: "info" },
	],
	ca: [
		{ id: "perfil", label: "01", title: "Perfil", icon: "user" },
		{ id: "experiencia", label: "02", title: "Experiència", icon: "briefcase" },
		{ id: "formacion", label: "03", title: "Formació", icon: "graduation-cap" },
		{ id: "skills", label: "04", title: "Skills", icon: "sparkles" },
		{ id: "extra", label: "05", title: "Disponibilitat", icon: "info" },
	],
	en: [
		{ id: "perfil", label: "01", title: "Profile", icon: "user" },
		{ id: "experiencia", label: "02", title: "Experience", icon: "briefcase" },
		{
			id: "formacion",
			label: "03",
			title: "Education",
			icon: "graduation-cap",
		},
		{ id: "skills", label: "04", title: "Skills", icon: "sparkles" },
		{ id: "extra", label: "05", title: "Availability", icon: "info" },
	],
};

export const ui: Record<Lang, UiStrings> = {
	es: {
		nav: { cv: "CV", services: "Servicios", contact: "Contacto" },
		heroGreeting: "Hola, soy",
		heroIntro:
			"Esta es la versión digital de mi CV: el mismo contenido que el PDF, más cómodo de leer en el móvil o en el navegador.",
		downloadPdf: "Descargar PDF",
		viewProfiles: "Ver perfiles",
		sectionProfile: "Perfil profesional",
		sectionExperience: "Experiencia profesional",
		sectionEducation: "Formación académica",
		sectionSkills: "Competencias",
		sectionAvailability: "Información adicional",
		experienceSubtitle:
			"Mismos puestos que en el PDF, con el detalle de cada rol.",
		softSkills: "Soft skills",
		hardSkills: "Hard skills",
		languages: "Idiomas",
		additionalTitle: "Información adicional",
		profilesTitle: "Perfiles",
		profilesSubtitle:
			"Tres enfoques del mismo CV según el puesto al que apliques.",
		viewProfile: "Ver perfil",
		ctaText:
			"¿Prefieres el documento clásico? Descarga el PDF o escríbeme directamente.",
		sendEmail: "Enviar email",
		servicesTitle: "Servicios",
		servicesSubtitle: "Lo que hago",
		servicesIntro:
			"Estos son los ámbitos en los que puedo aportar desde el primer día.",
		contactTitle: "Contacto",
		contactSubtitle: "¿Tienes una oferta o quieres hablar? Escríbeme.",
		contactIntro:
			"Disponible para incorporación inmediata en logística, almacén, comercio y atención al cliente.",
		whatsappTitle: "WhatsApp",
		whatsappSub: "La vía más rápida: te contesto en el día.",
		whatsappCta: "Abrir WhatsApp",
		whatsappPrefill: "Hola Sergio, te contacto desde senseikatana.com",
		orWrite: "O escríbeme desde este formulario",
		formName: "Tu nombre",
		formEmail: "Tu email",
		formMsg: "Cuéntame…",
		send: "Enviar mensaje",
		profileSkills: "Skills",
		profileExperience: "Experiencia",
		profileContact: "Contactar",
		backToCv: "Volver al CV",
		footerPartOf: "Parte de senseikatana.com",
		seoDescription:
			"CV digital de Sergio Jurado Casado: perfil, experiencia, formación y descarga del PDF en español, catalán e inglés.",
		skipToContent: "Saltar al contenido",
		themeToggle: "Cambiar tema",
	},
	ca: {
		nav: { cv: "CV", services: "Serveis", contact: "Contacte" },
		heroGreeting: "Hola, sóc",
		heroIntro:
			"Aquesta és la versió digital del meu CV: el mateix contingut que el PDF, més còmode de llegir al mòbil o al navegador.",
		downloadPdf: "Descarregar PDF",
		viewProfiles: "Veure perfils",
		sectionProfile: "Perfil professional",
		sectionExperience: "Experiència professional",
		sectionEducation: "Formació acadèmica",
		sectionSkills: "Competències",
		sectionAvailability: "Informació addicional",
		experienceSubtitle:
			"Els mateixos llocs que al PDF, amb el detall de cada rol.",
		softSkills: "Soft skills",
		hardSkills: "Hard skills",
		languages: "Idiomes",
		additionalTitle: "Informació addicional",
		profilesTitle: "Perfils",
		profilesSubtitle:
			"Tres enfocaments del mateix CV segons el lloc al qual apliquis.",
		viewProfile: "Veure perfil",
		ctaText:
			"Prefereixes el document clàssic? Descarrega el PDF o escriu-me directament.",
		sendEmail: "Enviar email",
		servicesTitle: "Serveis",
		servicesSubtitle: "Què faig",
		servicesIntro:
			"Aquests són els àmbits en què puc aportar des del primer dia.",
		contactTitle: "Contacte",
		contactSubtitle: "Tens una oferta o vols parlar? Escriu-me.",
		contactIntro:
			"Disponible per a incorporació immediata en logística, magatzem, comerç i atenció al client.",
		whatsappTitle: "WhatsApp",
		whatsappSub: "La via més ràpida: et contesto al llarg del dia.",
		whatsappCta: "Obrir WhatsApp",
		whatsappPrefill: "Hola Sergio, et contacto des de senseikatana.com",
		orWrite: "O escriu-me des d'aquest formulari",
		formName: "El teu nom",
		formEmail: "El teu email",
		formMsg: "Explica'm…",
		send: "Enviar missatge",
		profileSkills: "Skills",
		profileExperience: "Experiència",
		profileContact: "Contactar",
		backToCv: "Tornar al CV",
		footerPartOf: "Part de senseikatana.com",
		seoDescription:
			"CV digital de Sergio Jurado Casado: perfil, experiència, formació i descàrrega del PDF en castellà, català i anglès.",
		skipToContent: "Saltar al contingut",
		themeToggle: "Canviar tema",
	},
	en: {
		nav: { cv: "CV", services: "Services", contact: "Contact" },
		heroGreeting: "Hi, I'm",
		heroIntro:
			"This is the digital version of my CV: the same content as the PDF, easier to read on mobile or in the browser.",
		downloadPdf: "Download PDF",
		viewProfiles: "View profiles",
		sectionProfile: "Professional profile",
		sectionExperience: "Professional experience",
		sectionEducation: "Education",
		sectionSkills: "Skills",
		sectionAvailability: "Additional information",
		experienceSubtitle:
			"The same roles as the PDF, with the detail of each one.",
		softSkills: "Soft skills",
		hardSkills: "Hard skills",
		languages: "Languages",
		additionalTitle: "Additional information",
		profilesTitle: "Profiles",
		profilesSubtitle:
			"Three takes on the same CV, depending on the role you are hiring for.",
		viewProfile: "View profile",
		ctaText:
			"Prefer the classic document? Download the PDF or write to me directly.",
		sendEmail: "Send email",
		servicesTitle: "Services",
		servicesSubtitle: "What I do",
		servicesIntro: "These are the areas where I can contribute from day one.",
		contactTitle: "Contact",
		contactSubtitle: "Got a role or want to talk? Write to me.",
		contactIntro:
			"Available immediately for logistics, warehouse, retail and customer service roles.",
		whatsappTitle: "WhatsApp",
		whatsappSub: "The fastest way: I reply within the day.",
		whatsappCta: "Open WhatsApp",
		whatsappPrefill: "Hi Sergio, I am contacting you from senseikatana.com",
		orWrite: "Or write to me with this form",
		formName: "Your name",
		formEmail: "Your email",
		formMsg: "Tell me…",
		send: "Send message",
		profileSkills: "Skills",
		profileExperience: "Experience",
		profileContact: "Contact",
		backToCv: "Back to CV",
		footerPartOf: "Part of senseikatana.com",
		seoDescription:
			"Digital CV of Sergio Jurado Casado: profile, experience, education and PDF download in Spanish, Catalan and English.",
		skipToContent: "Skip to content",
		themeToggle: "Toggle theme",
	},
};

export const langs: { code: Lang; htmlLang: string; label: string }[] = [
	{ code: "es", htmlLang: "es-ES", label: "ES" },
	{ code: "ca", htmlLang: "ca-ES", label: "CA" },
	{ code: "en", htmlLang: "en-GB", label: "EN" },
];

export const profileIds: ProfileId[] = ["logistica", "fullstack", "generico"];
