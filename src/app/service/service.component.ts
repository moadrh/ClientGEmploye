import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService } from './service.service';
import { Service } from '../shared/Service'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

      services : Service[];
      serviceForm: FormGroup;
      operation: string = 'add';
      selectedService :Service ;

      constructor(private serviceService : ServiceService, private fb: FormBuilder){
         this.createForm();
      }

  ngOnInit() {
    this.initService();
    this.loadServices();
  }

  createForm(){
    this.serviceForm = this.fb.group({
      nom: ''
    });
  }

  loadServices(){
    this.serviceService.getServices().subscribe(
      data => {this.services = data},
      error => {console.log('erreurrrrrrrr !')},
      () => {console.log('Le chargement des services est terminé' )}
    );
  }

  addService(){
    const s = this.serviceForm.value;
    this.serviceService.addService(s).subscribe(
      res => {
        this.initService();
        this.loadServices();
      }
    );
  }

  updateService(){
    console.log("upd  "+this.selectedService.nom);
    this.serviceService.updateService(this.selectedService).subscribe(
      res => {
        this.initService();
        this.loadServices();
        this.operation="add";
      }
    );
  }

  deleteService(){
    this.serviceService.deleteService(this.selectedService.id).subscribe(
      res => {
        this.selectedService = new  Service();
        this.loadServices();
      }
    );
  }

  initService(){
    this.selectedService = new  Service();
    this.createForm();
  }

}
