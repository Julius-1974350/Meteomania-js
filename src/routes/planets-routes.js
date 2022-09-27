import express from "express";
import HttpError from "http-errors";
import observationsRepository from '../repositories/observations-repository.js'
const router = express.Router();

class PlanetsRoutes {
    // déjà dans le path planet = /
    constructor(){
        router.post('/', this.post);// /planets
        router.delete('/:idObservation', this.deleteOne); // /planets/:idPlanets
        router.get('/:stationName', this.getAll); // /planets
        router.get('/:stationName/:idObservation', this.getOne); // /planets/:idPlanets
    }
    async post(req, res, next){
        try {
            let newObservation = await observationsRepository.create(req.body);
            newObservation = newObservation.toObject({getters:false, virtuals:false});
            newObservation = observationsRepository.transform(newObservation);
            res.status(201).json(newObservation);
        } catch (err) {
            return next(err);
        }
    }
    async getAll(req, res, next){
        try {
            const transformOptions = {};
            const filter = {};
            if (req.query.explorer) {
                filter.discoveredBy = req.query.explorer;
            }
            if (req.query.unit) {
                const unit = req.query.unit;
                if (unit === 'm' || unit === 's' || unit === 'f') {
                    transformOptions.unit = unit;
                }else{
                    return next(HttpError.BadRequest(`Le paramètre unit doit avoir comme valeur m pour Celsius, s pour Kelvin, f pour Fahrenheit`));
                }                
            }
            let observations = await observationsRepository.retrieveAll(filter);
            observations = observations.map(o => {
                o = o.toObject({getters:false, virtuals:false});
                o = observationsRepository.transform(o, transformOptions);
                return o;
            });
            res.status(200).json(observations);
        } catch (err) {
            return next(err);   
        }
    }
    async getOne(req, res, next){
        try {
            let observation = await observationsRepository.retrieveOne(req.params.idObservation);
            if(!observation){
                return next(HttpError.NotFound(`L'observation avec l'identifiant ${req.params.idObservation} n'existe pas.`))
            }
            // Transformer/Nettoyer l'objet avant de l'envoyer dans la réponse
            observation = planet.toObject({getters:false, virtuals:false});
            observation = observationsRepository.transform(observation);
            res.status(200).json(planet);
        } catch (err) {
            return next(err);
        }

    }

    deleteOne(req, res, next){
        return next(HttpError.MethodNotAllowed(`Impossible de supprimer`));
    }

}
new PlanetsRoutes();
export default router;

