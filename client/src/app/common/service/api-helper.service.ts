import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constant/constants';
import { CustomRequestHeaders } from '../utility/custom-request-headers';
import { Util } from '../utility/util';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class APIHelperService {
    constructor(private globalService: GlobalService, private http: HttpClient) { }

    private getHeader(headers?: CustomRequestHeaders) {
        let reqHeaders = new HttpHeaders();
        reqHeaders = reqHeaders.append(Constants.CONTENT_TYPE, Constants.CONTENT_TYPE_APPLICATION_JSON);
        reqHeaders = reqHeaders.append(Constants.ACCESS_CONTROL_ALLOW_ORIGIN, Constants.ACCESS_ORIGIN_ALL);
        if (headers && !headers.isEmpty()) {
            headers.keys().forEach(key => {
                reqHeaders = reqHeaders.append(key, headers.get(key));
            });
        }
        if (Util.isNotEmpty(this.globalService.getAccessToken())) {
            reqHeaders = reqHeaders.append(Constants.AUTHORIZATION, 'Bearer ' + this.globalService.getAccessToken());
        }
        return reqHeaders;
    }
    private getFullAPIUrl(url) {
        return this.globalService.getBaseAPIURL() + url;
    }
    public get(url, params?, headers?: CustomRequestHeaders): Observable<any> {
        return this.http.get(this.getFullAPIUrl(url), { headers: this.getHeader(headers), params });
    }
    public post(url, body?, params?: HttpParams, headers?: CustomRequestHeaders): Observable<any> {
        let reqBody = {};
        if (Util.isNotEmpty(body)) {
            reqBody = JSON.stringify(body);
        }
        return this.http.post(this.getFullAPIUrl(url), reqBody, { headers: this.getHeader(headers), params });
    }
    public put(url, body?, params?: HttpParams, headers?: CustomRequestHeaders): Observable<any> {
        const reqBody = JSON.stringify(body);
        return this.http.put(this.getFullAPIUrl(url), reqBody, { headers: this.getHeader(headers), params });
    }
    public delete(url, params?: HttpParams, headers?: CustomRequestHeaders): Observable<any> {
        return this.http.delete(this.getFullAPIUrl(url), { headers: this.getHeader(headers), params });
    }
}
