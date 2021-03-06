import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      const fullName = it.firstName + ' ' + it.lastName;
      return fullName.toLowerCase().includes(searchText);
    });
  }
}
