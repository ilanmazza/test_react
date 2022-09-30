import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import ArrowLeftSharpIcon from '@mui/icons-material/ArrowLeftSharp';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';

export default function Example(props)
{
    var items = [
        {
            name: "Nuevo Sitio Institucional",
            description: "Tenemos el agrado de informarles que contamos con un nuevo sitio totalmente renovado para que puedas contratar las clases particulares que necesitás de una manera más sencilla y rápida"
        },
        {
            name: "+100 Profesores",
            description: "Más de 100 profesores se encuentran ofreciendo sus clases porque confían en 'API Cursos Online'"
        },
        {
            name: "+1000 personas aprendiendo",
            description: "En este 2022 contamos con más de 100 personas contratando clases particulares"
        }
    ]

    return (
        <Carousel
            navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
                bottom: '0',
                top: 'unset'
            }
            }}
            NextIcon={<ArrowRightSharpIcon/>}
            PrevIcon={<ArrowLeftSharpIcon/>}
            fullHeightHover='true'
            stopAutoPlayOnHover= 'true'
            height=''
            next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`) }
            prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
            indicatorIconButtonProps={{
              style: {
                  padding: '10px',    
                  color: 'grey'     
              }
          }}
          activeIndicatorIconButtonProps={{
            style: {
                padding: '10px',  
                color: 'blue'      
            }
        }}
        indicatorContainerProps={{
          style: {
              marginTop: '50px', 
              textAlign: 'center' 
          }
        }}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p> </p>
            <h4>{props.item.description}</h4>
            <p> </p>
        </Paper>
    )
}