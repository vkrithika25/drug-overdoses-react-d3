import React from 'react';
import '../App.css'
import BackgroundInfo from './background-info';
import Scatterplot from './Scatterplot';

export default function PlotView(props) {
    const items = [
        { title: 'The Drug Epidemic', body: 'Drug overdose rates have been shooting up in the past few decades, from under 20,000 deaths in 1999 to over 106,000 deaths in 2021. There are many moving parts to this ___ statistic. Stigma surrounding substance abuse and addiction plays no small part in the number of deaths, as those already addicted do not feel supported in their ath to seek recovery. Additionally, the increase in prevalence of dangerous synthetic opioids has increased over the past few years as well. Many overdoses are accidental, as people take drugs that have been laced with deadly amounts of strong opioids such as fentanyl.' },
        { title: 'What is an Overdose?', body: '"A Drug Overdose", in this context, refers to any death caused by the use or abuse of a pharmaceutical agent. There is a specific subset of drug overdoses caused by opioid overdoses, which has also seen an alarming positive trend over the past few years, but this visualization focuses on all deaths caused by drug overdoses, including those caused by over-the-counter (OTC) medication.' },
        { title: 'Current Legislation', body: 'Legislation surrounding drug use varies, and is inconsistent between the state and federal government. Federally, many drugs remain criminalized for non-medical use. However, many states, have begun the process of decriminalizing certain types of drugs. A well known example of this is marijuana, which is legal both recreationally and medicinally in many states, but this policy extends to drugs like heroin in cocain as well in some states.' },
    ];

    const margins = {
        left: 35,
        right: 35,
        top: 10,
        bottom: 35
    };
    const dims = {
        height: 750,
        width: 750
    };

    return (
        <div className="PlotView">
          <BackgroundInfo cardData={items} />
          <div className="container"       
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%"
          }}>            
            <Scatterplot margins={margins} dims={dims} />
          </div>
        </div>
      );
}