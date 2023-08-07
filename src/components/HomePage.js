import React from 'react';
import '../App.css';
import Options from './OptionCards';

export default function Homepage() {
    return (
        <div>
          {/* <NavBar id="navbar" /> */}
          <div id="intro-page">
            <h1>Drug Overdose Fatalities in the US in 2020 and Mitigation Methods</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Faucibus purus in massa tempor nec. Elit pellentesque habitant morbi tristique senectus et netus. Tempus quam pellentesque nec nam aliquam sem et. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Felis imperdiet proin fermentum leo vel orci porta non</p>
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

