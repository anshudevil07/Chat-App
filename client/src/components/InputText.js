import React from 'react'
import  { useState } from 'react'
const styles={
    button: {
      width:'15%' ,
      height:50 ,
      fontWeight:'bold', 
      borderRadius:10 ,
      fontSize:18 ,
      backgroundColor:'#34b7f1',
      borderWidth:0,
      color:'#fff',
      marginLeft:'4rem',
    },
    textarea:{ 
       width:'60%' ,
       height:50 ,
       borderRadius:10, 
       borderWidth:0 , 
       padding:10 , 
       fontSize:18
      },
    textContainer:{
      // display:"flex", 
      // justifyContent:'space-evenly', 
      // alignItems:'center',
      marginTop:'50px',
     borderRadius:'4rem',
     width:'70%',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '5px',
      marginLeft:'10rem'
    
      
    }
  }

export default function InputText({addMessage}) {
    
    const [message , setMessage] = useState('')

    function addAMessage(){
        addMessage({
            message
        })
        setMessage('')
    }
  return (
    <div style={styles.textContainer} >
    <textarea
    style={styles.textarea}
    rows={6}
    placeholder="Write something..."
    value={message}
    onChange={e => setMessage(e.target.value)}
    >
    </textarea>
    <button
    onClick={()=> addAMessage()}
    style = {styles.button}
    >
            ENTER
    </button>
</div>
  )
}
