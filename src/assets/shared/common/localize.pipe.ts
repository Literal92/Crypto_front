import { Injector, Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'toman'
})
export class TomanPricePipe implements PipeTransform {
    transform(key: string, ...args: any[]): string {
        key = key || '';
        // const ret = key;
        const ret = key.slice(0, key.length - 1);
        if (ret === '')
            return '0 تومان';
        return ret ;
    }
}

@Pipe({
    name: 'c3'
})
export class Comma3Pipe implements PipeTransform {
    ld(str: string): string {
        if (str === null) {
            str = '';
        }
        let res = '';
        while (str.length > 3) {
            res = ',' + str.slice(str.length - 3) + res;
            str = str.slice(0, str.length - 3);
        }
        return str + res;
    }
    transform(key: string, ...args: any[]): string {
        return this.ld(key || '');
    }
}