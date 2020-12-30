//import Swal from 'sweetalert2';
export const API_PATHS = process.env.REACT_APP_API_PATHS;
export const API_PATH_SETTING = process.env.REACT_APP_API_PATH_SETTING;
export const API_PATH_STUDENT = process.env.REACT_APP_API_PATH_STUDENT;
export const API_PATH_STAFF = process.env.REACT_APP_API_PATH_SETTING;
export const SERVER_PATHS = process.env.REACT_APP_SERVER_PATHS;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const MAIN_TOKEN ='';
export const PICS = process.env.REACT_APP_PHOTO;
export const imgx = process.env.REACT_APP_PHOTO;
export const imgb = process.env.REACT_APP_BG;
export const gradesjson = 'json/grades.json'
export const axiosConfig = {
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    }
  };
export const axiosConfig1 = {
    headers: {
        "Content-Type": "multipart/form-data",
    }
  };
export const callError = (err) =>{
  /* Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: err,
    showConfirmButton: false,
    timer: 1000
  }) */
}
export const callSuccess = (err) =>{
  /* Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: err,
    showConfirmButton: false,
    timer: 1000
  }) */
}
export const checkImage = imageSrc =>{
      var img = new Image();
      try{
        img.src = imageSrc;
        return true;
      }catch(err){
        return false;
      }

  }
export const timeConvert = date =>{
    return '';
}
export const setElement=(id, valueToSet)=>{
  document.getElementById(id).value = valueToSet;
}
export const allgender = {
   'male':'male',
   'Female':'Female'
  };
export const allrelations = {
    'Father':'Father',
    'Mother':'Mother',
    'Aunt':'Aunt',
    'Uncle':'Uncle',
    'Grandparent':'Grandparent',
    'Sponsor':'Sponsor',
   };
export const alllocationsObj = [
{'value':1, 'label':'Kainji'},
{'value':2, 'label':'Jebba'}
];
export const statuss = {
    1 :'Low',
    2 :'Normal',
    3 :'High',
    4 :'Emergency'
  };
export const statussobj = [
    {'value':1, 'label':'Low'},
    {'value':2, 'label':'Normal'},
    {'value':3, 'label':'High'},
    {'value':4, 'label':'Emergency'}
  ];

