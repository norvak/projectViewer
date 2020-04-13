import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	if(''.includes(args.trim())) return value;
    return value.filter(( data: any) => {
    	return data.name.startsWith(args.trim());
  	});
  }

}
