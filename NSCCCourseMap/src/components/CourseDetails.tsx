import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const CourseDetails: React.FC<DetailPageProps> = ({ match }) => {
    //define the semester state
    const [courseDetails, setCourseDetails] = useState<any>({
        Title: '',
        CourseCode: '',
        CoursePrerequisites: [],
        IsPrerequisiteFor: []
    });

    //retrieve data from the api 
    const url = `https://w0417378-apim.azure-api.net/courses/${match.params.id}`
    useEffect(() => {
        getData(data => {
            setCourseDetails(data)
          },url)
        
    }, [])

    // refresh
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getData(data => {
            setCourseDetails(data)
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
                    
                    <IonTitle>Course Details</IonTitle>
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
                <IonList>
                    <IonItem>Course Title: {'' || courseDetails.Title}</IonItem>
                    <IonItem>Course Code: {'' || courseDetails.CourseCode}</IonItem>

                    <IonItem>Course Prerequisites: 
                        <IonList>
                            {courseDetails.CoursePrerequisites.length === 0? "None":(
                                courseDetails.CoursePrerequisites.map((item:any,index: number) => {
                                    return (
                                        <>
                                        <IonItem key={index}>Course Title: {item.Title}<br></br>Course Code: {item.CourseCode}</IonItem>
                                        </>
                                    )
                                })
                            )}
                        </IonList>   
                    </IonItem>
                    <IonItem>Is Prerequisite For: 
                        <IonList>
                            {courseDetails.IsPrerequisiteFor.length === 0? "None":(
                                courseDetails.IsPrerequisiteFor.map((item:any,index: number) => {
                                    return (
                                        <>
                                        <IonItem key={index+10}>Course Title: {item.Title}<br></br>Course Code: {item.CourseCode}</IonItem>
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

export default CourseDetails;
