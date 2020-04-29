import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, IonList, IonItem } from '@ionic/react';
import './AcademicYears.css';
import { RefresherEventDetail } from '@ionic/core';
import getData from '../components/fetchData';

const AcademicYears: React.FC = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const url = 'https://w0417378-apim.azure-api.net/academicyears';

  useEffect(() => {

    getData(data => {
      setAcademicYears(data)
      console.log(data);
    },url)
  }, [])

  // refresh
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

    getData(data => {
      console.log(data)
      setAcademicYears(data)
      event.detail.complete() //stops the spinner
    },url)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Academic Years</IonTitle>
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

            academicYears
              .map((acy: any, index: number) => {
                return (
                  <IonItem
                    routerLink={`/academicyears/${acy.Id}`}
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

export default AcademicYears;
