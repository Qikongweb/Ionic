import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, IonList, IonItem } from '@ionic/react';
import './DiplomaPrograms.css';
import { RefresherEventDetail } from '@ionic/core';
import getData from '../components/fetchData';

const DiplomaPrograms: React.FC = () => {
  const [diplomaPrograms, setDiplomaprograms] = useState([]);
  const url = 'https://w0417378-apim.azure-api.net/diplomaprograms';

  useEffect(() => {

    getData(data => {
      setDiplomaprograms(data)
      console.log(data);
    },url)
  }, [])

  // refresh
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

    getData(data => {
      console.log(data)
      setDiplomaprograms(data)
      event.detail.complete() //stops the spinner
    },url)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
        <IonList>
          {

            diplomaPrograms
              .map((acy: any, index: number) => {
                return (
                  <IonItem
                    routerLink={`/diplomaprograms/${acy.Id}`}
                    key={acy.Id}>
                    {acy.Title} 
                  </IonItem>
                )
              })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DiplomaPrograms;