export const controls = {
    0: {
      name:'Staff',
      data:{
        0:'Bio Data & Employment',
        1:'Education History',
        2:'Professional Certificate',
        3:'Work Experience',
        4:'Leave Request History',
        5:'Job Role',
        6:'Performance',
        7:'Report Commendations/Sanctions',
        8:'Audit trail',
        9:'Access',
      }
    },
    1: {
      name:'Student',
      data:{
        0:'Biodata',
        1:'Academic',
        2:'Financial',
      }
    },
    2: {
      name:'Setting',
      data:[
        {
          id:1,
          name:'STAFF',
          icon:'/icons/staff.png',
          links:'/calendar',
          submenu:[
            {
              id:1,
              name:'ADD STAFF',
              icon:'/icons/adduser.png',
              links:'/addstaff',
              description:'Add a new staff to the database'
            },{
              id:2,
              name:'CURRENT STAFF',
              icon:'/icons/usergood.png',
              links:'/staffs/1',
              description:'All staff currently in employment'
            },{
              id:3,
              name:'EX STAFF',
              icon:'/icons/userbad.png',
              links:'/staffs/2',
              description:'All staff no longer in company service'
            }
          ]
        },
        {
          id:2,
          name:'STUDENT',
          icon:'/icons/student.png',
          links:'/calendar',
          submenu:[
              {
                id:1,
                name:'ADD STUDENT',
                icon:'/icons/adduser.png',
                links:'/addstudent',
                description:'Add a new student to the database'
              },{
                id:2,
                name:'CURRENT STUDENT',
                icon:'/icons/usergood.png',
                links:'/students/1',
                description:'All students in school base on active term'
              },{
                id:3,
                name:'EX STUDENT',
                icon:'/icons/userbad.png',
                links:'/students/2',
                description:'All students no longer in the school'
              }
            ]
        },
        {
          id:3,
          name:'CALENDAR',
          icon:'/icons/calendar.png',
          links:'/setting/3/',
          submenu:[
            {
            id:1,
            name:'TERMS',
            icon:'/icons/calendar.png',
            links:'/setting/3/',
            submenu:[
              {
                id:1,
                name:'TERMLY ASSESSMENTS',
                icon:'/icons/term_assessment.png',
                links:'/setting/3/',
                description:'Prepare academic assessment parameters for the term'
              },
              {
                id:2,
                name:'BEHAVIOR',
                icon:'/icons/term_behavior.png',
                links:'/setting/3/',
                description:'Prepare behavioral assessment parameters for the term'
              },
              {
                id:3,
                name:'SKILLS',
                icon:'/icons/term_skill.png',
                links:'/setting/3/',
                description:'Prepare psychomoto assessment parameters for the term'
              },{
                id:4,
                name:'CLASS ALLOCATION',
                icon:'/icons/term_class_allocation.png',
                links:'/setting/3/',
                description:'Allocate classes to teachers for management and supervision'
              },{
                id:5,
                name:'SUBJECT ALLOCATION',
                icon:'/icons/term_subject_allocation.png',
                links:'/setting/3/',
                description:'Allocate subjects to teachers to teach and evaluate'
              },{
                id:6,
                name:'TIMETABLE',
                icon:'/icons/term_timetable.png',
                links:'/setting/3/',
                description:'Prepare class timetable for the term'
              },
              {
                id:6,
                name:'CLASS FEES',
                icon:'/icons/term_fee.png',
                links:'/setting/3/',
                description:'Prepare school fees to be paid by students for the term'
              },
            ]

          },
          {
            id:3,
            name:'MAINTENANCE',
            icon:'/icons/calendar.png',
            links:'/calendar',
          },
          {
            id:3,
            name:'ANALYSIS',
            icon:'/icons/calendar.png',
            links:'/calendar',
          }
        ]
        },
        {
          id:4,
          name:'SCHOOL',
          icon:'/icons/school.png',
          links:'/school'
        },
        {
          id:5,
          name:'DEPARTMENT',
          icon:'/icons/department.png',
          links:'/department',
          submenu:[]
        },
        {
          id:6,
          name:'SUBJECTS',
          icon:'/icons/subject.png',
          links:'/subject',
          submenu:[]
        },{
          id:7,
          name:'ADMISSION',
          icon:'/icons/admission.png',
          links:'/admission',
          submenu:[{
            id:3,
            name:'ADMISSIONS',
            icon:'/icons/calendar.png',
            links:'/calendar',
            submenu:[]
          }]
        },
        {id:8,
          name:'TIMETABLE',
          icon:'/icons/timetable.png',
          links:'/timetable',
          submenu:[]
        },
        
        {
          id:9,
          name:'CLASS',
          icon:'/icons/class.png',
          links:'/clasz',
          submenu:[{
            id:3,
            name:'CLASS UNIT',
            icon:'/icons/class.png',
            links:'/calendar',
            submenu:[]
          }]
        },
        {
          id:10,
          name:'ASSESSMENT',
          icon:'/icons/assessment.png',
          links:'/assessment',
          submenu:[]
          
        },
        {
          id:11,
          name:'SKILLS',
          icon:'/icons/skill.png',
          links:'/skill',
          submenu:{
            id:3,
            name:'TERMS',
            icon:'/icons/skill.png',
            links:'/skill',
            submenu:[]
          }
        },
        {
          id:12,
          name:'BEHAVIORS',
          icon:'/icons/behavior.png',
          links:'/behavior',
          submenu:[]
        },
        {
          id:13,
          name:'GRADES',
          icon:'/icons/grade.png',
          links:'/grade',
          submenu:{
            id:3,
            name:'GRADING',
            icon:'/icons/grade.png',
            links:'/calendar',
            submenu:[]
          }
        },
        {
          id:14,
          name:'REPORT CARD',
          icon:'/icons/report.png',
          links:'/report',
          submenu:[]
        },
        {
          id:15,
          name:'FEES',
          icon:'/icons/fee.png',
          links:'/fee',
          submenu:[]
        },
        {
          id:16,
          name:'INVENTORY',
          icon:'/icons/inventory.png',
          links:'/inventory',
          submenu:[{
            id:3,
            name:'TERMS',
            icon:'/icons/calendar.png',
            links:'/calendar',
          }]
        },
        {
          id:17,
          name:'MAINTENANCE',
          icon:'/icons/maintenance.png',
          links:'/maintenance',
          submenu:[{
            id:3,
            name:'TERMS',
            icon:'/icons/calendar.png',
            links:'/calendar',
          }]
        },{
          id:18,
          name:'OFFICE',
          icon:'/icons/office.png',
          links:'/office',
          submenu:[{
            id:3,
            name:'JOB ROLES',
            icon:'/icons/calendar.png',
            links:'/calendar',
          }]
        },{
          id:19,
          name:'RANK/LEVEL',
          icon:'/icons/rank.png',
          links:'/rank',
          submenu:[]
        },{
          id:20,
          name:'NOTIFICATION',
          icon:'/icons/notification.png',
          links:'/notification',
          submenu:[{
            id:3,
            name:'MESSAGE',
            icon:'/icons/notification.png',
            links:'/calendar',
          }]
        },
        
      ]
    }
}
export const access = {
  0: {
        name:'Location/Dashboard',
        data:{
          0:'All locations',
          1:'Kainji',
          2:'Jebba',
          3:'Veiw HouseKeeping Dashboard',
          4:'Veiw Maintenance Dashboard',
          5:'Veiw Employee Dashboard',
        }
      },
  1: {
        name:'Guest',
        data: {
              0:'All',
              1:'Veiw Guest Information',
              2:'Veiw Guest Complaints',
              3:'Send request for guest feedback'
              }
      },
  2: {
        name:'Booking',
        data : {
            0:'All',
            1:'Log booking activities',
            2:'Veiw reports',
            3:'Manage Houses',
            4:'Manage Rooms'
          }
      },
  3: {
      name:'Inventory',
      data : {
          0:'All',
          1:'Make inventory Request',
          2:'Veiw Reports',
          3:'Approve Inventory request',
          4:'Manage Inventory Categories',
          5:'Manage Inventories List'
        }
    },
  4: {
    name:'Maintenance',
    data : {
      0:'All',
      1:'Apply for Maintenance',
      2:'Veiw Reports',
      3:'Approve Maintenance request',
      4:'Manage Maintenance Categories',
      5:'Manage Maintenance Issues'
    }
  },
  5: {
    name:'Employee',
    data : {
      0:'All',
      1:'Add Employee',
      2:'Assign Job Role',
      3:'Approve Leave',
      4:'Veiw All Staff Data',
      5:'Change Staff Data',
      6:'Audit Log'
      }
  },
}


