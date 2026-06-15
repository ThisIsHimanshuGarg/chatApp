import ChatHeader from '../components/chats/ChatHeader'
import MessageArea from '../components/chats/MessageArea'
import InputBar from '../components/chats/InputBar'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Chat = () => {
 
   const [messages, setMessages] = useState([])
  return (
    <>
     <div className='flex flex-col h-screen'>
        <ChatHeader />
        <MessageArea  setMessages={setMessages} messages={messages}/>
        <InputBar setMessages={setMessages} />
        </div>
     
    </>
  )
}

export default Chat