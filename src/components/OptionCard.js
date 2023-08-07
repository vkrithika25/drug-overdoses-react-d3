import React from "react"
import { Button, Card, CardContent, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../App.css"
// import { Link } from 'react-router-dom';


const theme = createTheme({
    typography: {
      h1: {
        fontFamily: 'Inter-Bold',
        fontSize: 15,
        lineHeight: 1.8,
      },
      body1: {
        fontFamily: 'Inter-Light',
        fontSize: 15,
        lineHeight: 1.1,
      }
      // Add more typography customizations as needed
    },
    // Add more customizations for other components like spacing, breakpoints, etc.
  });

// prop looks like:
// {
//     title: "[TITLE]"
//     body: "[INFO]"
// }

export default function OptionCard(props) {
  return (
    <div> 
      <ThemeProvider theme={theme}>
        <Card className="card" sx={{ backgroundColor: "white", borderRadius: '20px'}}>
          <CardContent sx={{ color: 'black', width: '28vw'}}>
            <Typography variant="h2" align="center">
              {props.title}
            </Typography>
            <Typography variant="body1" align="justify">
              {props.children}
            </Typography>
            <Button id="option-button" href={props.link} variant="contained" sx={{ backgroundColor: '#d60063' }} >Go to {props.title}</Button>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
