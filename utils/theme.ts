export const PERFIL_THEMES = {
  cidadao: {
    primary: '#2E7D32',      // Verde
    secondary: '#4CAF50',
    accent: '#81C784',
    background: '#E8F5E9',
    text: '#1B5E20',
    gradient: 'from-green-400 to-green-700',
    badge: 'bg-green-100 text-green-800',
    navbar: 'bg-green-700'
  },
  admin_inema: {
    primary: '#0D47A1',      // Azul INEMA
    secondary: '#1976D2',
    accent: '#64B5F6',
    background: '#E3F2FD',
    text: '#0D47A1',
    gradient: 'from-blue-400 to-blue-800',
    badge: 'bg-blue-100 text-blue-800',
    navbar: 'bg-blue-800'
  },
  admin_bombeiros: {
    primary: '#B71C1C',      // Vermelho Bombeiros
    secondary: '#D32F2F',
    accent: '#EF5350',
    background: '#FFEBEE',
    text: '#B71C1C',
    gradient: 'from-red-400 to-red-800',
    badge: 'bg-red-100 text-red-800',
    navbar: 'bg-red-800'
  },
  admin_pna: {
    primary: '#1A237E',      // Azul escuro PNA
    secondary: '#303F9F',
    accent: '#5C6BC0',
    background: '#E8EAF6',
    text: '#1A237E',
    gradient: 'from-indigo-400 to-indigo-800',
    badge: 'bg-indigo-100 text-indigo-800',
    navbar: 'bg-indigo-900'
  },
  super_admin: {
    primary: '#F9A825',      // Dourado
    secondary: '#FDD835',
    accent: '#FFD54F',
    background: '#FFFDE7',
    text: '#F57F17',
    gradient: 'from-yellow-400 to-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800',
    navbar: 'bg-yellow-700'
  }
} as const;

export type Perfil = keyof typeof PERFIL_THEMES;