"use client"

import React, {useState} from 'react'

const Inputs = () => {
  
    const [datos, setDatos] = useState('')

    async function onSubmit(event) {
        event.preventDefault();
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ datos: datosInput }),
        });
        const data = await response.json();
        setResult(data.result);
        setDatosInput("");
      }



  return (
    <>
        
        <h3>Que cocino hoy?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingredient"
            placeholder="Enter ingredients"
            value={datos}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <br/>
          <input
            type="text"
            name="ingredient"
            placeholder="Enter Country"
            value={datos}
            onChange={(e) => setCountry(e.target.value)}
          />
          <br/>
          <input
            type="text"
            name="ingredient"
            placeholder="Enter Extras"
            value={datos}
            onChange={(e) => setExtra(e.target.value)}
          />
          <br/>
          <input type="submit" value="Generate names" />
        </form>
    </>
  )
}

export default Inputs