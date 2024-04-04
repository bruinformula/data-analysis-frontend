import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 195,
        },
    },
};  
const data = [
    { key: 'accm', value: 'Acceleration Magnitude' },
    { key: 'accx', value: 'Acceleration X' },
    { key: 'accy', value: 'Acceleration Y' },
    { key: 'accz', value: 'Acceleration Z' },
    { key: 'bat', value: 'Battery Voltage' },
    { key: 'cool', value: 'Coolant Temp' },
    { key: 'eng_speed', value: 'Engine Speed' },
    { key: 'egt', value: 'Exhaust Gas Temp' },
    { key: 'fan', value: 'Fan on/off' },
    { key: 'fuel_pres', value: 'Fuel Pressure' },
  ];

export default function MultipleSelectChip(props)
{
    const [selectedData, setSelectedData] = useState([]);
    const [selectedKey, setSelectedKey] = useState([]);


    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setSelectedData(value);
      };

    return(
        <div>
            <FormControl sx={{ m: 1, width: 195 }}>
            <InputLabel id="demo-multiple-chip-label">Data</InputLabel>
            <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selectedData}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={() => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedData.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {data.map((item) => (
                <MenuItem
                key={item.key}
                value={item.value}
                >
                {item.value}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    </div>
    );
    
}