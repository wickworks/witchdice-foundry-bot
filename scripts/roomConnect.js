console.log('!!! roomConnect.js loaded');

function loadScript(url, callback)
{
    // adding the script element to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

const setupFirebase = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyBQJ2LG4nrCBhoIxg94rYi7AzzNf-GqgTM",
    authDomain: "roll-to-hit.firebaseapp.com",
    databaseURL: "https://roll-to-hit.firebaseio.com",
    projectId: "roll-to-hit",
    storageBucket: "roll-to-hit.appspot.com",
    messagingSenderId: "55772958032",
    appId: "1:55772958032:web:42c2dc78d955a887293055",
  };

  firebase.initializeApp(firebaseConfig);

  console.log("!!! Initialized firebase");

};


function getFirebaseDB() {
  return window.firebase.database().ref()
}

const connectToRoom = (roomName) => {
  try {
    console.log('!!!! Connecting to room : ', roomName);
    if (roomName === null || roomName.length === 0) { throw new Error('Invalid room name!') }

    // ~~ DICEBAG AND DAMAGE ROLLS ~~~
    const dbRollsRef = getFirebaseDB().child('rolls').child(roomName)
    dbRollsRef.on('child_changed', (snapshot) => {
      // if (snapshot) { setLatestAction(snapshot.val()) }
      if (snapshot) { console.log('!!!!!! child changed', snapshot.val()) }
    });
    dbRollsRef.on('child_added', (snapshot) => {
      if (snapshot) {
        if (snapshot) { console.log('!!!!!! child added', snapshot.val()) }
        // // clean out old rolls?
        // var now = Date.now()
        // var cutoff = now - 1 * 24 * 60 * 60 * 1000 // 1 day ago
        // if (snapshot.val().createdAt < cutoff) {
        //   snapshot.ref.remove()
        // } else {
        //   setLatestAction(snapshot.val())
        // }
      }
    });
    //
    // setPartyConnected(true);
    // localStorage.setItem("party_name", partyName);
    // localStorage.setItem("party_room", roomName);

  } catch (error) {
    console.log('ERROR: ',error.message);
    // setPartyConnected(false);
  }
}

Hooks.on("ready", function() {
  console.log("!!! This code runs once core initialization is ready and game data is available.");

  // Load the firebase libraries. A little callback hell, as a treat.
  loadScript('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js', () =>
    loadScript('https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js', () => {
      setupFirebase()
      connectToRoom('olive-test-room')
    })
  )


  console.log("!!! Finished script load");

  // ChatMessage.create({
  //   content: (`
  //     <div class="chat-card item-card">
  //         Icon
  //     </div>
  //     Some message text!
  //   `)
  // })
});






// Hooks.on('renderPlayerList', (playerList, html) => {
//   console.log('!!! renderPlayerList hook detected');
//
//   // find the element which has our logged in user's id
//   const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`)
//
//   // insert a button at the end of this element
//   loggedInUserListItem.append(
//     "<button type='button' class='roomConnect-button' title=''><i class='fas fa-tasks'></i></button>"
//   );
// });
