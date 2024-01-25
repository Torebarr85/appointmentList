import { Component } from '@angular/core';
import { Appointment } from '../modules/appointment';
import { OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointmentArray: Appointment[] = [];
  isDone: boolean = false;

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments');

    this.appointmentArray = savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
    this.sortAppointment(this.appointmentArray);
  }
  alertTest() {
    alert('HAI CLICCATO 2 VOLTE');
  }
  sortAppointment(appointmentArray: Appointment[]) {
    appointmentArray.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }

  addAppointment() {
    if (this.newAppointmentDate && this.newAppointmentTitle.trim().length) {
      let newAppointment: Appointment = {
        id: uuidv4(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
        done: this.isDone,
      };
      this.appointmentArray.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();
      this.sortAppointment(this.appointmentArray);
      localStorage.setItem(
        'appointments',
        JSON.stringify(this.appointmentArray)
      );
    } else {
      alert('all the fields must be compiled!');
    }

    console.log(this.appointmentArray);
  }

  removeAppointment(index: number) {
    /*
    - get the index
    - binding index al click
    - scorrere array
    - cancellare item 
    */

    this.appointmentArray.splice(index, 1);
    this.sortAppointment(this.appointmentArray);
    localStorage.setItem('appointments', JSON.stringify(this.appointmentArray));
  }

  //Se appuntamneto is done
  updateAppointment(index: number) {
    // ho index dell'appointment id cliccato
    // ricavo appointment id che hai checckato
    // la lista appointments salvata
    // scorri la lista quando trovo id corrispondente
    //cambio done in true or false

    let idAppointmentToUpdate: string = this.appointmentArray[index].id;

    //recupera l'array salvato nello storage
    let savedAppointmentsString = localStorage.getItem('appointments');
    let savedAppointments = savedAppointmentsString
      ? JSON.parse(savedAppointmentsString)
      : [];

    if (savedAppointments != null) {
      for (let i = 0; i < savedAppointments.length; i++) {
        if (idAppointmentToUpdate === savedAppointments[i].id) {
          // Cambia il valore di done in true o false
          savedAppointments[i].done = !savedAppointments[i].done;

          this.sortAppointment(savedAppointments);
          // Aggiorna la lista di appuntamenti salvati nel localStorage
          localStorage.setItem(
            'appointments',
            JSON.stringify(savedAppointments)
          );
          break; // Puoi uscire dal ciclo quando hai trovato il corrispondente appuntamento
        }
      }
    }
  }
}
