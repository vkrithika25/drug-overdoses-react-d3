import React from "react"
import OptionCard from "./OptionCard";

export default function Options() {
    return (
        <div className="options">
            <OptionCard title="Map View" link="/drug-overdoses-react-d3/map">
                <ul>
                    <li>Visual: map representation of US states</li>
                    <li>Information: median drug overdose rates per state in 2020, with color gradation for easy geographic comparison</li>
                    <li>Filtering: None</li>
                </ul>
            </OptionCard>
            <OptionCard title="Scatterplot View" link="/drug-overdoses-react-d3/scatterplot">
                <ul>
                    <li>Visual: Scatterplot of US counties</li>
                    <li>Information: Correlation between mitigation strategies &#40;Syringe Exchange Programs and Substance Abuse Facilities&#41; and drug overdose rates in all US counties</li>
                    <li>Filtering: Filter by mitigation strategy</li>
                </ul>
            </OptionCard>
            <OptionCard title="BoxPlot View" link="/drug-overdoses-react-d3/box">
                <ul>
                    <li>Visual: Stacked Box-and-Whisker plots of US states</li>
                    <li>Information: Percentile information about drug overdose fatality rates for all states in 2020</li>
                    <li>Filtering: Sort by median</li>
                </ul>
            </OptionCard>
        </div>
    )
}