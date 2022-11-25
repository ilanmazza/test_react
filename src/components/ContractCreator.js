import React, {useEffect} from 'react';
import useUser from '../hooks/useUser.js';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useCreateContract} from '../hooks/useContract';
import {Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';


export function ContractCreator(courseObject) {
    const {isCreateLoading, hasCreatedError, hasCreated, createContract} = useCreateContract()
    const { session } = useUser()
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        object['courseid'] = courseObject.id

        try {
            createContract(object, session.token)
        } catch (e) {
            console.log(e)
            console.log('Error while editing course')
        }
    }

    useEffect(() => {
        if (hasCreated && !hasCreatedError){
            console.log("creado con exito")
            navigate('/myContracts')
        }
    },[hasCreated, hasCreatedError, navigate])

    return (
        <Grid>
            <Card sx={[{ maxWidth: 600 }, { m: 2 }]}>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Formulario de contacto</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-phone"
                                name="usercontactphone"
                                required
                                fullWidth
                                id="usercontactphone"
                                label="Telefono de Contacto"
                                defaultValue={courseObject.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-email"
                                name="usercontactmail"
                                required
                                fullWidth
                                id="usercontactmail"
                                label="Mail de contacto"
                                defaultValue={courseObject.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="usercontacttime"
                                label="Horarios de Contacto"
                                name="usercontacttime"
                                defaultValue=''
                                autoComplete="given-contact-time"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="usermessage"
                                label="Mensaje"
                                id="usermessage"
                                defaultValue=''
                                autoComplete="new-message"
                            />
                        </Grid>
                    </Grid>
                    {!isCreateLoading && !hasCreatedError &&
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enviar
                        </Button>
                    }
                    {isCreateLoading && !hasCreatedError &&
                        <Button
                            type="submit"
                            disabled
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enviando...
                        </Button>
                    }
                    {hasCreatedError &&
                        <Button
                            type="submit"
                            disabled
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Creado Correctamente
                        </Button>
                    }
                    {hasCreated && !hasCreatedError && <strong>Enviado</strong>}
                    {hasCreatedError && <strong>Campos faltantes</strong>}
                </Box>
            </Card>
        </Grid>
    );
}
