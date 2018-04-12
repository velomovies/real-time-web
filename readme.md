# Real Time Piano
Using this app you can compose a song together with others using [socket.io](https://socket.io). This is a school project where the goal is to build a real-time web application using websockets (recommended) or another technique.

![Preview](sources/images/preview.png)
> Try the
> [**prototype**](https://realtimeweb-pianoplayer.herokuapp.com/).

## Background

In this application I use `socket.io` to make a connection between other users. In the app you can make music together with friends. Next to that you can see which note is touched by which user. 

Every user gets a random color. The color is generated serverside with this code:
 ```javascript
 function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
 ```

 With doing this each note created by an user is a different color. Client-side I use that color to show the color. Next to that the color is emmited to other users.

 The data send to users are: 
 - What note is played
 - Which color is the user

 All processing is done client-side. Taking the node putting in on the right place. 

To check where to put the every note exactly I used:
```javascript
element.getBoundingClientRect()
```
This way I could find the location of where it would position.

The last feature I put in the app are two ways of showing the notes. Everytime someone clicks on a note the amount will get higher. 
You can choose if you want all the notes next to eachother or for every note a new line. This check is done this way:
```javascript
    tones.forEach(function(oneTone) {
      if (checkBox.checked) {
        newAmount = oneTone.amount++
      } else if (tone.value === oneTone.value) {
        newAmount = oneTone.amount++
      }
    })
```

## To Do

For making music with friends I could make an session. You can join a group so you can make music together.

## Installing

1. Clone the repo: `git clone git@github.com:velomovies/real-time-web.git`
2. Get all the dependencies `npm install`
3. Run `npm start`  to start the server.
4. Navigate to`localhost:5000` to see the application.

**Prerequisites**

- Git
- Node
- NPM

**Dependencies**

- [Socket.io](https://socket.io) is used to make connecting to the websocket easier
- [Nunjucks](https://mozilla.github.io/nunjucks/) for templating

## License

GPL-3.0 © Victor Zumpolle