import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonButton, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const SemesterCourses: React.FC<DetailPageProps> = ({ match }) => {
    //define the semester state
    const [semesterCourses, setSemesterCourses] = useState<any>({
        Name:'',
        AcademicYear: '',
        CoursesTaught: []
    });
    //retrieve data from the api 
    const url = `https://w0417378-apim.azure-api.net/semesters/${match.params.id}`

    useEffect(() => {
        getData(data => {
            setSemesterCourses(data)
          },url)
        
    }, [])

    // refresh
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        // console.log('Begin async operation');
        getData(data => {
            setSemesterCourses(data)
            event.detail.complete() //stops the spinner
          },url)

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonIcon name="arrow-back" ios="ios-arrow-back"></IonIcon>
                        <IonBackButton text="Back"  color="primary" />
                    </IonButtons>
                    
                    <IonTitle>Academic Years/{semesterCourses.AcademicYear}/{semesterCourses.Name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon="arrow-dropdown"
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing...">
                    </IonRefresherContent>
                </IonRefresher>
                <IonTitle color="primary" size="large" className="subTitleStyle">Courses: </IonTitle>
                <IonList>
                    {
                        semesterCourses.CoursesTaught.map((course: any,index:number) => {
                            return (
                                <IonItem
                                    routerLink={`/academicyears/semesters/courses/${course.Id}`}
                                    detail={true}
                                    key={index}>
                                    {course.Title}
                                </IonItem>
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </IonPage>

    );
};

export default SemesterCourses;
