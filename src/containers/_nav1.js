export default [
    {
      _tag: 'CSidebarNavItem',
      name: 'Home',
      to: '/mainpage',
      icon: 'cil-home',
      badge: {
        color: 'info',
        text: '',
      }
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Profile',
      to: '/user',
      icon: 'cil-user',
      badge: {
        color: 'info',
        text: '',
      }
    },
   
    
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Admin',
      route: '/page',
      icon: 'cil-building',
      _children: [
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
          name: 'Staff',
          to: '/staffs',
          icon: 'cil-people',
          badge: {
            color: 'info',
            text: '',
        }
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Student',
          to: '/students',
          icon: 'cil-people',
          badge: {
            color: 'info',
            text: '',
        }
        }, {
          _tag: 'CSidebarNavItem',
          name: 'Settings',
          to: '/settings',
          icon: 'cil-settings',
          badge: {
            color: 'info',
            text: '',
          }
      },
      ]
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Academics',
      route: '/page',
      icon: 'cil-library-building',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Class',
          to: '/classes',
          icon: 'cil-wc',
          badge: {
            color: 'info',
            text: '',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Subject',
          to: '/myclass',
          icon: 'cil-book',
          badge: {
            color: 'info',
            text: '',
          }
        },{
          _tag: 'CSidebarNavItem',
          name: 'Assessment',
          to: '/assessment',
          icon: 'cil-pencil',
          badge: {
            color: 'info',
            text: '',
          }
        },{
          _tag: 'CSidebarNavItem',
          name: 'Scheme of Work',
          to: '/myclass',
          icon: 'cil-notes',
          badge: {
            color: 'info',
            text: '',
          }
        },{
          _tag: 'CSidebarNavItem',
          name: 'Lesson Plan',
          to: '/myclass',
          icon: 'cil-book',
          badge: {
            color: 'info',
            text: '',
          }
        },
      ]
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Account',
      route: '/page',
      icon: 'cil-bank',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Fees',
          to: '/fees',
          icon: 'cil-money'
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Inventory',
          to: '/inventorys',
          icon: 'cil-line-weight',
          badge: {
            color: 'info',
            text: '',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Maintenance',
          to: '/maintenances',
          icon: 'cil-paint',
          badge: {
            color: 'info',
            text: '',
          }
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Expense',
          to: '/expense_home',
          icon: 'cil-paint',
          badge: {
            color: 'info',
            text: '',
          }
        }
      ],
    }, 
    {
      _tag: 'CSidebarNavItem',
      name: 'Tutorials',
      to: '/tutorial',
      icon: 'cil-tv',
      badge: {
        color: 'info',
        text: '',
      }
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Logout',
      to: '/logout',
      icon: 'cil-lock-locked',
     
    },
]
  
  