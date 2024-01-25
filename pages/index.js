import Head from 'next/head';
import React, { useEffect, useState, useRef } from 'react'
import AppBar from '../components/appbar';
import LogSelector from '../components/log-selector'
import styles from '../styles/Home.module.css';
import Router from "next/router"
import InnerHTML from 'dangerously-set-html-content'
import Button from '@mui/material/Button'
import UploadFileIcon from "@mui/icons-material/UploadFile";
import parse from 'html-react-parser';


const SERVER_ADDRESS = 'http://52.53.251.227:3000'


export default function Home()
{
    const [dataTree, setDataTree] = useState({})
    const [plot, setPlot] = useState(<span>nothing here yet</span>)

    const fetchDataTree = async () => 
    {
        fetch(`${SERVER_ADDRESS}/api/datatree`,
        {
            method: 'GET',
            headers:
            {
                accept: 'application/json',
            }
        })
        .then(response => 
        {
            return response.json()
        })
        .then(dataTree => 
        {
            setDataTree(dataTree)
        })
    }

    const onLogSelect = (collectionName, name) =>
    {
        let plotData = 'accm,rotx'
        let extraArgs = prompt('extraArgs')
        fetch(`${SERVER_ADDRESS}/api/plot?collection=${collectionName}&name=${name}&plot=${plotData}&parser=mk8-data-parser`,
        {
            method: 'GET',
        })
        .then(response => 
        {
            return response.json()
        })
        .then(res => 
        {
            // https://codingshower.com/how-to-execute-rendered-script-tags-with-dangerouslysetinnerhtml-in-react/
            console.log(res.plot)
            setPlot(<InnerHTML html={res.plot} />)
        }).catch((error) =>
        {
            console.log(error)
        });
    }

    // https://codesandbox.io/s/react-file-upload-parse-csv-09plq1?file=/src/App.tsx:633-710
    const handleFileUpload = (event) =>
    {
        console.log('ya')
        if (!event.target.files)
            return;
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.readAsText(file);
        reader.onload = function()
        {
            const uploader = prompt('Please enter your name')
        const superFolder = prompt('Please enter superFolder')
        if (superFolder.includes('/'))
            return
        const subFolder = prompt('Please enter subFolder')
        if (subFolder.includes('/'))
            return
        const name = prompt('Please enter entry name')
        const dataDate = prompt('Please enter data\'s Date')
        const comments = prompt('Please enter any comments')
        fetch(`${SERVER_ADDRESS}/api/data`,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                collection: `${superFolder}/${subFolder}`,
                uploader: uploader,
                name: name,
                fileName: file.name,
                dataDate: dataDate,
                comments: comments,
                data: reader.result
            })
        }).then(response => 
            {
                return response.json()
            })
            .then(res => 
            {
                alert('success')
            })
        };

        
    }

    useEffect(() => 
    {
        fetchDataTree()
    }, [])
    //  className={styles.container}
    return (
        <div>
            <Head>
                <title>BFR Data Analysis</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav>
                <AppBar />
            </nav>

            <main>
                <span style={{ display: 'inline-block' }}>
                    <LogSelector onSelect={onLogSelect} dataTree={dataTree}/>
                </span>
                <span style={{ display: 'inline-block' }}>
                    {plot}
                </span>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    sx={{ marginRight: "1rem" }}
                >
                    Upload CSV
                    <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
                </Button>
            </main>
            
            
        
        </div>
    )
}

/*
<style jsx>{`
            main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            }
            footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            footer img {
            margin-left: 0.5rem;
            }
            footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
            }
            code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
            }
        `}</style>

        <style jsx global>{`
            html,
            body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
            * {
            box-sizing: border-box;
            }
        `}</style>
*/