import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ISession from './models/ISession';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class SessionsService {
    private apiUrl=environment.apiUrl;
    constructor(private http: HttpClient) {}

    getSessionsForWorkshop(workshopId: number) {
        return this.http.get<ISession[]>(
            `${this.apiUrl}/workshops/${workshopId}/sessions`
        );
    }
    voteForSession(sessionId: number, voteType: VoteType) {
      return this.http.put<ISession>(
          `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`,
          null // we generally pass data in put request. In this case we don't have any data
      );
  }
  addSession(session: Omit<ISession, 'id'>) {
    return this.http.post<ISession>(`${this.apiUrl}/sessions`, session, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
}
export type VoteType = 'upvote' | 'downvote';