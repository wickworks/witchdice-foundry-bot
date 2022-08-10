console.log('!!! roomConnect.js loaded');


Hooks.on("ready", function() {
  console.log("!!! This code runs once core initialization is ready and game data is available.");

  ChatMessage.create({
    content: (`
      <div class="chat-card item-card">
          Icon
      </div>
      Some message text!
    `)
  })
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
