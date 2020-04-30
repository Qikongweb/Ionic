import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonText, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const CoursesTaught: React.FC<DetailPageProps> = ({ match }) => {
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
                    
                    <IonTitle>Instructors</IonTitle>
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
                <h3>Courses taught by {courses.LastName}, {courses.FirstName}</h3>
                <IonList>
                
                    <IonItem>
                        <IonList>
                            {courses.CoursesTaught.length === 0? "None":(
                                courses.CoursesTaught.map((item:any,index: number) => {
                                    return (
                                        <>
                                        <IonItem 
                                            routerLink={`/instructors/courses/${item.Id}`}
                                            key={item.Id}>
                                            {item.Title} - {item.CourseCode}
                                        </IonItem>
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

export default CoursesTaught;
