import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRefresher, IonRefresherContent, IonBackButton, IonIcon, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import getData from './fetchData';

interface DetailPageProps extends RouteComponentProps<{
    id: string;
}> { }
function uniqueObj(arr:any) {
    var result: any[] = [];
    const map = new Map();
    arr.forEach((item:any) => {
        if(!map.has(item.Id)){
            map.set(item.Id,true);
            result.push(item);
        }
    })
    return result;

}

const AcademicAdvisors: React.FC<DetailPageProps> = ({ match }) => {
    //define the semester state
    const [advisorsDP, setAdvisors] = useState<any>({
        Title: '',
        Advisors: [],      
    });

    //retrieve data from the api 
    const url = `https://w0417378-apim.azure-api.net/diplomaprograms/${match.params.id}`
    useEffect(() => {
        getData(data => {
            var advisors = data.Advisors.map((item:any) => {
                return {'Id':item.Id,'Instructor':item.Instructor}
            });
            
            setAdvisors({Title:data.Title,Advisors:uniqueObj(advisors)})
          },url)
        
    }, [])

    // refresh
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        getData(data => {
            var advisors = data.Advisors.map((item:any) => {
                return {'Id':item.Id,'Instructor':item.Instructor}
            });
            
            setAdvisors({Title:data.Title,Advisors:uniqueObj(advisors)})
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
                <h3>Advisors/{advisorsDP.Title}</h3>
                <IonList>
                    
                    <IonItem>
                        <IonList>
                            {advisorsDP.Advisors.map((item:any)=>{
                                return <IonItem 
                                            routerLink={`/diplomaprograms/advisors/${item.Id}`}
                                            key={item.Id}>
                                            {item.Instructor}
                                       </IonItem>
                            })}

                        </IonList>   
                    </IonItem>
                    
                </IonList>
            </IonContent>
        </IonPage>

    );
};

export default AcademicAdvisors;
