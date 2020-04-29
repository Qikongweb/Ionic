import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import AcademicYears from './pages/AcademicYears';
import Courses from './pages/Courses';
import DiplomaPrograms from './pages/DiplomaPrograms';
import Instructors from './pages/Instructors';
import Semesters from './components/Semesters';
import SemesterCourses from './components/SemesterCourses';
import CourseDetails from './components/CourseDetails';
import CoursesTaught from './components/CoursesTaught';
import AcademicAdvisors from './components/AcademicAdvisors';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/academicyears" component={AcademicYears} exact={true} />
          <Route path="/academicyears/:id" component={Semesters} exact={true} />
          <Route path="/academicyears/semesters/:id" component={SemesterCourses} exact={true} />
          <Route path="/academicyears/semesters/courses/:id" component={CourseDetails} exact={true} />

          <Route path="/courses" component={Courses} exact={true} />
          <Route path="/courses/:id" component={CourseDetails} exact={true} />
          
          <Route path="/diplomaprograms" component={DiplomaPrograms} />
          <Route path="/diplomaprograms/:id" component={AcademicAdvisors} />

          <Route path="/instructors" component={Instructors} exact={true} />
          <Route path="/instructors/:id" component={CoursesTaught} exact={true} />

          <Route path="/" render={() => <Redirect to="/academicyears" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Academic Years" href="/academicyears">
            <IonIcon icon={triangle} />
            <IonLabel>Academic Years</IonLabel>
          </IonTabButton>
          <IonTabButton tab="courses" href="/courses">
            <IonIcon icon={ellipse} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="diplomaprograms" href="/diplomaprograms">
            <IonIcon icon={square} />
            <IonLabel>Diploma Programs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="instructors" href="/instructors">
            <IonIcon icon={square} />
            <IonLabel>Instructors</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
