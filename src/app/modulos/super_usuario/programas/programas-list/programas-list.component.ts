import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-programas-list',
  templateUrl: './programas-list.component.html',
  styleUrls: ['./programas-list.component.scss']
})
export class ProgramasListComponent implements OnInit, AfterViewInit {

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_programa','nombre_programa', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<Programa>;

  //Visualización barra de carga
  loading: boolean;

  programas: Array<Programa>;

  constructor(private  programaService: ProgramaServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService) {
    this.loading = true;
    // Assign the data to the data source for the table to render
    this.programas = [];
    this.dataSource = new MatTableDataSource(this.programas);
  }

  ngOnInit():void {
    this.getProgramas();
  }

  ngAfterViewInit() {

  }

  getProgramas() {
    this.loading = false;
    this.programas = [];
    this.programaService.getAll().subscribe(
      (listProgramas: Array<Programa>) => {
        this.programas = listProgramas;
        this.dataSource = new MatTableDataSource(this.programas);
      },
      (error) => {
        console.log("ERROR -> LISTAR PROGRAMAS")
      },
      () => {
        this.loading = true;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarPrograma(idPrograma: number) {
    this.dialogService.deleteProgramaDialog(idPrograma).subscribe(res => {
      if (res) {
        this.getProgramas();
        this.toasterService.openSnackBar(
          'Programa eliminado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  agregarPrograma() {
    this.dialogService.addProgramaDialog().subscribe(res => {
      if (res) {
        this.getProgramas();
        this.toasterService.openSnackBar(
          'Programa agregado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  editarPrograma(programa: Programa) {
    this.dialogService.editProgramaDialog(programa).subscribe(res => {
      if (res) {
        this.getProgramas();
        this.toasterService.openSnackBar(
          'Programa editado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

}
