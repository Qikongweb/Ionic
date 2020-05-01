const getData = (callback: (data: any) => void,url:any) => {
    // const proxyurl = "https://cryptic-headland-94862.herokuapp.com/";//"https://cors-anywhere.herokuapp.com/" only can use for 3 min   
    const urlprxy ='https://cors-anywhere.herokuapp.com/';

    fetch(urlprxy+url)
      .then(response => response.json())
      .then(json => {
        callback(json)
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}
export default getData;