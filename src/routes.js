import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Calendar = React.lazy(() => import('./views/dashboard/Calendar'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Main = React.lazy(() => import('./views/dashboard/Main'));
const MainDashboard = React.lazy(() => import('./views/setting/Dashboard'));
const Settings = React.lazy(() => import('./views/setting/Dashboard'));
const Setting = React.lazy(() => import('./views/setting/Setting'));
const School = React.lazy(() => import('./views/setting/School'));
const Session = React.lazy(() => import('./views/setting/Session'));
const Userx = React.lazy(() => import('./views/staff/UserProfile'));
const Term = React.lazy(() => import('./views/setting/Term'));
const Ca = React.lazy(() => import('./views/setting/Ca'));
const Behavior = React.lazy(() => import('./views/setting/Behavior'));
const Skill = React.lazy(() => import('./views/setting/Skill'));
const Caunit = React.lazy(() => import('./views/setting/Caunit'));
const Behaviorunit = React.lazy(() => import('./views/setting/Behaviorunit'));
const Skillunit = React.lazy(() => import('./views/setting/Skillunit'));
const Catype = React.lazy(() => import('./views/setting/Catype'));
const Department = React.lazy(() => import('./views/setting/Department'));
const Subject = React.lazy(() => import('./views/setting/Subject'));
const Theme = React.lazy(() => import('./views/setting/Theme'));
const Fees = React.lazy(() => import('./views/fee/Fee'));
const FeeHome = React.lazy(() => import('./views/fee/FeeHome'));
const InventoryHome = React.lazy(() => import('./views/inventory/InventoryHome'));
const Inventorys = React.lazy(() => import('./views/inventory/Inventory'));
const ExpenseHome = React.lazy(() => import('./views/expense/ExpenseHome'));
const ExpensesCapital = React.lazy(() => import('./views/expense/ExpensesCapital'));
const ExpensesOverhead = React.lazy(() => import('./views/expense/ExpensesOverhead'));
const ExpensesBankTransfer = React.lazy(() => import('./views/expense/ExpensesBankTransfer'));
const ExpensesImpressTransfer = React.lazy(() => import('./views/expense/ExpensesImpressTransfer'));
const ExpensesIncome = React.lazy(() => import('./views/expense/ExpensesIncome'));
const ExpensesReport = React.lazy(() => import('./views/expense/ExpensesReport'));
const ExpensesSetting = React.lazy(() => import('./views/expense/ExpensesSetting'));
const ExpensesUser = React.lazy(() => import('./views/expense/ExpensesUser'));
const MaintenanceHome = React.lazy(() => import('./views/maintenance/MaintenanceHome'));
const Maintenances = React.lazy(() => import('./views/maintenance/Maintenance'));
const Question = React.lazy(() => import('./views/setting/Theme'));
const Clasz = React.lazy(() => import('./views/setting/Clasz'));
const Claszunit = React.lazy(() => import('./views/setting/Claszunit'));
const Staffs = React.lazy(() => import('./views/staff/Staffs'));
const Staff = React.lazy(() => import('./views/staff/StaffProfile'));
const StaffDashboard = React.lazy(() => import('./views/staff/StaffDashboard'));
const StaffAdd = React.lazy(() => import('./views/staff/StaffAdd'));
const StaffClass = React.lazy(() => import('./views/staff/StaffClass'));
const StaffSubject = React.lazy(() => import('./views/staff/StaffDashboardSubject'));
const Classes = React.lazy(() => import('./views/staff/StudentDashboardClass'));
const AdmissionList = React.lazy(() => import('./views/student/AdmissionList'));
const Admissions = React.lazy(() => import('./views/student/Admissionsx.jsx'));
const Students = React.lazy(() => import('./views/student/Students'));
const Student = React.lazy(() => import('./views/student/StudentProfile'));
const StudentProfile = React.lazy(() => import('./views/student/StudentClassProfile'));
const StudentAdd = React.lazy(() => import('./views/student/StudentAdd'));
const StudentClass = React.lazy(() => import('./views/student/StudentClass'));
const StudentClasses = React.lazy(() => import('./views/student/StudentClasses'));
const StudentSubject = React.lazy(() => import('./views/student/StudentSubject'));
const StudentSubjects = React.lazy(() => import('./views/student/StudentSubjects'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/main', name: 'Dashboard', component: StaffDashboard },
  { path: '/dash', name: 'Dashboardx', component: Dashboard, exact: true  },
  { path: '/school', name: 'School', component: School, exact: true },
  { path: '/department', name: 'Department', component: Department, exact: true },
  { path: '/department/:subject', name: 'Subject', component: Subject, exact: true },
  { path: '/department/:subject/:theme', name: 'Scheme of Work', component: Theme, exact: true },
  { path: '/department/:subject/:theme/:question', name: 'Question Bank', component: Question, exact: true },
  { path: '/catype', name: 'CA Type', component: Catype, exact: true },
  { path: '/fees', name: 'Fee Payments', component: Fees, exact: true },
  { path: '/fee_home', name: 'Fee Page', component: FeeHome, exact: true },
  { path: '/inventorys', name: 'Inventories', component: Inventorys, exact: true },
  { path: '/inventory_home', name: 'Inventory Page', component: InventoryHome, exact: true },
  { path: '/expenses_capital', name: 'Capital Expenses', component: ExpensesCapital, exact: true },
  { path: '/expenses_overhead', name: 'Overhead Expenses', component: ExpensesOverhead, exact: true },
  { path: '/expenses_impress_transfer', name: 'Impress', component: ExpensesImpressTransfer, exact: true },
  { path: '/expenses_bank_transfer', name: 'Bank Transfers', component: ExpensesBankTransfer, exact: true },
  { path: '/expenses_income', name: 'Other Sources of Income', component: ExpensesIncome, exact: true },
  { path: '/expenses_setting', name: 'Expenses Setting', component: ExpensesSetting, exact: true },
  { path: '/expenses_user', name: 'Users', component: ExpensesUser, exact: true },
  { path: '/expense_home', name: 'Expense Page', component: ExpenseHome, exact: true },
  { path: '/maintenances', name: 'Maintenances', component: Maintenances, exact: true },
  { path: '/maintenance_home', name: 'Maintenance Page', component: MaintenanceHome, exact: true },
  { path: '/staffs', name: 'Staffs', component: Staffs, exact: true },
  { path: '/staffs/:staff', name: 'Staff Profile', component: Staff, exact: true },
  { path: '/myclass', name: 'My Classes', component: StaffSubject, exact: true },
  { path: '/classes', name: 'My Classes', component: Classes, exact: true },
  { path: '/staffa', name: 'Add Staff Data', component: StaffAdd, exact: true },
  { path: '/studenta', name: 'Add Student Data', component: StudentAdd, exact: true },
  { path: '/termclass/:term', name: 'Class Teachers', component: StaffClass, exact: true },
  { path: '/termsubject/:term', name: 'Subject Teachers', component: StaffSubject, exact: true },
  { path: '/admission', name: 'Admission', component: AdmissionList, exact: true },
  { path: '/admissions/:id', name: 'Admissions', component: Admissions, exact: true },
  { path: '/students', name: 'Students', component: Students, exact: true },
  { path: '/students/:student', name: 'Student Profile', component: Student, exact: true },
  { path: '/studentcl/:student/:session', name: 'Student Class Profile', component: StudentProfile, exact: true },
  { path: '/studenta', name: 'Add Student Data', component: StudentAdd, exact: true },
  { path: '/studentclass/:term/:clasz', name: 'Student Class', component: StudentClass, exact: true },
  { path: '/studentclasses/:term/:clasz', name: 'Student Classes', component: StudentClasses, exact: true },
  { path: '/studentclass/:term/:clasz/:subject', name: 'Student Subject', component: StudentSubject, exact: true },
  { path: '/studentclass/:term/:clasz/:subject', name: 'Student Subjects', component: StudentSubjects, exact: true },
  { path: '/clasz', name: 'Classes', component: Clasz, exact: true },
  { path: '/clasz/:claszunit', name: 'Class Units', component: Claszunit, exact: true },
  { path: '/sessions', name: 'Session', component: Session, exact: true },
  { path: '/sessions/:term', name: 'Term', component: Term, exact: true  },
  { path: '/sessions/:term/a/:ca', name: 'CA', component: Ca , exact: true},
  { path: '/sessions/:term/a/:ca/:caunit', name: 'CA Unit', component: Caunit , exact: true},
  { path: '/sessions/:term/b/:behavior', name: 'Behaviors', component: Behavior , exact: true},
  { path: '/sessions/:term/s/:skill', name: 'Skills', component: Skill , exact: true},
  { path: '/sessions/:term/b/:behavior/:caunit', name: 'Behabior sub-unit', component: Behaviorunit, exact: true },
  { path: '/sessions/:term/s/:skill/:caunit', name: 'Skill sub-unit', component: Skillunit, exact: true },
  { path: '/mainpage/calendar', name: 'Calendar', component: Calendar, exact: true },
  { path: '/maindashboard', name: 'ClassDashboard', component: MainDashboard , exact: true},
  { path: '/settings', name: 'Settings Dashboard', component: Settings },
  { path: '/setting/:sid/:pid/:qid/:did/:kid/:rid', name: 'Setting', component: Setting },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/user', exact: true,  name: 'User', component: Userx },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
