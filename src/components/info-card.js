import React from "react"
import { Card, CardContent, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      color: '#FFFFFF',
      h1: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        lineHeight: 1.8,
      },
      body1: {
        fontFamily: 'Inter-Light',
        fontSize: 12,
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

export default function InfoCard(props) {
  function getColor(index) {
    return (index % 2 === 0) ? '#D60063' : '#FF7A00';
  }    

  return (
    <div> 
      <ThemeProvider theme={theme}>
        <Card className="card" sx={{ backgroundColor: getColor(props.index), borderRadius: '20px'}}>
          <CardContent sx={{ color: '#ffffff'}}>
            <Typography variant="h1" align="center">
              {props.title}
            </Typography>
            <Typography variant="body1" align="justify">
              {props.children}
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
