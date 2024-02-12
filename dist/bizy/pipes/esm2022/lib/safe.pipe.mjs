import { Inject, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class SafePipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SafePipe, deps: [{ token: DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: SafePipe, name: "bizySafe" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SafePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bizySafe'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer, decorators: [{
                    type: Inject,
                    args: [DomSanitizer]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9zYWZlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQTZELE1BQU0sMkJBQTJCLENBQUM7OztBQUtwSCxNQUFNLE9BQU8sUUFBUTtJQUN1QjtJQUExQyxZQUEwQyxTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQztJQUU5RCxTQUFTLENBQUMsS0FBVSxFQUFFLElBQVk7UUFDdkMsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLE1BQU0sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RSxLQUFLLEtBQUssQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxLQUFLLGFBQWEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRixPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzt3R0FaVSxRQUFRLGtCQUNDLFlBQVk7c0dBRHJCLFFBQVE7OzRGQUFSLFFBQVE7a0JBSHBCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCOzswQkFFYyxNQUFNOzJCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVNjcmlwdCwgU2FmZVN0eWxlLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2JpenlTYWZlJ1xufSlcbmV4cG9ydCBjbGFzcyBTYWZlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERvbVNhbml0aXplcikgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBwdWJsaWMgdHJhbnNmb3JtKHZhbHVlOiBhbnksIHR5cGU6IHN0cmluZyk6IFNhZmVIdG1sIHwgU2FmZVN0eWxlIHwgU2FmZVNjcmlwdCB8IFNhZmVVcmwgfCBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnaHRtbCc6IHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZSk7XG4gICAgICBjYXNlICdzdHlsZSc6IHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWUpO1xuICAgICAgY2FzZSAnc2NyaXB0JzogcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTY3JpcHQodmFsdWUpO1xuICAgICAgY2FzZSAndXJsJzogcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWUpO1xuICAgICAgY2FzZSAncmVzb3VyY2VVcmwnOiByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzYWZlIHR5cGUgc3BlY2lmaWVkOiAke3R5cGV9YCk7XG4gICAgfVxuICB9XG59XG4iXX0=