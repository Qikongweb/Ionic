import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, IonList, IonItem } from '@ionic/react';
import './Instructors.css';
import getData from '../components/fetchData';
import { RefresherEventDetail } from '@ionic/core';


const Instructors: React.FC = () => {
  const [instructors, setInstructors] = useState([]);
  const url = 'https://w0417378-apim.azure-api.net/instructors';

  useEffect(() => {

    getData(data => {
      setInstructors(data)
      console.log(data);
    },url)
  }, [])

  // refresh
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

    getData(data => {
      console.log(data)
      setInstructors(data)
      event.detail.complete() //stops the spinner
    },url)
  }

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
        <IonList>
          {
              instructors
              .map((instructor: any) => {
                return (
                  <IonItem
                    routerLink={`/instructors/${instructor.Id}`}
                    key={instructor.Id}>
                    {instructor.LastName}, {instructor.FirstName}
                  </IonItem>
                )
              }) 
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Instructors;
