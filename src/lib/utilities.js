import { Subject } from 'rxjs'


//TODO: Must delete all of this
/**
 * Sample Data:
 * data = {
 *  navigationLink,
 *  navifationState
 * }
 */
export const navigationStatus = new Subject();

/**
 * Sample Data
 * data = {
 *  status,
 *  type
 * }
 */
export const modalToggle = new Subject();//TODO: Plan to delete this