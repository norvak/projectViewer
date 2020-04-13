import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})

export class orderByPipe implements PipeTransform {
    transform(companies: any[], name: string, order: number): any[] {

        // Check if is not null
        if (!companies || !name || !order) {
            return companies;
        }

        return companies.sort((a: any, b: any) => {
            // We go for each property followed by path
            let path = [name];

            path.forEach( (property) => {
                a = a[property];
                b = b[property];
            });

            // Order * (-1): We change our order
            return a > b ? order : order * (- 1);
        });
    }
}
