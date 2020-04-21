const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mean-db', ['estudiantes']);

router.get('/estudiantes', (req,res,next)=>{
    db.estudiantes.find((err, estudiantes) =>{
        if (err) return next(err);
        res.json(estudiantes);
    });
});

router.get('/estudiantes/:id', (req,res,next)=>{
    db.estudiantes.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, estudiante) =>{
        if (err) return next(err);
        res.json(estudiante);
    });
});

router.post('/estudiantes', (req,res,next) => {
    const estudiante = req.body;
    if(!estudiante.name) {
        res.status(400).json({
            error: 'Datos Incorrectos'
        });
    } else {
        db.estudiantes.save(estudiante, (err, estudiante) => {
            if (err) return next(err);
            res.json(estudiante);
        });
    }
});

router.delete('/estudiantes/:id', (req,res,next) => {
    db.estudiantes.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

router.put('/estudiantes/:id', (req,res,next) => {
    const estudiante = req.body;
    const updateEstudiante = {};

    if(estudiante.doc){
        updateEstudiante.doc = estudiante.doc;
    }
    if(estudiante.name){
        updateEstudiante.name = estudiante.name;
    }
    if(estudiante.materia){
        updateEstudiante.materia = estudiante.materia;
    }
    if(estudiante.promedio){
        updateEstudiante.promedio = estudiante.promedio;
    }

    if(!updateEstudiante){
        res.status(400).json({
            error: 'Peticion Incorrecta'
        });
    } else {
        db.estudiantes.update({_id: mongojs.ObjectId(req.params.id)}, updateEstudiante, (err, estudiante) => {
            if (err) return next(err);
            res.json(estudiante);
        });
    }
    
});

module.exports = router;