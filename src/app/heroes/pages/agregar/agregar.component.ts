import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    
    `
      img {
        width: 75%;
        border-radius: 10px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics'
    }

  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }


   
  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroesPorId(id))
    ).subscribe( heroe => this.heroe = heroe)
  
  }


  guardar(){

    if(!this.heroe.superhero.trim()){return;}

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostrarSnakbar('Registro actualizado')
      )
    }else {
      //Vamos a crear un nuevo heroe
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnakbar('Registro creado');
      })
    }
  }
  borrarHeroe(){

    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })
    dialogRef.afterClosed()
    .subscribe(resp => {
      if(resp){
        this.heroesService.borrarHeroe(this.heroe.id!)
        .subscribe( resp => {
          this.router.navigate(['/heroes']);
        })
      }
    })

   
  }

  mostrarSnakbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 3000
    });
  }

  
}
