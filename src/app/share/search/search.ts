import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
})
export class SearchPipe implements PipeTransform {
    transform(data: any[], searchText: any, modulo: any): any {

        if (searchText) {
            return data.filter(d => {
                if ( modulo === 'name') {
                    return !d.name.toLowerCase().indexOf(searchText.toLowerCase());
                } else if (modulo === 'authors') {
                    const fil =  d.authors.filter( a => {
                        return  !a.author.name_author.toLowerCase().indexOf(searchText.toLowerCase());
                    });
                    return fil.length;
                } else if (modulo === 'platforms') {
                    return d.platforms.filter( a => {
                        return  !a.name_platform.toLowerCase().indexOf(searchText.toLowerCase());
                    }).length !== 0;
                }
                return null;
            });
        }
        return data;
    }
}
