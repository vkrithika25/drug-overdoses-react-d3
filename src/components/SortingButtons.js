import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import '../App.css'

export default function SortingButtons(props) {
  const [sortBy, setSortBy] = useState('alphabetical');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    props.sortChangeHandler(event.target.value);
  };

  return (
    <div class="sorting">
        <h1>Sort By:</h1>
        <FormControl class="radio-group" component="fieldset">
        <RadioGroup
            aria-label="sort-graph"
            name="sort-graph"
            value={sortBy}
            onChange={handleSortChange}
        >
            <FormControlLabel value="alphabetical" id="alpha" control={<Radio />} label="Alphabetical" />
            <FormControlLabel value="median-ascending" id="ascending" control={<Radio />} label="Median - ascending" />
            <FormControlLabel value="median-descending" id="descending" control={<Radio />} label="Median - descending" />
        </RadioGroup>
        </FormControl>
    </div>
  );
}