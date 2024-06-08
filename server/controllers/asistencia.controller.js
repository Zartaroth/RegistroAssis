import { getUserByDNI, getUsersRequest, registerUserRequest } from "../models/users.model.js";


export const searchUser = async (req, res) => {
    try {
        const { DocIdentidad } = req.body;

        if (!!!DocIdentidad) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'Campo Requerido'

                });
        }

        const user = await getUserByDNI(DocIdentidad);

        if (!user) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'El Ingeniero No Existe'

                });
        }

        res.status(200).json(
            {
                statusCode: 200,
                message: 'Se Encontro el Ingeniero',
                user: user,
            });

    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {

        const rows = await getUsersRequest();

        res.status(200).json(
            {
                statusCode: 200,
                message: 'Se Devolvio la tabla asistencia',
                rows: rows
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const registerUser = async (req, res) => {
    try {

        const { ticket, DocIdentidad } = req.body;

        if (!!!DocIdentidad || !!!ticket) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'Campo Requerido'

                });
        }

        await registerUserRequest(ticket, DocIdentidad);

        res.status(200).json(
            {
                statusCode: 200,
                message: 'Ingeniero Registrado',
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}