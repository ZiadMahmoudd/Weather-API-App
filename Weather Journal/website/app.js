const button = document.getElementById('generate');
//console.log(button);

// Event listener to add function to existing HTML DOM element
button.addEventListener('click', (e) => {
   e.preventDefault();
   const content = document.getElementById('feelings').value;

   //console.log(content);
   let d = new Date();
   let newDate = `${d.getMonth() + 1} / ${d.getDate()} /${d.getFullYear()}`;

   /* Function to GET Web API Data */

   const getWeatherApiData = async () => {
      // Personal API Key for OpenWeatherMap API
      const apiKey = '1b825671705a5bd6dfd8bb8249ea89d0';

      const zipCode = document.getElementById('zip').value;
      const urlLink = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
      if (zipCode.length === 0) {
         alert('Please Enter Zip Code :');
         return;
      }
      if (content.length === 0) {
         alert('Please Enter Your Feeling!');
         return;
      }
      const res = await fetch(urlLink);
      try {
         const apiData = await res.json();
         console.log(apiData);
         return apiData;
      } catch (err) {
         console.log('err', err);
      }
   };
   /* Function to POST data */

   const postData = async (url = '', data = {}) => {
      const req = await fetch(url, {
         method: 'POST',
         credentials: 'same-origin',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content,
         }),
      });

      try {
         const addData = await req.json();
         console.log(addData);
         return addData;
      } catch (err) {
         console.log(err);
      }
   };
   /* Function to GET Project Data */
   // Function to Update The DOM
   const updateDOM = async () => {
      const req = await fetch('/allData');
      try {
         const updateData = await req.json();
         // update new entry values
         document.getElementById(
            'date'
         ).innerHTML = `Today is : ${updateData.date}`;
         document.getElementById(
            'temp'
         ).innerHTML = ` Temperature Today : ${updateData.temp} \xB0C. `;
         document.getElementById(
            'content'
         ).innerHTML = `Your Feeling NOW : ${updateData.content}`;
      } catch (err) {
         console.log('err', err);
      }
   };
   // Call all Functions by using Promises .then . catech
   getWeatherApiData()
      .then((apiData) => {
         postData('/addData', {
            date: newDate,
            temp: apiData.main.temp,
            content: content,
         });
      })
      .then(() => {
         updateDOM();
      })
      .catch((err) => {
         console.log('err', err);
      });
});
