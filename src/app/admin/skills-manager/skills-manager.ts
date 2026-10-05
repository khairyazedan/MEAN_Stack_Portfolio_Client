import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISkill, SkillCategory, ICreateSkill } from '../../core/models/skill.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../core/services/skill.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-skills-manager',
  styleUrl: './skills-manager.css',
  templateUrl: './skills-manager.html',
})  
export class SkillsManager implements OnInit{
  skills: ISkill[]=[];
  showForm = false;          
  filter = 'All'; 
  editingId = ''; 
  isSaving = false;
  errorMessage = '';

  categories: SkillCategory[] = [
    'Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Tools', 'Soft Skills',
  ];

  skillForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    proficiencyLevel: new FormControl(80, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.max(100)],
    }),
    iconUrl: new FormControl('', { nonNullable: true }),
    featured: new FormControl(false, { nonNullable: true }),
    order: new FormControl(0, { nonNullable: true }),
  });

  constructor(private _skillService:SkillService, private _cdr: ChangeDetectorRef){}


  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(){
    this._skillService.getSkills().subscribe((res)=>{
      this.skills = res.allSkills;
      this._cdr.detectChanges();
    });
  }

  get usedCategories(): string[] {
    return ['All', ...new Set(this.skills.map((s) => s.category))];
  }
  get visibleSkills(): ISkill[] {
    const list =
      this.filter === 'All' ? this.skills : this.skills.filter((s) => s.category === this.filter);
    return [...list].sort((a, b) => a.order - b.order);
  }

  openAdd(): void {
    this.editingId = '';
    this.errorMessage = '';
    this.skillForm.reset({
      category: '',
      proficiencyLevel: 80,
      featured: false,
      order: this.skills.length + 1,
    });
    this.showForm = true;
  }

  openEdit(skill: ISkill): void {
    this.editingId = skill._id;
    this.errorMessage = '';
    this.skillForm.reset({
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel ?? 80,
      iconUrl: skill.iconUrl ?? '',
      featured: skill.featured,
      order: skill.order,
    });
    this.showForm = true;
  }
  closeForm(): void {
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.skillForm.invalid) {
      this.skillForm.markAllAsTouched();
      return;
    }

    const v = this.skillForm.getRawValue();
    const data: ICreateSkill = {
      name: v.name.trim(),
      category: v.category as SkillCategory,
      proficiencyLevel: v.proficiencyLevel,
      iconUrl: v.iconUrl.trim(),
      featured: v.featured,
      order: v.order,
    };

    this.isSaving = true;
    this.errorMessage = '';

    const request = this.editingId
      ? this._skillService.updateSkill(this.editingId, data)
      : this._skillService.addSkill(data);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.showForm = false;
        this.loadSkills();
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err?.error?.message ?? 'Failed to save skill';
        this._cdr.detectChanges();
      },
    });
  }

  deleteSkill(skill: ISkill): void {
    if (!confirm(`Delete "${skill.name}"?`)) return;

    this._skillService.deleteSkill(skill._id).subscribe(() => {
      this.skills = this.skills.filter((s) => s._id !== skill._id);
      this._cdr.detectChanges();
    });
  }

}
