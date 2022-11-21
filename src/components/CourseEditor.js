import React, { useState } from 'react';
import useUser from '../hooks/useUser.js';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {useEditCourse} from '../hooks/useCourse';



export function CourseEditor(courseObject) {
    const {isEditLoading, hasEditError, hasEdited, editCourse} = useEditCourse()
    const [courseState,setCourseState] = useState(courseObject.state)
    const { session } = useUser()
    console.log(courseObject)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        object['id'] = courseObject.id
        object['state'] = courseState

        console.log(JSON.stringify(object));
        try {
            editCourse(object, session.token)
        } catch (e) {
            console.log(e)
            console.log('Error while editing course')
        }
    }

    const handleCourseStateChange = (event) => {
        setCourseState(event.target.value);
      }

    return (
        <Grid>
            <Card sx={{ maxWidth: 600 }}>
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
                                defaultValue={courseObject.name}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-description"
                                name="descripcion"
                                required
                                fullWidth
                                id="description"
                                label="Descripcion del curso"
                                defaultValue={courseObject.description}
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
                                defaultValue={courseObject.periodicity}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="cost"
                                label="Costo"
                                id="cost"
                                defaultValue={courseObject.cost}
                                autoComplete="new-cost"
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
                    {!isEditLoading &&
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modificar
                        </Button>
                    }
                    {isEditLoading &&
                        <Button
                            type="submit"
                            disabled
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modificando...
                        </Button>
                    }
                    {hasEdited && <strong>Edicion Correcta</strong>}
                    {hasEditError && <strong>Campos faltantes</strong>}
                </Box>
            </Card>
        </Grid>
    );
}
