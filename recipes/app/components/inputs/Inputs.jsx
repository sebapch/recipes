"use client";

import React, { useState } from "react";
import styles from "./inputs.module.css";
import { Caveat } from "@next/font/google";

const valores = [
  { value: "Argentina", label: "Argentina" },
  { value: "Japon", label: "Japón" },
  { value: "India", label: "India" },
  { value: "Mexico", label: "México" },
  { value: "Italia", label: "Italia" },
  { value: "España", label: "España" },
  { value: "China", label: "China" },
  { value: "Francia", label: "Francia" },
  { value: "Alemania", label: "Alemania" },
  { value: "Grecia", label: "Grecia" },
  { value: "Turquia", label: "Turquía" },
  { value: "EstadosUnidos", label: "Estados Unidos" },
  { value: "CoreaDelSur", label: "Corea del Sur" },
  { value: "Peru", label: "Perú" },
  { value: "Tailandia", label: "Tailandia" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Brasil", label: "Brasil" },
  { value: "Lebanon", label: "Líbano" },
  { value: "Marruecos", label: "Marruecos" },
];


const Inputs = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [region, setRegion] = useState([]);
  const [vegano, setVegano] = useState(false);
  const [vegetariano, setVegetariano] = useState(false);
  const [sinTacc, setSinTacc] = useState(false);
  const [onlyWith, setOnlyWith] = useState(false);
  const [noIngredientes, setNoIngredientes] = useState(false);
  const [enableDificutad, setEnableDificultad] = useState(false);
  const [enableTiempo, setEnableTiempo] = useState(false)
  const [ingredientesExcluidos, setIngredientesExcluidos] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [cantidadPersonas, setCantidadPersonas] = useState("");

  const prompt = `Escribe una receta de una comida típica de ${region} que contenga estos ingredientes: ${ingredientes}. ${
    vegano === true
      ? "Que sea vegana."
      : vegetariano === true
      ? "Que sea vegetariana."
      : ""
  } ${sinTacc ? "Debe ser obligatoriamente sin TACC pero igualmente rico." : ""} ${
    dificultad === "" ? "" : `Con un nivel de dificultad ${dificultad}.`
  }${
    tiempo === "" ? "" : `Tengo  ${tiempo} para prepararlo.`
  }${onlyWith ? " Debe ser SOLO con los ingredientes especificados. " : ""} ${
    noIngredientes ? `NO debe incluir: ${ingredientesExcluidos}. ` : ""
  }¿Qué puedo preparar?`;

  const handleVegano = () => {
    setVegano(!vegano);
    setVegetariano(false);
  };

  const handleVegetariano = () => {
    setVegano(false);
    setVegetariano(!vegetariano);
  };

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();

    console.log(ingredientes);
    console.log(prompt);
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: `{"model": "text-davinci-003", "prompt": "${prompt}", "temperature": 0, "max_tokens": 600}`,
    });

    const data = await response.json();
    console.log(data.choices[0].text);

    setResult(data.choices[0].text);
    setLoading(false);
  }

  const handleDificulty = (event) => {
    setDificultad(event.target.value);
  };

  const handleRegion = (e) => {
    console.log(e.target)
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
        <h1 className={styles.titulo}>Que comemos hoy?</h1>
        <form onSubmit={onSubmit}>
          <p>Ingrese ingredientes:</p>
          <input
            className="bg-[#3B3B3B]"
            type="text"
            name="ingrediente"
            placeholder="Ingresa ingredientes"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
          <div class="flex flex-row mb-2">
            <div class="w-1/2">
              <input
                type="checkbox"
                name="vegano"
                value="Vegano"
                checked={vegano ? true : false}
                onChange={handleVegano}
              />
              <label> Vegano</label>
            </div>
            <div class="w-1/2">
              <input
                type="checkbox"
                name="vegetariano"
                value="Vegetariano"
                checked={vegetariano ? true : false}
                onChange={handleVegetariano}
              />
              <label> Vegetariano</label>
            </div>
          </div>

          <div class="flex flex-row justify-between mb-2">
            <div class="w-1/2">
              <input
                type="checkbox"
                name="sinTacc"
                value="Sin Tacc"
                onChange={(e) => setSinTacc(e.target.value)}
              />
              <label> Sin TACC</label>
            </div>
            <div class="w-1/2">
              <input
                type="checkbox"
                name="soloConEstos"
                value="Solo con estos"
                checked={onlyWith ? true : false}
                onChange={() => setOnlyWith(!onlyWith)}
              />
              <label> Solo con estos</label>
            </div>
          </div>

          <p>Ingrese Region:</p>
          <select
  name="select"
  value={region}
  onChange={handleRegion}
  className={styles.regionstyle}
>
  {valores.map((valor) => (
    <option key={valor.value} value={valor.value}>
      {valor.label}
    </option>
  ))}
</select>

          <div class="flex flex-row items-baseline">
            <input
              type="checkbox"
              name="soloConEstos"
              value="No debe contener"
              className={styles.regionstyle}
              checked={noIngredientes ? true : false}
              onChange={() => setNoIngredientes(!noIngredientes)}
            />
            <p>No debe contener:</p>
          </div>
          <input
            type="text"
            name="ingrediente"
            placeholder="No debe contener"
            className={styles.regionstyle}
            disabled={!noIngredientes}
            value={ingredientesExcluidos}
            onChange={(e) => setIngredientesExcluidos(e.target.value)}
          />
          <div class="flex flex-row items-baseline">
            <input
              type="checkbox"
              name="dificultad"
              value="Dificultad"
              className={styles.regionstyle}
              checked={enableDificutad ? true : false}
              onChange={() => setEnableDificultad(!enableDificutad)}
            />
            <p>Dificultad:</p>
          </div>
          <select
            name="select"
            value={dificultad}
            onChange={handleDificulty}
            disabled={!enableDificutad}
            className={styles.regionstyle}
          >
            <option value="">----</option>
            <option value="sencilla">Sencilla</option>
            <option value="elaborado">Elaborado</option>
          </select>

{/*           <p>Para cuantas personas:</p>
          <select
            name="select"
            value={cantidadPersonas}
            onChange={(e) => setCantidadPersonas(e.target.value)}
            className={styles.regionstyle}
          >
            <option value="">----</option>
            {personas.map((persona) => (
              <option key={persona.cant} value={persona.cant}>
                {persona.cant}
              </option>
            ))}
          </select> */}
          <div class='flex flex-row items-baseline'>
          <input
              type="checkbox"
              name="dificultad"
              value="Dificultad"
              className={styles.regionstyle}
              checked={enableTiempo ? true : false}
              onChange={() => setEnableTiempo(!enableTiempo)}
            />
          <p>Tenés tiempo para cocinar?</p>
          </div>
          <select
            name="select"
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            className={styles.regionstyle}
            disabled={!enableTiempo}
          >
            <option value="">----</option>
            <option value="tengo poco tiempo">Tengo poco tiempo para cocinar</option>
            <option value="tengo tiempo">Tengo tiempo para cocinar</option>
          </select>

          {loading ? (
            <span className={styles.loader}></span>
          ) : (
            <input type="submit" value="Generar plato" />
          )}
        </form>
        <div className={styles.responseContainer}>
          <pre className={styles.preResult}>{result}</pre>
        </div>
      </div>
    </>
  );
};

export default Inputs;
