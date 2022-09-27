import dayjs from 'dayjs';
import Observation from '../models/observation-model.js';
const ZERO_KELVIN = -273.15;
class planetsRepository {
    retrieveAll(filter = {}) {
        // const filterSansWhere = {}
        // const testFiltre = {discoveredBy : 'Skadex' } => Where discoveredBy = 'Skadex'
        // const testFiltre2 = { temperature : { $gt: 240}, 'position.y': {$lt:500}} ($lt = <) ($gt = >) ($lte = <=) ($gte = >=)()
        // const testFiltre2 = {$or: [{ temperature : { $gt: 240}, 'position.y': {$lt:500}}]};
        return Observation.find(filter); // SELECT * FROM planets
    }
    retrieveOne(idPlanet){
        return Observation.findById(idPlanet); //Select * FROM planets WHERE idPlanet = [idPlanet]
    }
    create(observation){
        return Observation.create(observation); // INSERT () INTO planets VALUES()
    }
    delete(idObservation){
        return Observation.findByIdAndDelete(idObservation);
    }
    transform(observation, transformsOptions = {}){
        if (transformsOptions) {
            //changer les unités
            switch (transformsOptions.unit) {
                case 's':
                    observation.temperature += ZERO_KELVIN; 
                    observation.feelslike += ZERO_KELVIN; 
                    break;
                case 'f':
                    observation.temperature += ZERO_KELVIN; 
                    observation.feelslike += ZERO_KELVIN; 
                    break;
                default:
                    break;
            }
        }
        observation.discoveryDate = dayjs(observation.discoveryDate).format('YYYY-MM-DD');
        delete observation.createdAt;
        delete observation.updatedAt;
        delete observation.__v;
        return observation;
    }
    //TODO: TP - HexMatrix
    //this.calculateHexMatrix()
    //TODO: TP - wind Direction

    /*calculateHexMatrix(hexMatrix){

    }*/
}
export default new planetsRepository();