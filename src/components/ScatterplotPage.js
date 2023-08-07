import React, { useState } from 'react';
import '../App.css';
import BackgroundInfo from './background-info';
import Scatterplot from './Scatterplot';
import Filter from './Filter';
import NavBar from './NavBar';

export default function ScatterplotPage() {
    const items = [
        { title: 'Syringe Exchange Programs', body: 'Drug overdose rates have been shooting up in the past few decades, from under 20,000 deaths in 1999 to over 106,000 deaths in 2021. Stigma surrounding substance abuse and addiction plays no small part in the number of deaths, as those addicted do not feel supported in their path to seek recovery. Additionally, the prevalence of dangerous synthetic opioids has increased over the past few years as well, leading to accidental overdoses.' },
        { title: 'Substance Abuse Facilities', body: '"A Drug Overdose", in this context, refers to any death caused by the use or abuse of a pharmaceutical agent. There is a specific subset of drug overdoses caused by opioid overdoses, which has also seen an alarming positive trend over the past few years, but this visualization focuses on all deaths caused by drug overdoses, including those caused by over-the-counter (OTC) medication.' },
    ];

    const [selectedColors, setSelectedColors] = useState(['FACILITY', 'SYRINGE']);
    
    function handleFilterItemClick(color) {
      if (selectedColors.includes(color)) {
        var newColors = selectedColors.filter((d) => d !== color);
        if (newColors.length === 0) {
          (color === 'FACILITY') ? newColors = ['SYRINGE'] : newColors = ['FACILITY'];
        }
        setSelectedColors(newColors);
      } else {
        setSelectedColors([...selectedColors, color]);
      }
    }

    return (
      <div className="App">
        <NavBar id="navbar" />
        <div className='content'>
          <div className='background'>
            <BackgroundInfo cardData={items} />
            <Filter selectedColors={selectedColors} filterClickHandler={handleFilterItemClick} />
          </div>
          <div className="container">            
            <Scatterplot selectedColors={selectedColors}/>
          </div>
        </div>
      </div>
      );
} 
