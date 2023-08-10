import React from 'react';
import '../App.css';
import Options from './OptionCards';

export default function Homepage() {
    return (
        <div>
          {/* <NavBar id="navbar" /> */}
          <div id="intro-page">
            <h1>Drug Overdose Fatalities in the US in 2020 and Mitigation Methods</h1>
            <p>Drug overdose rates have been shooting up in the past few decades, from under 20,000 deaths in 1999 to over 106,000 deaths in 2021. Both the state and federal governments have tried multiple measures to flatten this growth curve - the two that will be examined here are Syringe Exchange Programs and Substance Abuse Facilities. Navigate around this dashboard to see multiple representations of data on dug overdoses in 2020.</p>
            <Options />
            <h4>To learn more, visit:</h4>
            <ol>
              <li>
                <a target='_blank' rel='noreferrer' href="https://nida.nih.gov/research-topics">
                https://nida.nih.gov/research-topics
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href="https://www.samhsa.gov/data/nsduh/national-releases">
                https://www.samhsa.gov/data/nsduh/national-releases
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href="https://www.hopkinsmedicine.org/institute_basic_biomedical_sciences/about_us/basic_research_human_health/Drug-Abuse/">
                https://www.hopkinsmedicine.org/institute_basic_biomedical_sciences/about_us/basic_research_human_health/Drug-Abuse/</a>
              </li>
            </ol>
          </div>
        </div>
      );
}

