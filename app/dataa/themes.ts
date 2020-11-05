import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Theme extends Model {
  static table = 'themes';

  @field('note') note;
  @field('weight') weight;
  @readonly @date('created_at') createdAt;
}