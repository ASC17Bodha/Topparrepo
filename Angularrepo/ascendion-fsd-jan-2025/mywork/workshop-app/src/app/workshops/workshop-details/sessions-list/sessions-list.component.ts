import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService, VoteType } from '../../sessions.service';
import ISession from '../../models/ISession';
import { VotingWidgetComponent } from '../../../common/voting-widget/voting-widget.component';

@Component({
    selector: 'app-sessions-list',
    standalone: true,
    imports: [VotingWidgetComponent],
    templateUrl: './sessions-list.component.html',
    styleUrl: './sessions-list.component.scss',
})
export class SessionsListComponent implements OnInit {
    workshopId!: number;
    sessions!: ISession[];

    constructor(
        private sessionsService: SessionsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        // this.activatedRoute.snapshot.paramMap is NOT an observable unlike this.activatedRoute.paramMap which is an observable
        const idStr = this.activatedRoute.snapshot.paramMap.get('id');
        this.workshopId = +(idStr as string);

        this.sessionsService.getSessionsForWorkshop(this.workshopId).subscribe({
            next: (sessions) => {
                this.sessions = sessions;
            },
        });
    }
    updateVote(session:ISession,voteType:VoteType){
      this.sessionsService.voteForSession(session.id,voteType).subscribe({
        next:(updatedSession)=>{
            session.upvoteCount=updatedSession.upvoteCount;
        }
      });
    }
}