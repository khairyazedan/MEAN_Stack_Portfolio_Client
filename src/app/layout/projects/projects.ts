import { ChangeDetectorRef, Component } from '@angular/core';
import { IProject } from '../../core/models/project.model';
import { ProjectsService } from '../../core/services/projects.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {
  projects :IProject[] = [];
  selectedProject: IProject | null = null;
  imageIndex = 0;

  constructor(private _projectService: ProjectsService, private _cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.loadProjects();
  }

  loadProjects():void{
    this._projectService.getProjects().subscribe((res) => {
      this.projects = res.allprojects
        .slice(0, 6);
      this._cdr.detectChanges();
    })
  }

  get gallery(): string[] {
    const p = this.selectedProject;
    if (!p) return [];
    return [p.coverImage, ...p.images].filter((img): img is string => !!img);
  }
  openProject(project: IProject): void {
    this.selectedProject = project;
    this.imageIndex = 0;
    document.body.style.overflow = 'hidden';
  }
  
  closeProject(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }
  
  nextImage(): void {
    this.imageIndex = (this.imageIndex + 1) % this.gallery.length;
  }
  
  prevImage(): void {
    this.imageIndex = (this.imageIndex - 1 + this.gallery.length) % this.gallery.length;
  }

}
  