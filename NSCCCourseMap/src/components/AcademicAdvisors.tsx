import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const AcademicAdvisors: React.FC<DetailPageProps> = ({ match }) => {
    //define the semester state
    const [advisors, setAdvisors] = useState<any>({
        Title: '',
        Advisors: [],      
    });

    //retrieve data from the api 
    const url = `https://w0417378-apim.azure-api.net/diplomaprograms/${match.params.id}`
    useEffect(() => {
        getData(data => {
            setAdvisors(data)
          },url)
        
    }, [])

    // refresh
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getData(data => {
            setAdvisors(data)
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
                    
                    <IonTitle>Diploma Programs/{advisors.Title}</IonTitle>
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
                <IonTitle color="primary" size="large" className="subTitleStyle">Advisors:</IonTitle>
                <IonList>
                    
                    <IonItem>
                        <IonList>
                            {advisors.Advisors.length === 0? "None":(
                                advisors.Advisors.map((item:any,index: number) => {
                                    return (
                                        <>
                                        <IonItem 
                                            routerLink={`/diplomaprograms/advisors/${item.Id}`}
                                            key={item.Id}>
                                            {item.Instructor} - {item.AcademicYear} - {item.DiplomaProgramYear} - {item.DisplomaProgramYearSection}</IonItem>
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

export default AcademicAdvisors;
