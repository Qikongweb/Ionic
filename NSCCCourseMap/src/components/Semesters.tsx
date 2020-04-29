import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const Semesters: React.FC<DetailPageProps> = ({ match }) => {
    //define the semester state
    const [semesters, setSemesters] = useState<any>({
        Title:'',
        Semesters:[]
    });
    //retrieve data from the api 
    const url = `https://w0417378-apim.azure-api.net/academicyears/${match.params.id}`

    useEffect(() => {
        getData(data => {
            setSemesters(data)
            },url)
    }, [])

    // refresh
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        // console.log('Begin async operation');
        getData(data => {
            setSemesters(data)
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
                    
                    <IonTitle>Academic Years/{semesters.Title}</IonTitle>
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
                <IonTitle color="primary" size="large" className="subTitleStyle">Semesters: </IonTitle>
                <IonList>
                    {
                        semesters.Semesters
                        .sort((a:any,b:any)=>{return (a.StartDate - b.StartDate)? 1: -1})
                        .map((semester: any) => {
                            return (
                                <IonItem
                                    routerLink={`/academicyears/semesters/${semester.Id}`}
                                    detail={true}
                                    key={semester.Id}>
                                    {semester.Name}
                                </IonItem>
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </IonPage>

    );
};

export default Semesters;