export const states = [
  {
    "state": "Adamawa",
    "alias": "adamawa",
    "lgas": [
      "Demsa",
      "Fufure",
      "Ganye",
      "Gayuk",
      "Gombi",
      "Grie",
      "Hong",
      "Jada",
      "Larmurde",
      "Madagali",
      "Maiha",
      "Mayo Belwa",
      "Michika",
      "Mubi North",
      "Mubi South",
      "Numan",
      "Shelleng",
      "Song",
      "Toungo",
      "Yola North",
      "Yola South"
    ]
  },
  {
    "state": "Akwa Ibom",
    "alias": "akwa_ibom",
    "lgas": [
      "Abak",
      "Eastern Obolo",
      "Eket",
      "Esit Eket",
      "Essien Udim",
      "Etim Ekpo",
      "Etinan",
      "Ibeno",
      "Ibesikpo Asutan",
      "Ibiono-Ibom",
      "Ikot Abasi",
      "Ika",
      "Ikono",
      "Ikot Ekpene",
      "Ini",
      "Mkpat-Enin",
      "Itu",
      "Mbo",
      "Nsit-Atai",
      "Nsit-Ibom",
      "Nsit-Ubium",
      "Obot Akara",
      "Okobo",
      "Onna",
      "Oron",
      "Udung-Uko",
      "Ukanafun",
      "Oruk Anam",
      "Uruan",
      "Urue-Offong/Oruko",
      "Uyo"
    ]
  },
  {
    "state": "Anambra",
    "alias": "anambra",
    "lgas": [
      "Aguata",
      "Anambra East",
      "Anaocha",
      "Awka North",
      "Anambra West",
      "Awka South",
      "Ayamelum",
      "Dunukofia",
      "Ekwusigo",
      "Idemili North",
      "Idemili South",
      "Ihiala",
      "Njikoka",
      "Nnewi North",
      "Nnewi South",
      "Ogbaru",
      "Onitsha North",
      "Onitsha South",
      "Orumba North",
      "Orumba South",
      "Oyi"
    ]
  },
  {
    "state": "Ogun",
    "alias": "ogun",
    "lgas": [
      "Abeokuta North",
      "Abeokuta South",
      "Ado-Odo/Ota",
      "Egbado North",
      "Ewekoro",
      "Egbado South",
      "Ijebu North",
      "Ijebu East",
      "Ifo",
      "Ijebu Ode",
      "Ijebu North East",
      "Imeko Afon",
      "Ikenne",
      "Ipokia",
      "Odeda",
      "Obafemi Owode",
      "Odogbolu",
      "Remo North",
      "Ogun Waterside",
      "Shagamu"
    ]
  },
  {
    "state": "Ondo",
    "alias": "ondo",
    "lgas": [
      "Akoko North-East",
      "Akoko North-West",
      "Akoko South-West",
      "Akoko South-East",
      "Akure North",
      "Akure South",
      "Ese Odo",
      "Idanre",
      "Ifedore",
      "Ilaje",
      "Irele",
      "Ile Oluji/Okeigbo",
      "Odigbo",
      "Okitipupa",
      "Ondo West",
      "Ose",
      "Ondo East",
      "Owo"
    ]
  },
  {
    "state": "Rivers",
    "alias": "rivers",
    "lgas": [
      "Abua/Odual",
      "Ahoada East",
      "Ahoada West",
      "Andoni",
      "Akuku-Toru",
      "Asari-Toru",
      "Bonny",
      "Degema",
      "Emuoha",
      "Eleme",
      "Ikwerre",
      "Etche",
      "Gokana",
      "Khana",
      "Obio/Akpor",
      "Ogba/Egbema/Ndoni",
      "Ogu/Bolo",
      "Okrika",
      "Omuma",
      "Opobo/Nkoro",
      "Oyigbo",
      "Port Harcourt",
      "Tai"
    ]
  },
  {
    "state": "Bauchi",
    "alias": "bauchi",
    "lgas": [
      "Alkaleri",
      "Bauchi",
      "Bogoro",
      "Damban",
      "Darazo",
      "Dass",
      "Gamawa",
      "Ganjuwa",
      "Giade",
      "Itas/Gadau",
      "Jama'are",
      "Katagum",
      "Kirfi",
      "Misau",
      "Ningi",
      "Shira",
      "Tafawa Balewa",
      "Toro",
      "Warji",
      "Zaki"
    ]
  },
  {
    "state": "Benue",
    "alias": "benue",
    "lgas": [
      "Agatu",
      "Apa",
      "Ado",
      "Buruku",
      "Gboko",
      "Guma",
      "Gwer East",
      "Gwer West",
      "Katsina-Ala",
      "Konshisha",
      "Kwande",
      "Logo",
      "Makurdi",
      "Obi",
      "Ogbadibo",
      "Ohimini",
      "Oju",
      "Okpokwu",
      "Oturkpo",
      "Tarka",
      "Ukum",
      "Ushongo",
      "Vandeikya"
    ]
  },
  {
    "state": "Borno",
    "alias": "borno",
    "lgas": [
      "Abadam",
      "Askira/Uba",
      "Bama",
      "Bayo",
      "Biu",
      "Chibok",
      "Damboa",
      "Dikwa",
      "Guzamala",
      "Gubio",
      "Hawul",
      "Gwoza",
      "Jere",
      "Kaga",
      "Kala/Balge",
      "Konduga",
      "Kukawa",
      "Kwaya Kusar",
      "Mafa",
      "Magumeri",
      "Maiduguri",
      "Mobbar",
      "Marte",
      "Monguno",
      "Ngala",
      "Nganzai",
      "Shani"
    ]
  },
  {
    "state": "Bayelsa",
    "alias": "bayelsa",
    "lgas": [
      "Brass",
      "Ekeremor",
      "Kolokuma/Opokuma",
      "Nembe",
      "Ogbia",
      "Sagbama",
      "Southern Ijaw",
      "Yenagoa"
    ]
  },
  {
    "state": "Cross River",
    "alias": "cross_river",
    "lgas": [
      "Abi",
      "Akamkpa",
      "Akpabuyo",
      "Bakassi",
      "Bekwarra",
      "Biase",
      "Boki",
      "Calabar Municipal",
      "Calabar South",
      "Etung",
      "Ikom",
      "Obanliku",
      "Obubra",
      "Obudu",
      "Odukpani",
      "Ogoja",
      "Yakuur",
      "Yala"
    ]
  },
  {
    "state": "Delta",
    "alias": "delta",
    "lgas": [
      "Aniocha North",
      "Aniocha South",
      "Bomadi",
      "Burutu",
      "Ethiope West",
      "Ethiope East",
      "Ika North East",
      "Ika South",
      "Isoko North",
      "Isoko South",
      "Ndokwa East",
      "Ndokwa West",
      "Okpe",
      "Oshimili North",
      "Oshimili South",
      "Patani",
      "Sapele",
      "Udu",
      "Ughelli North",
      "Ukwuani",
      "Ughelli South",
      "Uvwie",
      "Warri North",
      "Warri South",
      "Warri South West"
    ]
  },
  {
    "state": "Ebonyi",
    "alias": "ebonyi",
    "lgas": [
      "Abakaliki",
      "Afikpo North",
      "Ebonyi",
      "Afikpo South",
      "Ezza North",
      "Ikwo",
      "Ezza South",
      "Ivo",
      "Ishielu",
      "Izzi",
      "Ohaozara",
      "Ohaukwu",
      "Onicha"
    ]
  },
  {
    "state": "Edo",
    "alias": "edo",
    "lgas": [
      "Akoko-Edo",
      "Egor",
      "Esan Central",
      "Esan North-East",
      "Esan South-East",
      "Esan West",
      "Etsako Central",
      "Etsako East",
      "Etsako West",
      "Igueben",
      "Ikpoba Okha",
      "Orhionmwon",
      "Oredo",
      "Ovia North-East",
      "Ovia South-West",
      "Owan East",
      "Owan West",
      "Uhunmwonde"
    ]
  },
  {
    "state": "Ekiti",
    "alias": "ekiti",
    "lgas": [
      "Ado Ekiti",
      "Efon",
      "Ekiti East",
      "Ekiti South-West",
      "Ekiti West",
      "Emure",
      "Gbonyin",
      "Ido Osi",
      "Ijero",
      "Ikere",
      "Ilejemeje",
      "Irepodun/Ifelodun",
      "Ikole",
      "Ise/Orun",
      "Moba",
      "Oye"
    ]
  },
  {
    "state": "Enugu",
    "alias": "enugu",
    "lgas": [
      "Awgu",
      "Aninri",
      "Enugu East",
      "Enugu North",
      "Ezeagu",
      "Enugu South",
      "Igbo Etiti",
      "Igbo Eze North",
      "Igbo Eze South",
      "Isi Uzo",
      "Nkanu East",
      "Nkanu West",
      "Nsukka",
      "Udenu",
      "Oji River",
      "Uzo Uwani",
      "Udi"
    ]
  },
  {
    "state": "Federal Capital Territory",
    "alias": "abuja",
    "lgas": [
      "Abaji",
      "Bwari",
      "Gwagwalada",
      "Kuje",
      "Kwali",
      "Municipal Area Council"
    ]
  },
  {
    "state": "Gombe",
    "alias": "gombe",
    "lgas": [
      "Akko",
      "Balanga",
      "Billiri",
      "Dukku",
      "Funakaye",
      "Gombe",
      "Kaltungo",
      "Kwami",
      "Nafada",
      "Shongom",
      "Yamaltu/Deba"
    ]
  },
  {
    "state": "Jigawa",
    "alias": "jigawa",
    "lgas": [
      "Auyo",
      "Babura",
      "Buji",
      "Biriniwa",
      "Birnin Kudu",
      "Dutse",
      "Gagarawa",
      "Garki",
      "Gumel",
      "Guri",
      "Gwaram",
      "Gwiwa",
      "Hadejia",
      "Jahun",
      "Kafin Hausa",
      "Kazaure",
      "Kiri Kasama",
      "Kiyawa",
      "Kaugama",
      "Maigatari",
      "Malam Madori",
      "Miga",
      "Sule Tankarkar",
      "Roni",
      "Ringim",
      "Yankwashi",
      "Taura"
    ]
  },
  {
    "state": "Oyo",
    "alias": "oyo",
    "lgas": [
      "Afijio",
      "Akinyele",
      "Atiba",
      "Atisbo",
      "Egbeda",
      "Ibadan North",
      "Ibadan North-East",
      "Ibadan North-West",
      "Ibadan South-East",
      "Ibarapa Central",
      "Ibadan South-West",
      "Ibarapa East",
      "Ido",
      "Ibarapa North",
      "Irepo",
      "Iseyin",
      "Itesiwaju",
      "Iwajowa",
      "Kajola",
      "Lagelu",
      "Ogbomosho North",
      "Ogbomosho South",
      "Ogo Oluwa",
      "Olorunsogo",
      "Oluyole",
      "Ona Ara",
      "Orelope",
      "Ori Ire",
      "Oyo",
      "Oyo East",
      "Saki East",
      "Saki West",
      "Surulere Oyo State"
    ]
  },
  {
    "state": "Imo",
    "alias": "imo",
    "lgas": [
      "Aboh Mbaise",
      "Ahiazu Mbaise",
      "Ehime Mbano",
      "Ezinihitte",
      "Ideato North",
      "Ideato South",
      "Ihitte/Uboma",
      "Ikeduru",
      "Isiala Mbano",
      "Mbaitoli",
      "Isu",
      "Ngor Okpala",
      "Njaba",
      "Nkwerre",
      "Nwangele",
      "Obowo",
      "Oguta",
      "Ohaji/Egbema",
      "Okigwe",
      "Orlu",
      "Orsu",
      "Oru East",
      "Oru West",
      "Owerri Municipal",
      "Owerri North",
      "Unuimo",
      "Owerri West"
    ]
  },
  {
    "state": "Kaduna",
    "alias": "kaduna",
    "lgas": [
      "Birnin Gwari",
      "Chikun",
      "Giwa",
      "Ikara",
      "Igabi",
      "Jaba",
      "Jema'a",
      "Kachia",
      "Kaduna North",
      "Kaduna South",
      "Kagarko",
      "Kajuru",
      "Kaura",
      "Kauru",
      "Kubau",
      "Kudan",
      "Lere",
      "Makarfi",
      "Sabon Gari",
      "Sanga",
      "Soba",
      "Zangon Kataf",
      "Zaria"
    ]
  },
  {
    "state": "Kebbi",
    "alias": "kebbi",
    "lgas": [
      "Aleiro",
      "Argungu",
      "Arewa Dandi",
      "Augie",
      "Bagudo",
      "Birnin Kebbi",
      "Bunza",
      "Dandi",
      "Fakai",
      "Gwandu",
      "Jega",
      "Kalgo",
      "Koko/Besse",
      "Maiyama",
      "Ngaski",
      "Shanga",
      "Suru",
      "Sakaba",
      "Wasagu/Danko",
      "Yauri",
      "Zuru"
    ]
  },
  {
    "state": "Kano",
    "alias": "kano",
    "lgas": [
      "Ajingi",
      "Albasu",
      "Bagwai",
      "Bebeji",
      "Bichi",
      "Bunkure",
      "Dala",
      "Dambatta",
      "Dawakin Kudu",
      "Dawakin Tofa",
      "Doguwa",
      "Fagge",
      "Gabasawa",
      "Garko",
      "Garun Mallam",
      "Gezawa",
      "Gaya",
      "Gwale",
      "Gwarzo",
      "Kabo",
      "Kano Municipal",
      "Karaye",
      "Kibiya",
      "Kiru",
      "Kumbotso",
      "Kunchi",
      "Kura",
      "Madobi",
      "Makoda",
      "Minjibir",
      "Nasarawa",
      "Rano",
      "Rimin Gado",
      "Rogo",
      "Shanono",
      "Takai",
      "Sumaila",
      "Tarauni",
      "Tofa",
      "Tsanyawa",
      "Tudun Wada",
      "Ungogo",
      "Warawa",
      "Wudil"
    ]
  },
  {
    "state": "Kogi",
    "alias": "kogi",
    "lgas": [
      "Ajaokuta",
      "Adavi",
      "Ankpa",
      "Bassa",
      "Dekina",
      "Ibaji",
      "Idah",
      "Igalamela Odolu",
      "Ijumu",
      "Kogi",
      "Kabba/Bunu",
      "Lokoja",
      "Ofu",
      "Mopa Muro",
      "Ogori/Magongo",
      "Okehi",
      "Okene",
      "Olamaboro",
      "Omala",
      "Yagba East",
      "Yagba West"
    ]
  },
  {
    "state": "Osun",
    "alias": "osun",
    "lgas": [
      "Aiyedire",
      "Atakunmosa West",
      "Atakunmosa East",
      "Aiyedaade",
      "Boluwaduro",
      "Boripe",
      "Ife East",
      "Ede South",
      "Ife North",
      "Ede North",
      "Ife South",
      "Ejigbo",
      "Ife Central",
      "Ifedayo",
      "Egbedore",
      "Ila",
      "Ifelodun",
      "Ilesa East",
      "Ilesa West",
      "Irepodun",
      "Irewole",
      "Isokan",
      "Iwo",
      "Obokun",
      "Odo Otin",
      "Ola Oluwa",
      "Olorunda",
      "Oriade",
      "Orolu",
      "Osogbo"
    ]
  },
  {
    "state": "Sokoto",
    "alias": "sokoto",
    "lgas": [
      "Gudu",
      "Gwadabawa",
      "Illela",
      "Isa",
      "Kebbe",
      "Kware",
      "Rabah",
      "Sabon Birni",
      "Shagari",
      "Silame",
      "Sokoto North",
      "Sokoto South",
      "Tambuwal",
      "Tangaza",
      "Tureta",
      "Wamako",
      "Wurno",
      "Yabo",
      "Binji",
      "Bodinga",
      "Dange Shuni",
      "Goronyo",
      "Gada"
    ]
  },
  {
    "state": "Plateau",
    "alias": "plateau",
    "lgas": [
      "Bokkos",
      "Barkin Ladi",
      "Bassa",
      "Jos East",
      "Jos North",
      "Jos South",
      "Kanam",
      "Kanke",
      "Langtang South",
      "Langtang North",
      "Mangu",
      "Mikang",
      "Pankshin",
      "Qua'an Pan",
      "Riyom",
      "Shendam",
      "Wase"
    ]
  },
  {
    "state": "Taraba",
    "alias": "taraba",
    "lgas": [
      "Ardo Kola",
      "Bali",
      "Donga",
      "Gashaka",
      "Gassol",
      "Ibi",
      "Jalingo",
      "Karim Lamido",
      "Kumi",
      "Lau",
      "Sardauna",
      "Takum",
      "Ussa",
      "Wukari",
      "Yorro",
      "Zing"
    ]
  },
  {
    "state": "Yobe",
    "alias": "yobe",
    "lgas": [
      "Bade",
      "Bursari",
      "Damaturu",
      "Fika",
      "Fune",
      "Geidam",
      "Gujba",
      "Gulani",
      "Jakusko",
      "Karasuwa",
      "Machina",
      "Nangere",
      "Nguru",
      "Potiskum",
      "Tarmuwa",
      "Yunusari",
      "Yusufari"
    ]
  },
  {
    "state": "Zamfara",
    "alias": "zamfara",
    "lgas": [
      "Anka",
      "Birnin Magaji/Kiyaw",
      "Bakura",
      "Bukkuyum",
      "Bungudu",
      "Gummi",
      "Gusau",
      "Kaura Namoda",
      "Maradun",
      "Shinkafi",
      "Maru",
      "Talata Mafara",
      "Tsafe",
      "Zurmi"
    ]
  },
  {
    "state": "Lagos",
    "alias": "lagos",
    "lgas": [
      "Agege",
      "Ajeromi-Ifelodun",
      "Alimosho",
      "Amuwo-Odofin",
      "Badagry",
      "Apapa",
      "Epe",
      "Eti Osa",
      "Ibeju-Lekki",
      "Ifako-Ijaiye",
      "Ikeja",
      "Ikorodu",
      "Kosofe",
      "Lagos Island",
      "Mushin",
      "Lagos Mainland",
      "Ojo",
      "Oshodi-Isolo",
      "Shomolu",
      "Surulere Lagos State"
    ]
  },
  {
    "state": "Katsina",
    "alias": "katsina",
    "lgas": [
      "Bakori",
      "Batagarawa",
      "Batsari",
      "Baure",
      "Bindawa",
      "Charanchi",
      "Danja",
      "Dandume",
      "Dan Musa",
      "Daura",
      "Dutsi",
      "Dutsin Ma",
      "Faskari",
      "Funtua",
      "Ingawa",
      "Jibia",
      "Kafur",
      "Kaita",
      "Kankara",
      "Kankia",
      "Katsina",
      "Kurfi",
      "Kusada",
      "Mai'Adua",
      "Malumfashi",
      "Mani",
      "Mashi",
      "Matazu",
      "Musawa",
      "Rimi",
      "Sabuwa",
      "Safana",
      "Sandamu",
      "Zango"
    ]
  },
  {
    "state": "Kwara",
    "alias": "kwara",
    "lgas": [
      "Asa",
      "Baruten",
      "Edu",
      "Ilorin East",
      "Ifelodun",
      "Ilorin South",
      "Ekiti Kwara State",
      "Ilorin West",
      "Irepodun",
      "Isin",
      "Kaiama",
      "Moro",
      "Offa",
      "Oke Ero",
      "Oyun",
      "Pategi"
    ]
  },
  {
    "state": "Nasarawa",
    "alias": "nasarawa",
    "lgas": [
      "Akwanga",
      "Awe",
      "Doma",
      "Karu",
      "Keana",
      "Keffi",
      "Lafia",
      "Kokona",
      "Nasarawa Egon",
      "Nasarawa",
      "Obi",
      "Toto",
      "Wamba"
    ]
  },
  {
    "state": "Niger",
    "alias": "niger",
    "lgas": [
      "Agaie",
      "Agwara",
      "Bida",
      "Borgu",
      "Bosso",
      "Chanchaga",
      "Edati",
      "Gbako",
      "Gurara",
      "Katcha",
      "Kontagora",
      "Lapai",
      "Lavun",
      "Mariga",
      "Magama",
      "Mokwa",
      "Mashegu",
      "Moya",
      "Paikoro",
      "Rafi",
      "Rijau",
      "Shiroro",
      "Suleja",
      "Tafa",
      "Wushishi"
    ]
  },
  {
    "state": "Abia",
    "alias": "abia",
    "lgas": [
      "Aba North",
      "Arochukwu",
      "Aba South",
      "Bende",
      "Isiala Ngwa North",
      "Ikwuano",
      "Isiala Ngwa South",
      "Isuikwuato",
      "Obi Ngwa",
      "Ohafia",
      "Osisioma",
      "Ugwunagbo",
      "Ukwa East",
      "Ukwa West",
      "Umuahia North",
      "Umuahia South",
      "Umu Nneochi"
    ]
  }
]
