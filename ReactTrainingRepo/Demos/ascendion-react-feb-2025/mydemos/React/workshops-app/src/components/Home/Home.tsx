import React from 'react';



export const Home=()=>{

    const [title,setTitle]=React.useState('Workshops App');
    const [count,setCount]=React.useState(0);
    const changeTitle=()=>{
      setTitle('Workshops Application')
    setCount(count=>count+1);
  }
  return (
    <>
    <h1>{title}</h1>
    <button onClick={changeTitle}>Change Title</button>
    <span>You have clicked this button: </span>
    <span>{count} times</span>
    </>

)
}