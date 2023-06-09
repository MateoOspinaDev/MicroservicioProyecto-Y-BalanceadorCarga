const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const TipoProyecto = require('../models/tipoProyecto')
const Cliente = require('../models/cliente')
const Etapa = require('../models/etapa')
const Universidad = require('../models/universidad')

// crear
const createProyecto = async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { tipoProyecto, cliente, etapa, universidad } = data;

        const tipoProyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'tipo proy invalido'})
        }

        const clienteDB = Cliente.findOne({
            _id: cliente._id
        })
        if(!clienteDB){
            return res.status(400).json({msg: 'marca invalida'})
        }

        const etapaDB = Etapa.findOne({
            _id: etapa._id
        })
        if(!etapaDB){
            return res.status(400).json({msg: 'etapa invalida'})
        }

        const universidadDB = Universidad.findOne({
            _id: universidad._id
        })
        if(!universidadDB){
            return res.status(400).json({msg: 'universidad invalida'})
        }
        
        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

const getProyectos = async (req = request, 
    res = response) => {
        try{
            console.log('Entra la peticion')
            const proyectosDB = await Proyecto.find()
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'cliente'
                })
                .populate({
                    path: 'etapa'
                })
                .populate({
                    path: 'universidad'
                })
            return res.json(proyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const updateProyectoByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const proyecto  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}


module.exports = { 
    createProyecto, 
    getProyectos, 
    updateProyectoByID 
}