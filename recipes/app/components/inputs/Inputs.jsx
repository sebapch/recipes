"use client"

import React, {useState} from 'react'
import styles from "./inputs.module.css";

const Inputs = () => {
  
  const [ingredientes, setIngredientes] = useState([])
  const [region, setRegion] = useState([])
  const [result, setResult] = useState();


    async function onSubmit(event) {
        event.preventDefault();
        
        console.log(ingredientes)
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
          },
          body: `{"model": "text-davinci-003", "prompt": "dime como preparar una comida con: ${ingredientes} y que sea tipica del pais: ${region}", "temperature": 0, "max_tokens": 300}`,
        });
        const data = await response.json();
        console.log(data.choices[0].text)
        
       setResult(data.choices[0].text);
      }

      const handleRegion = (e) => {
        setRegion(e.target.value);
      }

      const formatData = (data) => {
        let formattedData = data.replace(/\n/g, '<br />');
        let dataArray = formattedData.split('Instrucciones:');
        return dataArray;
      }

  return (
    <>
       <div className={styles.main}>
       <h3>Que cocino hoy?</h3>
        <br/>
          <br/>
        <form onSubmit={onSubmit}>
          <p>Ingrese ingredientes:</p>
          <input
            type="text"
            name="ingrediente"
            placeholder="Ingresa ingredientes separados por coma ' , ' "
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
          <br/>
          <br/>
          <p>Ingrese Region:</p>
          <select name="select" value={region} onChange={handleRegion}>
          <option value="">----</option>
            <option value="Argentina">Argentina</option>
            <option value="Japon" >Japón</option>
            <option value="India">India</option>
          </select>
          <br/>
          <br/>
          <input type="submit" value="generar platos" />
        </form>
          <div className={styles.responseContainer}>
            <pre className={styles.preResult} >{result}</pre>
          </div>
       </div>
        
            </>
  )
}

export default Inputs