import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reminderFilter'
})
export class ReminderFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      const fullName = it.contact.firstName + ' ' + it.contact.lastName + ' ' + it.subject;
      return fullName.toLowerCase().includes(searchText);
    });
  }
}
