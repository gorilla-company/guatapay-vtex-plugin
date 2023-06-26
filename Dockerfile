# development stage
FROM public.ecr.aws/lambda/nodejs:18

##copiar todo en el directorio de trabajo de lambda
COPY . ${LAMBDA_TASK_ROOT}

##instalar dependencias

RUN npm install

##compilar el proyecto

RUN npm run build

RUN ls

##entrypoint es dist/serverless.handler
CMD [ "dist/serverless.handler" ]
