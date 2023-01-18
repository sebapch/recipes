"use client"

import React, {useState} from 'react'

const Inputs = () => {
  
  const [ingredientes, setIngredientes] = useState([])
  const [result, setResult] = useState();


    async function onSubmit(event) {
        event.preventDefault();
        console.log('hola')
        console.log(ingredientes)
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
          },
          body: `{"model": "text-davinci-003", "prompt": "haz una lista de 10 comidas con ${ingredientes}", "temperature": 0, "max_tokens": 300}`,
        });
        const data = await response.json();
        console.log(data)
        
       setResult(data.choices[0].text);
      }




  return (
    <>
        
        <h3>Que cocino hoy?</h3>
        <br/>
          <br/>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingrediente"
            placeholder="Ingresa ingredientes separados por coma ' , ' "
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
          <br/>
          <br/>
          <input type="submit" value="generar platos" />
        </form>
        <br/>
        
          <br/>
        <div >{result}</div>
        
        
            </>
  )
}

export default Inputs