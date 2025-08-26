import { cancelOperation } from '../../../utils/cancel-operation';

export const checkNodeFramework = (framework: string, feature: string): void => {
  if (!['express', 'nest', 'fastify', 'koa'].includes(framework)) {
    cancelOperation(
      `Cannot add "${feature}": detected framework is ${framework}. Only Node.js frameworks are supported for this feature.`,
    );
  }
};
