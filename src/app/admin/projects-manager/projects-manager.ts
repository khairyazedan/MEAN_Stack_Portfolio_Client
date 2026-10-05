import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProject } from '../../core/models/project.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-projects-manager',
  styleUrl: './projects-manager.css',
  templateUrl: './projects-manager.html',
})
export class ProjectsManager implements OnInit{
  projects :IProject[] = [];
  showForm = false;          
  filter = 'All';   
  editingId = ''; 
  editingCompletedAt = ''; 
  

  projectForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    slug: new FormControl(''),
    summary: new FormControl(''),
    description: new FormControl(''),
    coverImage: new FormControl(null),  
    liveUrl: new FormControl(''),
    githubUrl: new FormControl(''),
    technologies: new FormControl(''),  
    featured: new FormControl(false),
    order: new FormControl(0),
    completedAt: new FormControl(''),  
  });

  constructor(private _projectService: ProjectsService,private _cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadProjects()
    
  }
  loadProjects(){
    this._projectService.getProjects().subscribe((res)=>{
      this.projects = res.allprojects;
      this._cdr.detectChanges();
    })
  }
  openNew() {
    this.editingId = '';
    this.projectForm.reset({ technologies: '', featured: false, order: 0 });
    this.showForm = true;
  }

  openEdit(project: IProject) {
    this.editingId = project._id;
    this.projectForm.reset({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description ?? '',
      coverImage: null,                         
      liveUrl: project.liveUrl ?? '',
      githubUrl: project.githubUrl ?? '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      featured: project.featured,
      order: project.order,
      completedAt: project.completedAt ? project.completedAt.slice(0, 10) : '',
    });
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingId = '';
  }
 
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.projectForm.patchValue({ coverImage: event.target.files[0] });
    } else {
      this.projectForm.patchValue({ coverImage: null });
    }
  }
 
  onSubmit() {
    const v = this.projectForm.value;
    let myFormData = new FormData();
 
    myFormData.append('title', v.title);
    myFormData.append('slug', v.slug);
    myFormData.append('summary', v.summary);
    myFormData.append('description', v.description);
    myFormData.append('liveUrl', v.liveUrl);
    myFormData.append('githubUrl', v.githubUrl);
    myFormData.append('technologies', v.technologies);
    myFormData.append('featured', String(v.featured));   
    myFormData.append('order', String(v.order));
    if (v.completedAt) {
      myFormData.append('completedAt', v.completedAt);
    }
 
    // only add the image if the user picked one
    if (v.coverImage) {
      myFormData.append('coverImage', v.coverImage);
    }
 
    if (this.editingId) {
      this._projectService.updateProject(this.editingId, myFormData).subscribe(() => {
        console.log('Project updated successfully');
        this.closeForm();
        this.loadProjects();
      });
    } else {
      this._projectService.addProject(myFormData).subscribe(() => {
        console.log('Project added successfully');
        this.closeForm();
        this.loadProjects();
      });
    }
  }
 
  deleteProject(id: string) {
    if (!confirm('Delete this project?')) return;
 
    this._projectService.deleteProject(id).subscribe(() => {
      console.log('Project deleted successfully');
      this.loadProjects();
    });
  }

}
  