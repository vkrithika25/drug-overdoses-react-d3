import React from "react"
import InfoCard from "./info-card";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      color: '#FFFFFF',
      h1: {
        fontFamily: 'Inter-Bold',
        fontSize: 20, // Change the heading 1 font size
      },
      body1: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
      }
      // Add more typography customizations as needed
    },
    // Add more customizations for other components like spacing, breakpoints, etc.
  });


export default function BackgroundInfo(props) {
    return (
        <ThemeProvider theme={theme}>        
            <div className="BackgroundInfo">
                <h1>Background Information</h1>
                <>
                    {props.cardData.map((cardDatum, index) => (
                        <>
                            <InfoCard title={cardDatum.title} index={index} key={index}>{cardDatum.body}</InfoCard>
                            <br></br>
                        </>
                    ))}
                </>
            </div>
        </ThemeProvider>
    )
}