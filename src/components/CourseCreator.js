import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {useCreateCourse} from '../hooks/useCourse';
import Typography from '@mui/material/Typography';


export function CourseCreator() {
    const {isCreateLoading, hasCreatedError, hasCreated, createCourse} = useCreateCourse()
    const { session } = useUser()
    const navigate = useNavigate();
    const [courseState,setCourseState] = useState('Publicado')

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        })
        object['state'] = courseState

        try {
            createCourse(object, session.token)
        } catch (e) {
            console.log(e)
            console.log('Error while editing course')
        }
    }

    useEffect(() => {
        if (hasCreated && !hasCreatedError){
            console.log("creado con exito")
            navigate('/myCourses')
        }
    },[hasCreated, hasCreatedError, navigate])

    const handleCourseStateChange = (event) => {
        setCourseState(event.target.value);
    }

    return (
        <Grid>
            <Card sx={[{ maxWidth: 600 },{ m: 2 }]}>
            <Typography variant="h5" gutterBottom>Crear Nuevo Curso</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-title"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Titulo del curso"
                                defaultValue=''
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-description"
                                name="description"
                                required
                                fullWidth
                                id="description"
                                label="Descripcion del curso"
                                defaultValue=''
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="periodicity"
                                label="Periodicidad"
                                name="periodicity"
                                defaultValue=''
                                autoComplete="new-periodicity"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="cost"
                                label="Costo"
                                id="cost"
                                defaultValue=''
                                autoComplete="new-cost"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="type"
                                label="Categorias (Separadas por coma ej: Ciencia,Matematica,Avanzado)"
                                id="type"
                                defaultValue=''
                                autoComplete="new-type"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Select
                                required
                                fullWidth
                                labelId="state-select-label"
                                id="state-select"
                                value={courseState}
                                label="state"
                                onChange={handleCourseStateChange}
                            >
                                <MenuItem value={"Publicado"}>Publicado</MenuItem>
                                <MenuItem value={"Despublicado"}>Despublicado</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {!isCreateLoading &&
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Crear
                        </Button>
                    }
                    {isCreateLoading &&
                        <Button
                            type="submit"
                            disabled
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Creando...
                        </Button>
                    }
                    {hasCreated &&  !hasCreatedError && <strong>Edicion Correcta</strong>}
                    {hasCreatedError && <strong>Campos faltantes</strong>}
                </Box>
            </Card>
        </Grid>
    );
}
