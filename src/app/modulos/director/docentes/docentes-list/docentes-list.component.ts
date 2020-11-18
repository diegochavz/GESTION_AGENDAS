import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import DocenteResponse from "../../../../core/models/docente_response.model";

@Component({
  selector: 'app-docentes-list',
  templateUrl: './docentes-list.component.html',
  styleUrls: ['./docentes-list.component.scss']
})
export class DocentesListComponent implements OnInit, AfterViewInit {

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_docente','nombre', 'correo','opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<DocenteResponse>;

  //Visualización barra de carga
  loading: boolean;

  docentes: Array<DocenteResponse>;


  constructor(private  docenteService: DocenteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService) {
    this.loading = true;
    this.docentes = [];
    this.dataSource = new MatTableDataSource(this.docentes);

  }

  ngOnInit():void {
    this.getDocentes();
  }

  ngAfterViewInit() {

  }

  getDocentes() {
    console.log("Me repito n veces")
    this.loading = false;
    this.docentes = [];
    this.docenteService.getAll().subscribe(
      (listDocentes: Array<DocenteResponse>) => {
        this.docentes = listDocentes;
        this.dataSource = new MatTableDataSource(this.docentes);
      },
      (error) => {
        console.log("ERROR -> LISTAR DOCENTES")
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

  eliminarDocente(idDocente: number) {
    this.dialogService.deleteDocenteDialog(idDocente).subscribe(res => {
      if (res) {
        this.getDocentes();
        this.toasterService.openSnackBar(
          'Docente eliminado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  agregarDocente() {
    this.dialogService.addDocenteDialog().subscribe(res => {
      if (res) {
        this.getDocentes();
        this.toasterService.openSnackBar(
          'Docente agregado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  editarDocente(docenteResponse: DocenteResponse) {
    console.log(docenteResponse)
    this.dialogService.editDocenteDialog(docenteResponse).subscribe(res => {
      if (res) {
        this.getDocentes();
        this.toasterService.openSnackBar(
          'Docente editado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

}
