import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RecruiterDetailComponent } from '../recruiter-detail/recruiter-detail.component';
import { ApplicantData } from '../interfaces';
import { ApplicantService } from '../applicant.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'status'];
  dataSource: MatTableDataSource<ApplicantData>;
  applicants: ApplicantData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.applicantService.getApplicants().subscribe(applicants => {
      this.applicants = applicants;
      this.dataSource = new MatTableDataSource(this.applicants);
      this.dataSource.paginator = this.paginator;
    });    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = this.applicants[0];

    this.dialog.open(RecruiterDetailComponent, dialogConfig);
  }
}
