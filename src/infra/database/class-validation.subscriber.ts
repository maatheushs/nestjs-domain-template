import { BusinessError } from '@infra/errors/business.error';
import { validateOrReject, ValidationError } from 'class-validator';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class ClassValidatorSubscriber implements EntitySubscriberInterface {
  async beforeInsert(event: InsertEvent<any>) {
    try {
      await validateOrReject(event.entity);
    } catch (errors) {
      if (errors instanceof Array<ValidationError>) {
        this.handleValidationErrors(errors);
      }
      throw new BusinessError(errors);
    }
  }

  async beforeUpdate(event: InsertEvent<any>) {
    try {
      await validateOrReject(event.entity);
    } catch (errors) {
      if (errors instanceof Array<ValidationError>) {
        this.handleValidationErrors(errors);
      }
      throw new BusinessError(errors);
    }
  }

  private handleValidationErrors(errors: any[]) {
    throw new BusinessError(
      errors.map((error) => this.getValidationMessage(error)).join(', '),
      errors.map((error) => this.getValidationKey(error)).join(', '),
    );
  }

  private getValidationKey(error: ValidationError) {
    const errorKeys: string[] = [];
    for (const constraint of Object.entries(error.constraints)) {
      const [constraintReason] = constraint;
      errorKeys.push(
        `${error.target.constructor.name.toLowerCase()}.${
          error.property
        }.${constraintReason}`,
      );
    }

    return errorKeys.join(', ');
  }

  private getValidationMessage(error: ValidationError) {
    const errorMessages: string[] = [];
    for (const constraint of Object.entries(error.constraints)) {
      const [, message] = constraint;
      errorMessages.push(`${error.target.constructor.name}: ${message}`);
    }

    return errorMessages.join(', ');
  }
}
