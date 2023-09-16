**Exploring 2020 Drug Overdose Data Across the United States**

**Quick Access:** You can visit the web app to see the final product [here](https://vkrithika25.github.io/drug-overdoses-react-d3)

**Description:**
This is a web application that explores data about drug oversodes in all 50 states across the United States in 2020 using data visualization. The COVID-19 pandemic witnessed a distressing surge in drug overdose rates, emphasizing the critical need to monitor these shifts. Such data aids local, state, and federal governments in tailoring their substance abuse support programs to effectively serve their communities. In addition to presenting mortality rates attributed to drug overdoses, these visualizations illustrate two strategies employed at the county level to combat substance abuse: syringe exchange facilities and substance abuse treatment centers that accept Medicaid.

**Data Source:**
I used the Social Determinants of Health (SDOH) dataset from 2020, provided by the Agency for Healthcare Research and Quality (AHRQ). This dataset encompasses a staggering 200 columns of data from each of the over 3,000 counties in the United States.

**Visualizations:**
1. Map View: A choropleth map offers an aggregate overview of drug overdose rates by state.
2. Boxplot View: Dive into aggregate statistics per state through the interactive boxplot visualization.
3. Scatterplot View: This scatterplot maps overdose rates against the availability of syringe exchange facilities and Medicaid-accepting substance abuse treatment centers at the county level.

You can explore these visualizations further with the help of various tooltips and filters for a richer understanding of the data.

**Technologies:**
I utilized Python script to parse and transform the raw SDOH dataset into a JSON object. The UI of this app was constructed using the React.js and Material UI libraries, while data visualization was achieved through the powerful d3.js library.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
