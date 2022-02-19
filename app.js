window.addEventListener('load',()=>{
      let long;
      let lat;
      let temperatureDescription = document.querySelector('.temperature-description')
      let temperatureDegree = document.querySelector('.temperature-degree')
      let locationTimezone = document.querySelector(".location-timezone")
      let temperatureSection = document.querySelector(".temperature")        
      const temperatureSpan = document.querySelector(".temperature span")
      let city = document.getElementById("city")
  
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position => {
              long = position.coords.longitude
              lat = position.coords.latitude
              console.log(lat,long)
              const api=`http://api.weatherapi.com/v1/forecast.json?key=%20fa3cb25e33144eef96595904220802&q=${lat},${long}&days=1&aqi=no&alerts=no`
              fetch(api)
          .then(res => res.json())
          .then(data => {
              console.log(data)
              const {temp_f, condition , temp_c } = data.current
              const {tz_id , name} = data.location 
              // SET DOM ELEMENTS FROM THE API
              temperatureDegree.textContent = temp_f
              temperatureDescription.textContent = condition.text
              locationTimezone.textContent = tz_id
              city.textContent = name
              //SET ICON
              setIcons()
              //condition.text , "PARTLY_CLOUDY_DAY")   
  
              //CHANGE TEMP TO C ND F
              temperatureSection.addEventListener('click',()=>{
                  if(temperatureSpan.textContent==="F"){
                      temperatureDegree.textContent = temp_c
                      temperatureSpan.textContent = "C"
  
                  }else{
                      temperatureSpan.textContent = "F"
                      temperatureDegree.textContent = temp_f
  
                  }
              })
  
          }
          )
          }) 
  
  
          
      }
      //NAVIGATOR ENDS
  
      function setIcons(){
           const skycons = new Skycons({color:"white"})
           //const currentIcon = icon.toUpperCase()
           skycons.add("icon1",Skycons.PARTLY_CLOUDY_DAY)
           skycons.play()
           //return skycons.set(iconID,Skycons[currentIcon])
      }
      
  })