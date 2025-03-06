import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Issue } from "../models/issues.model";

@Injectable({
    providedIn:"root"
})

export class IssueService{
    baseUrl:string="http://localhost:3000/issues";

    constructor(private httpclient:HttpClient){
    }
    getIssues(){
        return this.httpclient.get<Issue[]>(this.baseUrl);
    }
    getIssueByID(id:number){
        return this.httpclient.get<Issue>(this.baseUrl+'/'+id);
    }
    createIssue(issue:Issue){
        return this.httpclient.post(this.baseUrl,issue);
    }
    updateIssue(id:number,issue:any){
        return this.httpclient.put(this.baseUrl+'/'+id,issue);
    }
    deleteIssue(id:number){
        return this.httpclient.delete(this.baseUrl+'/'+id);
    }
}