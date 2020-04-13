export const navItems = [
  {
    title: true,
    name: 'Menú'
  },
  {
    name: ' Início',
    url: 'dashboard',
    icon: 'icon-grid'
  },
  {
    name: ' Administradores',
    url: 'user',
    icon: 'icon-user'
  },
  {
    name: ' Clientes',
    url: 'company',
    icon: 'icon-paper-plane'
  },
  {
    name: ' Proyectos',
    url: 'project',
    icon: 'icon-doc'
  },
  {
    name: ' Showcases',
    url: 'showcase',
    icon: 'icon-book-open'
  },
  {
    name: ' Repositorio',
    url: 'repository',
    icon: 'cui-inbox'
  },
  {
    name: ' Configuraciones',
    url: '/configuration',
    icon: 'cui-cog icons',
    children: [
      {
        name: ' Autor-Proyecto',
        url: 'configuration/author-project',
        icon: 'icon-people',
      },
      {
        name: ' Metodología',
        url: 'configuration/repository',
        icon: 'cui-puzzle'
      }
    ]
  }
];

export const navItems2 = [
  {
    title: true,
    name: 'Menú'
  },
  {
    name: ' Início',
    url: 'dashboard',
    icon: 'icon-grid'
  },
  {
    name: ' Clientes',
    url: 'company',
    icon: 'icon-paper-plane'
  },
  {
    name: ' Proyectos',
    url: 'project',
    icon: 'icon-doc'
  },
  {
    name: ' Showcases',
    url: 'showcase',
    icon: 'icon-book-open'
  },
  {
    name: ' Configuraciones',
    url: '/configuration',
    icon: 'cui-cog icons',
    children: [
      {
        name: '    Autor-Proyecto',
        url: 'configuration/author-project',
        icon: 'icon-people'
      }
    ]
  }
];
