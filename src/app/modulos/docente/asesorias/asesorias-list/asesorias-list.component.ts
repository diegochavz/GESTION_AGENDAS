import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import Formulario from "../../../../core/models/formulario.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../shared/confirmdialog/confirmdialog.component";
import Asesoria from "../../../../core/models/asesoria.model";
import {AsesoriaServiceImpl} from "../../../../core/http/implement/asesoria.service.impl";

@Component({
  selector: 'app-asesorias-list',
  templateUrl: './asesorias-list.component.html',
  styleUrls: ['./asesorias-list.component.scss']
})
export class AsesoriasListComponent implements OnInit {


  constructor(private asesoriaService: AsesoriaServiceImpl,
              public dialog: MatDialog) {

    /**this.loading = false;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.asesorias);
**/
  }

  ngOnInit(): void {
    //this.getAsesorias();
  }

  /**
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //columnas de la tabla
  displayedColumns: string[] = ['fecha', 'hora_inicio', 'hora_fin', 'estudiantes',  'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<Asesoria>;

  //Visualización barra de carga
  loading: boolean;

  //Identificador docente provisional
  idDocente = 1;

  asesorias: Array<Asesoria>;

  constructor(private asesoriaService: AsesoriaServiceImpl,
              public dialog: MatDialog) {
    this.loading = false;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.asesorias);

  }



  getAsesorias() {
    this.loading = true;
    this.asesoriaService.getAsesoriasByDocente(this.idDocente).subscribe(
      (listAsesorias: Array<Asesoria>) => {
        this.asesorias = listAsesorias;
        //this.toasterService.openSnackBar('Etapa creada exitosamente.', ToasterService.CERRAR_ACTION);

      },
      (error) => {
        console.log("Mensaje de error: " + error)
      },
      () => {
        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  eliminarFormulario(formulario: Formulario){
    this.loading = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Estas seguro de borrar el formulario?'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.formularioService.delete(formulario.id+"").subscribe(
          (newForm) => {
            console.log(newForm)
            //this.toasterService.openSnackBar('Etapa creada exitosamente.', ToasterService.CERRAR_ACTION);
          },
          (error) => {
          },
          ()=>{
            this.loading = false;
          });
      }

    });
  }

**/

}
