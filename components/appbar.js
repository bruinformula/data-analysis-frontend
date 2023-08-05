import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const centerText = 'BFR Data Analysis';
const fontFamily = 'Arapey';

export default function AppBar(props)
{
    return (
        <div>
            <MuiToolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }} />
                <Typography color='black' variant='h5' fontFamily={ fontFamily }>
                    {centerText}
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography color='black'>
                        yeah
                    </Typography>
                </Box>
            </MuiToolbar>
      </div>
  );
}