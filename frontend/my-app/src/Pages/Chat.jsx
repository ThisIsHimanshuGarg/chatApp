import React from 'react'
import ChatHeader from '../components/chats/ChatHeader'
import MessageArea from '../components/chats/MessageArea'
import InputBar from '../components/chats/InputBar'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const {userId} = useParams;
  console.log(userId);
  
  return (
    <>
      <ChatHeader/>
      <MessageArea/>
      <InputBar/>
    </>
  )
}

export default Chat