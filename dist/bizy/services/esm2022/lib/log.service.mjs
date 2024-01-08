import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var COLOR;
(function (COLOR) {
    COLOR["DEFAULT"] = "#666666";
    COLOR["INFO"] = "#2484C6";
    COLOR["SUCCESS"] = "#65BF6C";
    COLOR["WARNING"] = "#F7A64C";
    COLOR["ERROR"] = "#EF4C59";
})(COLOR || (COLOR = {}));
export class LogService {
    #lastLogTimestamp = 0;
    #log(log, color, param) {
        const difference = this.#lastLogTimestamp ? Date.now() - this.#lastLogTimestamp : 0;
        this.#lastLogTimestamp = Date.now();
        const timestampStyles = 'color: #EE5DFF';
        const logStyles = `color: ${color}; font-size: 12px;`;
        const date = new Date();
        if (param) {
            console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles, param);
        }
        else {
            console.log(`%c${date.toLocaleString()}: %c${log} %c(+${difference}ms)`, timestampStyles, logStyles, timestampStyles);
        }
    }
    debug(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.DEFAULT, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Debug', color: COLOR.DEFAULT });
        }
    }
    info(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.INFO, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Info', color: COLOR.INFO });
        }
    }
    success(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.SUCCESS, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Success', color: COLOR.SUCCESS });
        }
    }
    warning(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.WARNING, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Warning', color: COLOR.WARNING });
        }
    }
    error(data, param) {
        if (typeof data === 'string') {
            this.#log(data, COLOR.ERROR, param);
        }
        else {
            this.#template({ ...data, param: data.param, title: 'Error', color: COLOR.ERROR });
        }
    }
    /** DEPRECATED */
    templateDebug(data) {
        this.#template({ ...data, title: 'Debug', color: COLOR.DEFAULT });
    }
    /** DEPRECATED */
    templateSucc(data) {
        this.#template({ ...data, title: 'Success', color: COLOR.SUCCESS });
    }
    /** DEPRECATED */
    templateInfo(data) {
        this.#template({ ...data, title: 'Info', color: COLOR.INFO });
    }
    /** DEPRECATED */
    templateWarn(data) {
        this.#template({ ...data, title: 'Warning', color: COLOR.WARNING });
    }
    /** DEPRECATED */
    templateError(data) {
        this.#template({ ...data, title: 'Error', color: COLOR.ERROR });
    }
    #template(data) {
        const log = `(${data.title}) ${data.fileName} - ${data.functionName}`;
        this.#log(log, data.color, data.param);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LogService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: LogService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zZXJ2aWNlcy9zcmMvbGliL2xvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLElBQUssS0FNSjtBQU5ELFdBQUssS0FBSztJQUNSLDRCQUFtQixDQUFBO0lBQ25CLHlCQUFnQixDQUFBO0lBQ2hCLDRCQUFtQixDQUFBO0lBQ25CLDRCQUFtQixDQUFBO0lBQ25CLDBCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFOSSxLQUFLLEtBQUwsS0FBSyxRQU1UO0FBU0QsTUFBTSxPQUFPLFVBQVU7SUFDckIsaUJBQWlCLEdBQVcsQ0FBQyxDQUFDO0lBRTlCLElBQUksQ0FBQyxHQUFXLEVBQUUsS0FBWSxFQUFFLEtBQWM7UUFDNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVwQyxNQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxNQUFNLFNBQVMsR0FBRyxVQUFVLEtBQUssb0JBQW9CLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sR0FBRyxRQUFRLFVBQVUsS0FBSyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlIO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxD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QUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNELGlCQUFpQjtJQUNqQixZQUFZLENBQUMsSUFBYztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNELGlCQUFpQjtJQUNqQixZQUFZLENBQUMsSUFBYztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNELGlCQUFpQjtJQUNqQixhQUFhLENBQUMsSUFBYztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUE4RjtRQUN0RyxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFFBQVEsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQzt3R0FoRlUsVUFBVTs0R0FBVixVQUFVOzs0RkFBVixVQUFVO2tCQUR0QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5lbnVtIENPTE9SIHtcbiAgREVGQVVMVCA9ICcjNjY2NjY2JyxcbiAgSU5GTyA9ICcjMjQ4NEM2JyxcbiAgU1VDQ0VTUyA9ICcjNjVCRjZDJyxcbiAgV0FSTklORyA9ICcjRjdBNjRDJyxcbiAgRVJST1IgPSAnI0VGNEM1OSdcbn1cblxuaW50ZXJmYWNlIElMb2dEYXRhIHtcbiAgZmlsZU5hbWU6IHN0cmluZztcbiAgZnVuY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHBhcmFtPzogdW5rbm93blxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nU2VydmljZSB7XG4gICNsYXN0TG9nVGltZXN0YW1wOiBudW1iZXIgPSAwO1xuXG4gICNsb2cobG9nOiBzdHJpbmcsIGNvbG9yOiBDT0xPUiwgcGFyYW06IHVua25vd24pOiB2b2lkIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gdGhpcy4jbGFzdExvZ1RpbWVzdGFtcCA/IERhdGUubm93KCkgLSB0aGlzLiNsYXN0TG9nVGltZXN0YW1wIDogMDtcbiAgICB0aGlzLiNsYXN0TG9nVGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHRpbWVzdGFtcFN0eWxlcyA9ICdjb2xvcjogI0VFNURGRic7XG4gICAgY29uc3QgbG9nU3R5bGVzID0gYGNvbG9yOiAke2NvbG9yfTsgZm9udC1zaXplOiAxMnB4O2A7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgaWYgKHBhcmFtKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJWMke2RhdGUudG9Mb2NhbGVTdHJpbmcoKX06ICVjJHtsb2d9ICVjKCske2RpZmZlcmVuY2V9bXMpYCwgdGltZXN0YW1wU3R5bGVzLCBsb2dTdHlsZXMsIHRpbWVzdGFtcFN0eWxlcywgcGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJWMke2RhdGUudG9Mb2NhbGVTdHJpbmcoKX06ICVjJHtsb2d9ICVjKCske2RpZmZlcmVuY2V9bXMpYCwgdGltZXN0YW1wU3R5bGVzLCBsb2dTdHlsZXMsIHRpbWVzdGFtcFN0eWxlcyk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoZGF0YTogc3RyaW5nIHwgSUxvZ0RhdGEsIHBhcmFtPzogdW5rbm93bik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuI2xvZyhkYXRhLCBDT0xPUi5ERUZBVUxULCBwYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI3RlbXBsYXRlKHsgLi4uZGF0YSwgcGFyYW06IGRhdGEucGFyYW0sIHRpdGxlOiAnRGVidWcnLCBjb2xvcjogQ09MT1IuREVGQVVMVCB9KTtcbiAgICB9XG4gIH1cblxuICBpbmZvKGRhdGE6IHN0cmluZyB8IElMb2dEYXRhLCBwYXJhbT86IHVua25vd24pOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLiNsb2coZGF0YSwgQ09MT1IuSU5GTywgcGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiN0ZW1wbGF0ZSh7IC4uLmRhdGEsIHBhcmFtOiBkYXRhLnBhcmFtLCB0aXRsZTogJ0luZm8nLCBjb2xvcjogQ09MT1IuSU5GTyB9KTtcbiAgICB9XG4gIH1cblxuICBzdWNjZXNzKGRhdGE6IHN0cmluZyB8IElMb2dEYXRhLCBwYXJhbT86IHVua25vd24pOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLiNsb2coZGF0YSwgQ09MT1IuU1VDQ0VTUywgcGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiN0ZW1wbGF0ZSh7IC4uLmRhdGEsIHBhcmFtOiBkYXRhLnBhcmFtLCB0aXRsZTogJ1N1Y2Nlc3MnLCBjb2xvcjogQ09MT1IuU1VDQ0VTUyB9KTtcbiAgICB9XG4gIH1cblxuICB3YXJuaW5nKGRhdGE6IHN0cmluZyB8IElMb2dEYXRhLCBwYXJhbT86IHVua25vd24pOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLiNsb2coZGF0YSwgQ09MT1IuV0FSTklORywgcGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiN0ZW1wbGF0ZSh7IC4uLmRhdGEsIHBhcmFtOiBkYXRhLnBhcmFtLCB0aXRsZTogJ1dhcm5pbmcnLCBjb2xvcjogQ09MT1IuV0FSTklORyB9KTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihkYXRhOiBzdHJpbmcgfCBJTG9nRGF0YSwgcGFyYW0/OiB1bmtub3duKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy4jbG9nKGRhdGEsIENPTE9SLkVSUk9SLCBwYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI3RlbXBsYXRlKHsgLi4uZGF0YSwgcGFyYW06IGRhdGEucGFyYW0sIHRpdGxlOiAnRXJyb3InLCBjb2xvcjogQ09MT1IuRVJST1IgfSk7XG4gICAgfVxuICB9XG4gIC8qKiBERVBSRUNBVEVEICovXG4gIHRlbXBsYXRlRGVidWcoZGF0YTogSUxvZ0RhdGEpOiB2b2lkIHtcbiAgICB0aGlzLiN0ZW1wbGF0ZSh7IC4uLmRhdGEsIHRpdGxlOiAnRGVidWcnLCBjb2xvcjogQ09MT1IuREVGQVVMVCB9KTtcbiAgfVxuICAvKiogREVQUkVDQVRFRCAqL1xuICB0ZW1wbGF0ZVN1Y2MoZGF0YTogSUxvZ0RhdGEpOiB2b2lkIHtcbiAgICB0aGlzLiN0ZW1wbGF0ZSh7IC4uLmRhdGEsIHRpdGxlOiAnU3VjY2VzcycsIGNvbG9yOiBDT0xPUi5TVUNDRVNTIH0pO1xuICB9XG4gIC8qKiBERVBSRUNBVEVEICovXG4gIHRlbXBsYXRlSW5mbyhkYXRhOiBJTG9nRGF0YSk6IHZvaWQge1xuICAgIHRoaXMuI3RlbXBsYXRlKHsgLi4uZGF0YSwgdGl0bGU6ICdJbmZvJywgY29sb3I6IENPTE9SLklORk8gfSk7XG4gIH1cbiAgLyoqIERFUFJFQ0FURUQgKi9cbiAgdGVtcGxhdGVXYXJuKGRhdGE6IElMb2dEYXRhKTogdm9pZCB7XG4gICAgdGhpcy4jdGVtcGxhdGUoeyAuLi5kYXRhLCB0aXRsZTogJ1dhcm5pbmcnLCBjb2xvcjogQ09MT1IuV0FSTklORyB9KTtcbiAgfVxuICAvKiogREVQUkVDQVRFRCAqL1xuICB0ZW1wbGF0ZUVycm9yKGRhdGE6IElMb2dEYXRhKTogdm9pZCB7XG4gICAgdGhpcy4jdGVtcGxhdGUoeyAuLi5kYXRhLCB0aXRsZTogJ0Vycm9yJywgY29sb3I6IENPTE9SLkVSUk9SIH0pO1xuICB9XG5cbiAgI3RlbXBsYXRlKGRhdGE6IHsgZmlsZU5hbWU6IHN0cmluZzsgZnVuY3Rpb25OYW1lOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcsIGNvbG9yOiBDT0xPUjsgcGFyYW0/OiB1bmtub3duIH0pOiB2b2lkIHtcbiAgICBjb25zdCBsb2cgPSBgKCR7ZGF0YS50aXRsZX0pICR7ZGF0YS5maWxlTmFtZX0gLSAke2RhdGEuZnVuY3Rpb25OYW1lfWA7XG4gICAgdGhpcy4jbG9nKGxvZywgZGF0YS5jb2xvciwgZGF0YS5wYXJhbSk7XG4gIH1cbn1cbiJdfQ==