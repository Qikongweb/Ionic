import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, IonList, IonItem, IonSearchbar } from '@ionic/react';
import './Courses.css';
import { RefresherEventDetail } from '@ionic/core';
import getData from '../components/fetchData';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [noFoundText, setNoFoundText] = useState("");
  const url = 'https://w0417378-apim.azure-api.net/courses';

  useEffect(() => {

    getData(data => {
      setCourses(data)
      console.log(data);
    },url)
  }, [])

  // refresh
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

    getData(data => {
      console.log(data)
      setCourses(data)
      event.detail.complete() //stops the spinner
    },url)
  }

  const handleInput = (event: any) => {
    //console.log(event.detail.value)
    setSearchText(event.target.value)
    setNoFoundText(courses.filter((course: any) => {
                return course.Title.toLowerCase().includes(event.target.value.toLowerCase())
              }).length === 0? "No courses found.":"" )
    
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar slot="fixed">
          <IonSearchbar onIonChange={handleInput} ></IonSearchbar>
      </IonToolbar>
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
              courses.sort((a,b) => {return (a['Title'] > b['Title'])? 1: -1})
              .filter((course: any) => {
                return searchText === "" || course.Title.toLowerCase().includes(searchText.toLowerCase())
              })
              .map((c: any) => {
                return (
                  <IonItem
                    routerLink={`/courses/${c.Id}`}
                    key={c.Id}>
                    {c.Title} 
                  </IonItem>
                )
              }) 
          }
          <IonTitle>{noFoundText}</IonTitle>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
