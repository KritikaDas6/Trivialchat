import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "MEOWT",
  avatar: "https://loremflickr.com/140/140",
};

const TRIVIA_DATA = [
  { question: "What event is today?", ans: "ping pong" },
  { question: "Who is the best ping pong player?", ans: "ma long" }
];

export default function App() {
    const [messages, setMessages] = useState([]);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);


  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
      );
    }
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };
    

    
    const followUpQuestions = (userMessages) => {
        addBotMessage(TRIVIA_DATA[0].question);
        const userAnswer= userMesssages[0].text.toLowerCase().trim();
        if(userAnswer=== TRIVIA_DATA[0].answer){
            addBotMessage("Correct");
            return;
        } else{
            addBotMessage("no");
        }
       
    }

  const respondToUser = (userMessages) => {
    console.log("Recent user msg:", userMessages[0].text);
      if(userMessages[0].text=="Yes"){
          addBotMessage("I am da response!");
          followUpQuestions();
         return;
      }
      addBotMessage("Say Yes to start!");
  };
    

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <GiftedChat
          
          messages={messages}
          onSend={(messages) => {
            onSend(messages);
            // Wait a sec before responding
            setTimeout(() => respondToUser(messages), 1000);
          }}
          user={{
            _id: 1,
            name: "Chilla",
          }}
          renderUsernameOnMessage={true}
        />
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}

// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
