import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISkill } from '../../core/models/skill.model';
import { SkillService } from '../../core/services/skill.service';

@Component({
  imports: [],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills implements OnInit {

  skills :ISkill[] = [];
  filter = 'All';
  constructor(private _skillService: SkillService,private _cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadSkills()
  }

  loadSkills(){
    this._skillService.getSkills().subscribe((res) => {
      this.skills = res.allSkills
      this._cdr.detectChanges();
    });
  }

  get categories(): string[] {
    const used = new Set(this.skills.map((s) => s.category));
    return ['All', ...used];
  }

  get visibleSkills(): ISkill[] {
    const list =
      this.filter === 'All' ? this.skills : this.skills.filter((s) => s.category === this.filter);
    return [...list].sort((a, b) => a.order - b.order);
  }

} 
