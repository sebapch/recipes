"use client";

import React, { useState } from "react";
import styles from "./inputs.module.css";


const valores = [{value: 'Argentina', label: 'Argentina'},  {value: 'Japon', label: 'Japón'},  {value: 'India', label: 'India'},  {value: 'Mexico', label: 'México'},  {value: 'Italia', label: 'Italia'},  {value: 'España', label: 'España'},
  {value: 'China', label: 'China'},  {value: 'Francia', label: 'Francia'},  {value: 'Alemania', label: 'Alemania'},  {value: 'Grecia', label: 'Grecia'},  {value: 'Turquia', label: 'Turquía'},  {value: 'EstadosUnidos', label: 'Estados Unidos'},
  {value: 'CoreaDelSur', label: 'Corea del Sur'},  {value: 'Peru', label: 'Perú'},  {value: 'Tailandia', label: 'Tailandia'},  {value: 'Vietnam', label: 'Vietnam'},  {value: 'Indonesia', label: 'Indonesia'},
  {value: 'Brasil', label: 'Brasil'},  {value: 'Tailandia', label: 'Tailandia'},  {value: 'Lebanon', label: 'Líbano'},  {value: 'Marruecos', label: 'Marruecos'}];

const Inputs = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [region, setRegion] = useState([]);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    console.log(ingredientes);
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: `{"model": "text-davinci-003", "prompt": "quiero preparar una comida que contenga: ${ingredientes} y que sea tipica del pais: ${region}. que puedo preparar? corto y sencillo como preparar", "temperature": 0, "max_tokens": 600}`,
    });
    const data = await response.json();
    console.log(data.choices[0].text);

    setResult(data.choices[0].text);
  }

  const handleRegion = (e) => {
    setRegion(e.target.value);
  };

  const formatData = (data) => {
    let formattedData = data.replace(/\n/g, "<br />");
    let dataArray = formattedData.split("Instrucciones:");
    return dataArray;
  };

  return (
    <>
      <div className={styles.main}>
        <h3>Qué comemos hoy?</h3>
        <br />
        <br />
        <form onSubmit={onSubmit}>
          <p>Ingrese ingredientes:</p>
          <input
            type="text"
            name="ingrediente"
            placeholder="Ingresa ingredientes separados por coma ' , ' "
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
          <br />
          <br />

          <p>Ingrese Region:</p>
          <select
            name="select"
            value={region}
            onChange={handleRegion}
            className={styles.regionstyle}
          >
            <option value="">----</option>
            {valores.map((valor) => (
              <option key={valor.value} value={valor.value}>
                {valor.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <input type="submit" value="Generar plato" />
        </form>
        <div className={styles.responseContainer}>
          <pre className={styles.preResult}>{result}</pre>
        </div>
      </div>
    </>
  );
};

export default Inputs;
