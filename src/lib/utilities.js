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
 *  status,
 *  type
 * }
 */
export const modalToggle = new Subject();

/**
 * Sample Data
 * data = {
 *  status
 * }
 */
export const cameraCaptureFileUpload = new Subject();