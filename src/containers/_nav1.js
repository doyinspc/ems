export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/mainpage',
      icon: 'cil-speedometer',
      badge: {
        color: 'info',
        text: '',
      }
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Academic Calendar',
        to: '/sessions',
        icon: 'cil-calendar',
        badge: {
          color: 'info',
          text: '',
        }
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Staff']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Staff',
      to: '/staffs',
      icon: 'cil-user',
    },{
      _tag: 'CSidebarNavItem',
      name: 'Students',
      to: '/students',
      icon: 'cil-user',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Add Staff',
      to: '/theme/typography',
      icon: 'cil-user-follow',
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Settings']
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Setting',
      route: '/pages',
      icon: 'cil-setting',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'School',
          to: '/schools',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Departments',
          to: '/departments',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Subjects',
          to: '/subjects',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Class',
          to: '/clasz',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Psychomoto/Skills',
          to: '/404',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Behavior',
          to: '/404',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Fees',
          to: '/404',
        }
      ],
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Academics',
      route: '/pages',
      icon: 'cil-setting',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Calendar',
          to: '/sessions',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Class Allocation',
          to: '/departments',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Subject Allocation',
          to: '/subjects',
        }
        
      ],
    }
  ]
  
  