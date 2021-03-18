import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import './scss/prim.css';
import './scss/print.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const MainLayout = React.lazy(() => import('./containers/MainLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const AttendanceStudent = React.lazy(() => import('./views/student/Attendance'));
const AttendanceStaff = React.lazy(() => import('./views/staff/Attendance'));
const Scheme = React.lazy(() => import('./views/staff/Scheme'));
const Results = React.lazy(() => import('./views/staff/Result'));
const Admission = React.lazy(() => import('./views/student/Admission'));
const Admissions = React.lazy(() => import('./views/student/Admissionsx.jsx'));
const Result = React.lazy(() => import('./views/student/Result'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter basename="">
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/results/:clasz/:term" name="result" render={props => <Results {...props}/>} />
              <Route exact path="/scheme/:clasz/:term/:id" name="Scheme Of Work" render={props => <Scheme {...props}/>} />
              <Route exact path="/attendance_staff" name="Staff Attendance" render={props => <AttendanceStaff {...props}/>} />
              <Route exact path="/attendance_student/:clasz" name="Student Attendance" render={props => <AttendanceStudent {...props}/>} />
              <Route exact path="/admission/:admit" name="Admission Letter" render={props => <Admission {...props}/>} />
              <Route exact path="/admissions/:admit" name="Admission Letter" render={props => <Admissions {...props}/>} />
              <Route exact path="/lessonplan/:admit" name="Admission Letter" render={props => <Admission {...props}/>} />
              <Route exact path="/result/:student/:result" name="Report" render={props => <Result {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/mainpage" name="MainPage" render={props => <TheLayout {...props}/>} />
              <Route path="/" name="Home" render={props => <MainLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
