import React, { useState } from 'react';
import '../App.css';
import BackgroundInfo from './background-info';
import BoxView from './BoxView';
import SortingButtons from './SortingButtons';
import NavBar from './NavBar';

const items = [
    { title: 'The Drug Epidemic', body: 'Drug overdose rates have been shooting up in the past few decades, from under 20,000 deaths in 1999 to over 106,000 deaths in 2021. Stigma surrounding substance abuse and addiction plays no small part in the number of deaths, as those addicted do not feel supported in their path to seek recovery. Additionally, the prevalence of dangerous synthetic opioids has increased over the past few years as well, leading to accidental overdoses.' },
    { title: 'What is an Overdose?', body: '"A Drug Overdose", in this context, refers to any death caused by the use or abuse of a pharmaceutical agent. There is a specific subset of drug overdoses caused by opioid overdoses, which has also seen an alarming positive trend over the past few years, but this visualization focuses on all deaths caused by drug overdoses, including those caused by over-the-counter (OTC) medication.' },
    { title: 'Current Legislation', body: 'Current Legislation', body: 'Legislation surrounding drug use varies, and is inconsistent between the state and federal government. Federally, many drugs remain criminalized for non-medical use. However, many states, have begun the process of decriminalizing certain types of drugs. A well known example of this is marijuana, which is legal both recreationally and medicinally in many states, but this policy extends to drugs like heroin in cocain as well in some states.' },
];

export default function BoxPage() {

    const [selectedSort, setSelectedSort] = useState('alphabetical');

    function handleSortingMethodChange(sort) {
      setSelectedSort(sort);
    }

    return (
      <div className="App">
        <NavBar id="navbar" />
        <div className='content'>
          <div className='background'>
            <BackgroundInfo cardData={items} />
            <SortingButtons sortChangeHandler={handleSortingMethodChange} />
          </div>
          <div className="container">
            <h1>A Look at Drug Overdose and Poisoning Deaths by State in 2020</h1>                
            <h4>Hover over each state's box to get exact statistics</h4>                
            <BoxView selectedSort={selectedSort}/>
          </div>
        </div>
      </div>
      );
} 
