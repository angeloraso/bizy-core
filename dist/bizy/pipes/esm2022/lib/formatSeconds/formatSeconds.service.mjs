import { Injectable } from '@angular/core';
import { BIZY_FORMAT_SECONDS_FORMAT, BIZY_FORMAT_SECONDS_LANGUAGE } from './formatSeconds.types';
import * as i0 from "@angular/core";
export class BizyFormatSecondsService {
    #options = {
        language: BIZY_FORMAT_SECONDS_LANGUAGE.SPANISH,
        format: BIZY_FORMAT_SECONDS_FORMAT.TIME
    };
    getOptions() {
        return this.#options;
    }
    setOptions(options) {
        if (options && options.language) {
            this.#options.language = options.language;
        }
        if (options && options.format) {
            this.#options.format = options.format;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: BizyFormatSecondsService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U2Vjb25kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlwZXMvc3JjL2xpYi9mb3JtYXRTZWNvbmRzL2Zvcm1hdFNlY29uZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUdqRyxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFFBQVEsR0FHSjtRQUNGLFFBQVEsRUFBRSw0QkFBNEIsQ0FBQyxPQUFPO1FBQzlDLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQyxJQUFJO0tBQ3hDLENBQUE7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBdUY7UUFDaEcsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzt3R0FyQlUsd0JBQXdCOzRHQUF4Qix3QkFBd0I7OzRGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCSVpZX0ZPUk1BVF9TRUNPTkRTX0ZPUk1BVCwgQklaWV9GT1JNQVRfU0VDT05EU19MQU5HVUFHRSB9IGZyb20gJy4vZm9ybWF0U2Vjb25kcy50eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCaXp5Rm9ybWF0U2Vjb25kc1NlcnZpY2Uge1xuICAjb3B0aW9uczoge1xuICAgIGxhbmd1YWdlOiBCSVpZX0ZPUk1BVF9TRUNPTkRTX0xBTkdVQUdFLFxuICAgIGZvcm1hdDogQklaWV9GT1JNQVRfU0VDT05EU19GT1JNQVRcbiAgfSA9IHtcbiAgICBsYW5ndWFnZTogQklaWV9GT1JNQVRfU0VDT05EU19MQU5HVUFHRS5TUEFOSVNILFxuICAgIGZvcm1hdDogQklaWV9GT1JNQVRfU0VDT05EU19GT1JNQVQuVElNRVxuICB9XG5cbiAgZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy4jb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9uczoge2xhbmd1YWdlPzogQklaWV9GT1JNQVRfU0VDT05EU19MQU5HVUFHRSwgZm9ybWF0PzogQklaWV9GT1JNQVRfU0VDT05EU19GT1JNQVR9KSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sYW5ndWFnZSkge1xuICAgICAgdGhpcy4jb3B0aW9ucy5sYW5ndWFnZSA9IG9wdGlvbnMubGFuZ3VhZ2U7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5mb3JtYXQpIHtcbiAgICAgIHRoaXMuI29wdGlvbnMuZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XG4gICAgfVxuICB9XG59Il19