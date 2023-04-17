import React,{useState,useEffect} from 'react'
import SocketIoClient from "socket.io-client"
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,

} from 'firebase/firestore';
import db from "./firebaseconfig/firebaseConfig.js"


const styles={


}
export default function ChatContainer() {

    const socketio= SocketIoClient("http://localhost:5000")
    const [chats,setChats]=useState([])
    const [user,setUser]=useState(localStorage.getItem("user"));
    const[avatar,setAvatar]=useState(localStorage.getItem("avatar"))
    const chatsRef = collection(db , "Messages")

    useEffect(() => {
      socketio.on('chat',senderchats=>{
        setChats(senderchats)
      })
    
      
    } )


    useEffect(()=>{

      const q = query(chatsRef , orderBy('createdAt' , 'asc'))
    
      const unsub = onSnapshot(q, (querySnapshot) =>{
        const fireChats =[]
        querySnapshot.forEach(doc => {
          fireChats.push(doc.data())
        });
       setChats([...fireChats])
      })
      return ()=> {
        unsub()
      }
    
    },[])
   
    function addToFirrebase(chat){
      const newChat = {
          avatar,
          createdAt: serverTimestamp(),
          user,
          message: chat.message
      }

      const chatRef = doc(chatsRef)
      setDoc(chatRef , newChat)
      .then(()=> console.log('Chat added succesfully'))
      .catch(console.log)
   } 



    function sendChatTOSocket(chat){
        socketio.emit("chat",chat)
    }

    function addMessage(chat){
      const newChat = {...chat , user:localStorage.getItem("user") , avatar}
      addToFirrebase(chat)
      setChats([...chats , newChat])
      sendChatTOSocket([...chats , newChat])
  }
     function logout(){
      localStorage.removeItem("user")
      localStorage.removeItem("avatar")
      setUser("");
     }
    
     function ChatList(){
      return chats.map((chat,index)=>{
       if(chat.user===user)  return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user}/>
       return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user}/>
      } 
     )}
//   return (

//     <div>
//     {
//     user?
//     <div>



//     <div style={{ 
//   position: 'fixed', 
//   top: '0', 
//   left: '0', 
//   right: '0', 
//   display: 'flex', 
//   flexDirection: "row", 
//   justifyContent: 'space-between',
//   backgroundColor: 'green',
//   padding: '.5rem',
//   color:'',
//   boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)'
// }} >
//   <h4 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>USER: {user}</h4>
//   <p onClick={()=> logout()} style={{ 
//     color: 'white', 
//     cursor: 'pointer', 
//     border: '2px solid black',
//     padding: '10px 1rem' ,
//     borderRadius: '1rem',
//     backgroundColor:'red'
//   }} >Log Out</p>
// </div>



//     <ChatList/>
//     <InputText addMessage={addMessage}/>
   
 

//     </div>
//     :
//     <UserLogin setUser={setUser}/>

//     }
//     </div>
//   )
return (
  <div>
    {user ? (
      <div>
        <div style={{ 
          position: 'fixed', 
          top: '0', 
          left: '0', 
          right: '0', 
          display: 'flex', 
          flexDirection: "row", 
          justifyContent: 'space-between',
          backgroundColor: 'green',
          padding: '.5rem',
          color:'',
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
          zIndex: 1

        }} >
          <h4 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>USER: {user}</h4>
          <p onClick={()=> logout()} style={{ 
            color: 'white', 
            cursor: 'pointer', 
            border: '2px solid black',
            padding: '10px 1rem' ,
            borderRadius: '1rem',
            backgroundColor:'red'
          }} >Log Out</p>
        </div>

        <div style={{ marginTop: '5rem' }}>
          <ChatList />
          <InputText addMessage={addMessage} />
        </div>
      </div>
    ) : (
      <UserLogin setUser={setUser} />
    )}
  </div>
);

}


