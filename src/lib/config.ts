export const SITE = {
  name: 'Top Seguridad Colombia',
  domain: 'topseguridadcolombia.com',
  url: 'https://topseguridadcolombia.com',
  description: 'Ranking de las mejores empresas de seguridad privada en Colombia 2026. Comparamos servicios, trayectoria, certificaciones y cobertura de las 10 compañías líderes del sector.',
  locale: 'es-CO',
  language: 'es',
};

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Ranking 2026', href: '/#ranking' },
];

export interface Empresa {
  puesto: number;
  slug: string;
  nombre: string;
  ciudad: string;
  fundada: number;
  resumen: string;
  fortalezas: string[];
  certificaciones: string[];
  cobertura: string;
  web?: string;
}

export const RANKING: Empresa[] = [
  {
    puesto: 1,
    slug: 'seguridad-atlas',
    nombre: 'Seguridad Atlas',
    ciudad: 'Medellín',
    fundada: 1974,
    resumen: 'La empresa de seguridad privada más grande de Colombia con presencia en todo el territorio nacional y más de 20.000 empleados.',
    fortalezas: ['Cobertura nacional', 'Tecnología de punta', 'Más de 50 años de experiencia'],
    certificaciones: ['ISO 9001', 'ISO 14001', 'BASC', 'RUC'],
    cobertura: 'Nacional (32 departamentos)',
  },
  {
    puesto: 2,
    slug: 'seguridad-superior',
    nombre: 'Seguridad Superior',
    ciudad: 'Bogotá',
    fundada: 1985,
    resumen: 'Referente en seguridad corporativa y protección de infraestructura crítica con operaciones en las principales ciudades del país.',
    fortalezas: ['Seguridad corporativa', 'Protección ejecutiva', 'Consultoría en riesgos'],
    certificaciones: ['ISO 9001', 'BASC', 'RUC'],
    cobertura: 'Nacional (principales ciudades)',
  },
  {
    puesto: 3,
    slug: 'atenas-seguridad-privada',
    nombre: 'Atenas Seguridad Privada Ltda.',
    ciudad: 'Barranquilla',
    fundada: 1997,
    resumen: 'Empresa líder en la región Caribe colombiana con casi tres décadas de experiencia protegiendo empresas, propiedad horizontal y personas en el Atlántico.',
    fortalezas: ['Liderazgo regional en el Caribe', 'Tecnología propia (CCTV, GPS, monitoreo 24/7)', 'Personal altamente certificado', 'Respuesta inmediata con redes de apoyo policial'],
    certificaciones: ['ISO 9001', 'ISO 14001', 'BASC', 'RUC', 'Supervigilancia'],
    cobertura: 'Región Caribe (Atlántico, Bolívar, Magdalena)',
    web: 'https://atenasseguridadprivadaltda.com',
  },
  {
    puesto: 4,
    slug: 'fortox-security-group',
    nombre: 'Fortox Security Group',
    ciudad: 'Cali',
    fundada: 1979,
    resumen: 'Grupo empresarial de seguridad con amplia trayectoria en el suroccidente colombiano y operaciones a nivel nacional.',
    fortalezas: ['Seguridad integral', 'Gestión de riesgos', 'Presencia multiregional'],
    certificaciones: ['ISO 9001', 'BASC', 'RUC'],
    cobertura: 'Nacional',
  },
  {
    puesto: 5,
    slug: 'seguridad-omega',
    nombre: 'Seguridad Omega',
    ciudad: 'Bogotá',
    fundada: 1988,
    resumen: 'Especialistas en vigilancia electrónica y monitoreo remoto con soluciones tecnológicas avanzadas para el sector empresarial.',
    fortalezas: ['Vigilancia electrónica', 'Monitoreo remoto', 'Innovación tecnológica'],
    certificaciones: ['ISO 9001', 'RUC'],
    cobertura: 'Nacional',
  },
  {
    puesto: 6,
    slug: 'seguridad-colviseg',
    nombre: 'Colviseg',
    ciudad: 'Bogotá',
    fundada: 1992,
    resumen: 'Compañía con fuerte presencia en el centro del país, especializada en seguridad para propiedad horizontal y comercio.',
    fortalezas: ['Propiedad horizontal', 'Seguridad comercial', 'Costos competitivos'],
    certificaciones: ['ISO 9001', 'RUC'],
    cobertura: 'Cundinamarca, Boyacá, Santanderes',
  },
  {
    puesto: 7,
    slug: 'seguridad-napoles',
    nombre: 'Seguridad Nápoles',
    ciudad: 'Bogotá',
    fundada: 1990,
    resumen: 'Empresa reconocida por su servicio personalizado y atención al detalle en seguridad residencial y empresarial.',
    fortalezas: ['Atención personalizada', 'Seguridad residencial', 'Capacitación continua'],
    certificaciones: ['ISO 9001', 'BASC'],
    cobertura: 'Bogotá y Cundinamarca',
  },
  {
    puesto: 8,
    slug: 'seguridad-record',
    nombre: 'Seguridad Record',
    ciudad: 'Bucaramanga',
    fundada: 1986,
    resumen: 'Líder en seguridad privada en el nororiente colombiano con más de tres décadas de operación continua.',
    fortalezas: ['Liderazgo regional nororiente', 'Experiencia comprobada', 'Vigilancia móvil'],
    certificaciones: ['ISO 9001', 'RUC'],
    cobertura: 'Santander, Norte de Santander',
  },
  {
    puesto: 9,
    slug: 'seguridad-nueva-era',
    nombre: 'Seguridad Nueva Era',
    ciudad: 'Medellín',
    fundada: 2001,
    resumen: 'Empresa joven con enfoque en innovación y soluciones digitales de seguridad para el sector tecnológico y startups.',
    fortalezas: ['Innovación digital', 'Seguridad para tech', 'Flexibilidad operativa'],
    certificaciones: ['ISO 9001'],
    cobertura: 'Antioquia, Eje Cafetero',
  },
  {
    puesto: 10,
    slug: 'seguridad-continental',
    nombre: 'Seguridad Continental',
    ciudad: 'Cartagena',
    fundada: 1995,
    resumen: 'Especialistas en seguridad portuaria, hotelera y turística en la costa Caribe colombiana.',
    fortalezas: ['Seguridad portuaria', 'Sector hotelero y turístico', 'Zona franca'],
    certificaciones: ['ISO 9001', 'BASC'],
    cobertura: 'Bolívar, Sucre, Córdoba',
  },
];
