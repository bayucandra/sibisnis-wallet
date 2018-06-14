import { Subject } from 'rxjs'

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
 *  status
 * }
 */
export const modalToggle = new Subject();