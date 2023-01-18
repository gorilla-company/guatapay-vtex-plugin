import Joi from 'joi';

const sessionParams = {
  query: Joi.object().keys({
    sessionId: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

export default { sessionParams };
