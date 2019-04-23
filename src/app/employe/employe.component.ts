import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeService } from './employe.service';
import { Service } from '../shared/Service'
import { Employe } from '../shared/Employe';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

      employes : Employe[];
      employeForm: FormGroup;
      operation: string = 'add';
      selectedEmploye :Employe ;

      constructor(private employeService : EmployeService, private fb: FormBuilder){
         this.createForm();
      }

  ngOnInit() {
    this.initEmploye();
    this.loadEmployes();
  }

  createForm(){
    this.employeForm = this.fb.group({
      nom: '',
      prenom:'',
      dateNaissance:'',
      sexe:'',
      service:''
    });
  }

  loadEmployes(){
    this.employeService.getEmployes().subscribe(
      data => {this.employes = data},
      error => {console.log('erreurrrrrrrr !')},
      () => {console.log('Le chargement des employes est terminé' )}
    );
  }

  addEmploye(){
    const s = this.employeForm.value;
    this.employeService.addEmploye(s).subscribe(
      res => {
        this.initEmploye();
        this.loadEmployes();
      }
    );
  }

  updateEmploye(){
    
    this.employeService.updateEmploye(this.selectedEmploye).subscribe(
      res => {
        this.initEmploye();
        this.loadEmployes();
        this.operation="add";
      }
    );
  }

  deleteEmploye(){
    this.employeService.deleteEmploye(this.selectedEmploye.id).subscribe(
      res => {
        this.selectedEmploye = new  Employe();
        this.loadEmployes();
      }
    );
  }

  initEmploye(){
    this.selectedEmploye = new  Employe();
    this.createForm();
  }

}
