import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const AdvisingAssignments: React.FC<DetailPageProps> = ({ match }) => {
    //define the semester state
    const [courses, setCourses] = useState<any>({
        FirstName: '',
        LastName: '',
        AdvisingAssignments: [],
        CoursesTaught: []
    });

    //retrieve data from the api 
    const url = `https://w0417378-apim.azure-api.net/instructors/${match.params.id}`
    useEffect(() => {
        getData(data => {
            setCourses(data)
          },url)
        
    }, [])

    // refresh
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getData(data => {
            setCourses(data)
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
                    
                    <IonTitle>Diploma Programs</IonTitle>
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
                <IonTitle color="primary" size="large" className="subTitleStyle">Advising Assignments:</IonTitle>
                <IonList>
                    
                    <IonItem>
                        <IonList>
                            {courses.AdvisingAssignments.length === 0? "None":(
                                courses.AdvisingAssignments.map((item:any,index: number) => {
                                    return (
                                        <>
                                        <IonItem key={index}>{item.AcademicYear} - {item.DiplomaProgram} - {item.DiplomaProgramYear} - {item.DisplomaProgramYearSection}</IonItem>
                                        </>
                                    )
                                })
                            )}
                        </IonList>   
                    </IonItem>
                    
                </IonList>
            </IonContent>
        </IonPage>

    );
};

export default AdvisingAssignments;
