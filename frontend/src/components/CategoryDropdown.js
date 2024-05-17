import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// dropdown for the projects

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CategoryDropdown(props) {
    const fetched = []
    if (props.categories){
        for (const [key, value] of props.categories.entries()) {
            for (const arrayValue of Object.values(value)) {
                fetched.push(...arrayValue);
            }
          }
    }
    
    

    const handleChange = (event) => {
        props.setLabel(event.target.value)
    };
    
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="simple-select-label">Categories</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={props.label}
                    onChange={handleChange}
                    input={<OutlinedInput label="Categories" />}
                    MenuProps={MenuProps}
                >

                    {fetched.length === 0 ? (
                        <MenuItem disabled>
                            <ListItemText primary="Loading..." />
                        </MenuItem>
                    ) : (
                        fetched.map((name) => (
                            <MenuItem key={name} value={name}>
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        </div>
    );
}