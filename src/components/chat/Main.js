import React, { Component } from 'react'
import bell from './bell-regular.svg';
import { Redirect,Link } from 'react-router-dom'
import Messages from "./Messages";
import Input from "./Input";


function randomName() {
    const adjectives = [
      "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
      "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
      "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
      "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
      "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
      "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
      "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
      "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
      "ancient", "purple", "lively", "nameless"
    ];
    const nouns = [
      "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
      "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
      "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
      "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
      "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
      "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
      "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
      "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
      "smoke", "star"
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  }
  
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }
  
class Main extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token')

        let loggedIn =true
          if(token==null){
              loggedIn=false
          }
        this.state = {
            loggedIn,
            messages: [],
            member: {
              username: randomName(),
              color: randomColor(),
              
            },
            count:'',
          }
          
        this.drone = new window.Scaledrone("HceTnZ413KFqcTKc", {
          data: this.state.member
        });
        this.drone.on('open', error => {
          if (error) {
            return console.error(error);
          }
          const member = {...this.state.member};
          member.id = this.drone.clientId;
          this.setState({member});
        });
        const room = this.drone.subscribe("observable-room");
        room.on('data', (data, member) => {
          const messages = this.state.messages;
          messages.push({member, text: data});
          this.setState({messages});
        });
      }
    
      render() {
          if(this.state.loggedIn===false){
              return <Redirect to="/" />
          }
        return (
          <div className="App">
         
            <div className="App-header">
              <h1>Softvision Chat App</h1>
              <div className='righthead'>
                <div className="Profilelink">{this.state.member.username}</div>
                <div className="Notification">
                  <span class="sr-only"><img src={bell} style={{width:'20px'}}/></span>
                  <span class="badge badge-light">{this.state.count++}</span>
                </div>
                <div className="logout">
                <Link to="/logout">Logout</Link>
                </div>
              </div>
            </div>
            
            <Messages
              messages={this.state.messages}
              currentMember={this.state.member}
            />
            <Input
              onSendMessage={this.onSendMessage}
            />
          </div>
        );
      }
    
      onSendMessage = (message) => {
        this.drone.publish({
          room: "observable-room",
          message
        });
      }
    
    
    
}
export default Main;
