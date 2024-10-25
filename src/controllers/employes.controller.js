import {pool} from '../db.js'

export const getEmployes = async (req, res) => {
    try{
    const [rows] = await pool.query('SELECT * FROM administrador')
    res.json(rows)
    }catch(error){
        
    }    
}

export const getEmploye = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({message: 'admin no encotrado'})
        res.json(rows[0])    
    } catch (error) {
        return res.status(500).json({
            message: 'algo esta mal'
        })    
    }
    
}

export const createEmployes = async (req, res) => {
    try {
        const {nombre_admin, correo_admin, contrasenia} = req.body
        const [rows] = await pool.query('INSERT INTO administrador (nombre_admin, correo_admin, contrasenia) VALUES (?, ?, ?)', [nombre_admin, correo_admin, contrasenia])
        res.send({
            id: rows.insertId,
            nombre_admin,
            correo_admin,
            contrasenia
        })   
    } catch (error) {
        return res.status(500).json({
            message: 'algo esta mal'
        })
    }
}

export const updateEmployes = async (req, res) => {
    try {
        const {id} = req.params
        const {nombre_admin, correo_admin, contrasenia} = req.body
        const [result] = await pool.query('UPDATE administrador SET nombre_admin = IFNULL(?, nombre_admin), correo_admin = IFNULL(?, correo_admin), contrasenia = IFNULL(?, contrasenia) WHERE id_administrador = ?', [nombre_admin, correo_admin, contrasenia, id])
        if (result.affectedRows === 0) return res.status(404).json({message: 'admin no encotrado'})
    
        const [rows] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id])
        res.json(rows[0])
        console.log(result)   
    } catch (error) {
        return res.status(500).json({
            message: 'algo esta mal'
        })
    }
}

export const deleteEmployes  = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM administrador WHERE id_administrador = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: 'admin no encotrado'}); else  res.sendStatus(204)
        console.log(result)   
    } catch (error) {
        return res.status(500).json({
            message: 'algo esta mal'
        })
    }    
} 
