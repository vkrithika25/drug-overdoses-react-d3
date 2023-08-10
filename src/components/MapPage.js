import React from "react"
import Map from "./Map";
import BackgroundInfo from "./background-info";
import NavBar from './NavBar';
import "../App.css"

const items = [
  { title: 'The Drug Epidemic', body: 'Drug overdose rates have been shooting up in the past few decades, from under 20,000 deaths in 1999 to over 106,000 deaths in 2021. Stigma surrounding substance abuse and addiction plays no small part in the number of deaths, as those addicted do not feel supported in their path to seek recovery. Additionally, the prevalence of dangerous synthetic opioids has increased over the past few years as well, leading to accidental overdoses.' },
  { title: 'What is an Overdose?', body: '"A Drug Overdose", in this context, refers to any death caused by the use or abuse of a pharmaceutical agent. There is a specific subset of drug overdoses caused by opioid overdoses, which has also seen an alarming positive trend over the past few years, but this visualization focuses on all deaths caused by drug overdoses, including those caused by over-the-counter (OTC) medication.' },
  { title: 'Current Legislation', body: 'Current Legislation', body: 'Legislation surrounding drug use varies, and is inconsistent between the state and federal government. Federally, many drugs remain criminalized for non-medical use. However, many states, have begun the process of decriminalizing certain types of drugs. A well known example of this is marijuana, which is legal both recreationally and medicinally in many states, but this policy extends to drugs like heroin in cocain as well in some states.' },
];

const map_margins = {
  left: 35,
  right: 35,
  top: 10,
  bottom: 35
};
const map_dims = {
    height: 500,
    width: 750
};

export default function MapPage() {
      return (
        <div className="App">
          <NavBar id="navbar" />
          <div className='content'>
            <div className='background'>
              <BackgroundInfo cardData={items} />
            </div>
            <div className="container">    
              <h4>A state-by-state view of total deaths per 100k people caused by drug poisonings and overdoses. This was calculated by aggregating county level data for all states from the Social Determinants of Health 2020 dataset. Hover over individual states to discover more about specific drug overdose trends, mitigation strategies, and other information </h4>  
              <Map margins={map_margins} dims={map_dims} />
            </div>
          </div>
        </div>
      )
}