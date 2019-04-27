import { Service } from './Service';

export class Employe {
    constructor( public id?: number,
                 public nom?:string,
                 public prenom?:string,
                 public dateNaissance?:any,
                 public sexe?:string,
                public service?:any
                )
    {

    }
}